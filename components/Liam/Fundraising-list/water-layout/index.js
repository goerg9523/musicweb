import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Filter } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./waterfall.module.css";

// 常數定義
const MUSIC_CATEGORIES = [
  { id: "all", name: "全部" },
  { id: "Rock", name: "Rock" },
  { id: "Pop", name: "Pop" },
  { id: "Blue", name: "Blue" },
  { id: "Soul", name: "Soul" },
];

const PRICE_RANGES = [
  { id: "all", label: "全部", min: 0, max: Infinity },
  { id: "under-5000", label: "5,000 以下", min: 0, max: 5000 },
  { id: "5001-50000", label: "5,001-50,000", min: 5001, max: 50000 },
  { id: "above-50000", label: "50,000 以上", min: 50001, max: Infinity },
];
const TIME_RANGES = [
  { id: "all", label: "全部" },
  { id: "latest", label: "由新到舊" },
  { id: "oldest", label: "由舊到新" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const WaterfallLayout = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    time: "all",
  });
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [plane, setPlane] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [projectsData, setProjectsData] = useState([]);

  // 計算專案總金額
  const calculateProjectTotals = (planes, projectId) => {
    if (!planes?.length || !projectId) return 0;

    // 使用 f_project_list 匹配 f_project_id
    const projectPlanes = planes.filter(
      (p) => Number(p.f_project_list) === projectId
    );

    return projectPlanes.reduce((sum, plane) => {
      const planAmount = Number(plane.f_plan_amount) || 0;
      const planPeople = Number(plane.f_plan_people) || 0;
      return sum + planAmount * planPeople;
    }, 0);
  };

  // 計算專案總人數
  const calculateProjectPeople = (planes, projectId) => {
    if (!planes?.length || !projectId) return 0;

    // 使用 f_project_list 匹配 f_project_id
    const projectPlanes = planes.filter(
      (p) => Number(p.f_project_list) === projectId
    );

    return projectPlanes.reduce(
      (sum, plane) => sum + (Number(plane.f_plan_people) || 0),
      0
    );
  };

  // 資料獲取
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!router.isReady) return;
        const response = await fetch("http://localhost:3005/fundraiser/list");
        const data = await response.json();
        if (data.rows) {
          const processedData = data.rows.map((item) => ({
            ...item,
            f_project_id: Number(item.f_project_id),
          }));
          setItems(processedData);

          setFilteredItems(processedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchPlane = async () => {
      try {
        if (!router.isReady) return;
        const response = await fetch(`http://localhost:3005/fundraiser/plane`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.rows && Array.isArray(result.rows)) {
          // 處理數據，確保 f_project_list 是數字類型
          const processedPlanes = result.rows.map((plane) => ({
            ...plane,
            f_project_list: Number(plane.f_project_list),
          }));
          setPlane(processedPlanes); // 設置處理後的數據
          console.log("Processed planes:", processedPlanes);
        }
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };

    fetchPlane();
    fetchData();
  }, [router.isReady]);

  // 篩選邏輯

  useEffect(() => {
    let result = [...items];

    if (filters.category !== "all") {
      result = result.filter((item) => item.f_tag === filters.category);
    }

    if (filters.price !== "all") {
      const priceRange = PRICE_RANGES.find(
        (range) => range.id === filters.price
      );
      if (priceRange) {
        result = result.filter((item) => {
          const projectTotal = calculateProjectTotals(plane, item.f_project_id);
          return (
            projectTotal >= priceRange.min && projectTotal <= priceRange.max
          );
        });
      }
    }

    if (filters.time !== "all") {
      result.sort((a, b) => {
        const timeA = new Date(a.f_project_current).getTime();
        const timeB = new Date(b.f_project_current).getTime();
        return filters.time === "latest" ? timeB - timeA : timeA - timeB;
      });
    }

    setFilteredItems(result);
  }, [filters, items, plane]);

  useEffect(() => {
    if (items.length && plane.length) {
      const mappedData = items.map((item) => {
        const matchingPlanes = plane.filter(
          (p) => Number(p.f_project_list) === Number(item.f_project_id)
        );

        const projectTotal = matchingPlanes.reduce(
          (sum, p) => sum + Number(p.f_plan_amount) * Number(p.f_plan_people),
          0
        );

        const projectPeople = matchingPlanes.reduce(
          (sum, p) => sum + Number(p.f_plan_people),
          0
        );

        return {
          project_id: item.f_project_id,
          project_name: item.f_project_name,
          total_amount: projectTotal,
          total_people: projectPeople,
          planes: matchingPlanes,
        };
      });

      setProjectsData(mappedData);
    }
  }, [items, plane]);

  const resetFilters = () => {
    setFilters({
      category: "all",
      price: "all",
      time: "all",
    });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const FilterPanel = () => (
    <div className={styles.filterPanel}>
      <div className={styles.filterGroup}>
        <h3>音樂類別</h3>
        <div className={styles.filterButtonsContainer}>
          {MUSIC_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${
                filters.category === category.id ? styles.active : ""
              }`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: category.id }));
                setCurrentPage(1);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3>價格範圍</h3>
        <div className={styles.filterButtonsContainer}>
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              className={`${styles.filterButton} ${
                filters.price === range.id ? styles.active : ""
              }`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, price: range.id }));
                setCurrentPage(1);
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <h3>上架時間</h3>
        <div className={styles.filterButtonsContainer}>
          {TIME_RANGES.map((range) => (
            <button
              key={range.id}
              className={`${styles.filterButton} ${
                filters.time === range.id ? styles.active : ""
              }`}
              onClick={() => {
                setFilters((prev) => ({ ...prev, time: range.id }));
                setCurrentPage(1);
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterControl}>
        <button
          className={styles.filterToggle}
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter size={20} />
          篩選條件
          {Object.values(filters).some((value) => value !== "all") && (
            <span className={styles.filterBadge} />
          )}
        </button>

        {Object.values(filters).some((value) => value !== "all") && (
          <div className={styles.activeFilters}>
            {filters.category !== "all" && (
              <span className={styles.filterTag}>
                {
                  MUSIC_CATEGORIES.find((cat) => cat.id === filters.category)
                    ?.name
                }
              </span>
            )}
            {filters.price !== "all" && (
              <span className={styles.filterTag}>
                {
                  PRICE_RANGES.find((range) => range.id === filters.price)
                    ?.label
                }
              </span>
            )}
            {filters.time !== "all" && (
              <span className={styles.filterTag}>
                {TIME_RANGES.find((range) => range.id === filters.time)?.label}
              </span>
            )}
            <button className={styles.clearFilters} onClick={resetFilters}>
              清除全部
            </button>
          </div>
        )}
      </div>

      {showFilter && <FilterPanel />}

      <div className={styles.waterfallContainer}>
        {currentItems.length > 0 ? (
          currentItems.map((item) => {
            // 使用數字類型的 f_project_id
            const projectTotal = calculateProjectTotals(
              plane,
              item.f_project_id
            );
            const projectPeople = calculateProjectPeople(
              plane,
              item.f_project_id
            );
            const progressPercentage = Math.min(
              (projectTotal / Number(item.f_project_amount)) * 100,
              100
            );

            return (
              <a href={`/Liam/detail?project=${item.f_project_id}`} key={item.f_project_id}>
                <div  className={styles.waterfallItem}>
                  <div className={styles.itemImageContainer}>
                    <img
                      src={item.f_project_picture}
                      alt={item.f_project_name}
                      className={styles.itemImage}
                      loading="lazy"
                    />
                    <div className={styles.imageProgressBar}>
                      <div
                        className={styles.imageProgressFill}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemCategory}>{item.f_tag}</span>
                    <h3
                      className={styles.itemTitle}
                    >{`${item.f_project_name}+++`}</h3>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className={styles.statsContainer}>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>募資金額</span>
                        <span className={styles.statValue}>
                          $
                          {projectsData
                            .find((p) => p.project_id === item.f_project_id)
                            ?.total_amount.toLocaleString() || "0"}
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>目標金額</span>
                        <span className={styles.statValue}>
                          ${Number(item.f_project_amount).toLocaleString()}
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>贊助人數</span>
                        <span className={styles.statValue}>
                          {projectPeople}人
                        </span>
                      </div>
                      <div className={styles.statItem}>
                        <span className={styles.statLabel}>達成率</span>
                        <span className={styles.statValue}>
                          {progressPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <span className={styles.itemDate}>
                      {formatDate(item.f_project_current)}
                    </span>
                  </div>
                </div>
              </a>
            );
          })
        ) : (
          <div className={styles.noResults}>
            <p>沒有符合條件的商品</p>
            <button className={styles.resetButton} onClick={resetFilters}>
              重置篩選條件
            </button>
          </div>
        )}
      </div>

      {filteredItems.length > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.filterButton} ${styles.prevButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.activePage : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${styles.filterButton} ${styles.nextButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default WaterfallLayout;
