import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "./kv.module.css";

export default function Kv() {
  const router = useRouter();
  const barRef = useRef(null);
  const [count, setCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const [plane, setPlane] = useState([]);
  const [topProject, setTopProject] = useState(null);

  // 計算專案總金額
  const calculateProjectTotals = (planes, projectId) => {
    if (!planes?.length || !projectId) return 0;
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
    const projectPlanes = planes.filter(
      (p) => Number(p.f_project_list) === projectId
    );
    return projectPlanes.reduce(
      (sum, plane) => sum + (Number(plane.f_plan_people) || 0),
      0
    );
  };

  useEffect(() => {
    const fetchNew = async () => {
      try {
        const response = await fetch("http://localhost:3005/fundraiser/projectsNew");
        const data = await response.json();
        return data.rows;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchPlane = async () => {
      try {
        if (!router.isReady) return;
        const response = await fetch(`http://localhost:3005/fundraiser/plane`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        if (result.rows && Array.isArray(result.rows)) {
          return result.rows.map((plane) => ({
            ...plane,
            f_project_list: Number(plane.f_project_list),
          }));
        }
      } catch (error) {
        console.error("Error fetching plane data:", error);
      }
    };

    // 獲取並處理資料
    const fetchAndProcessData = async () => {
      const [projectsData, planesData] = await Promise.all([fetchNew(), fetchPlane()]);
      
      if (projectsData && planesData) {
        // 計算每個專案的總人數並排序
        const projectsWithPeople = projectsData.map(project => ({
          ...project,
          totalPeople: calculateProjectPeople(planesData, project.f_project_id)
        }));

        // 依照人數排序並取最多人的專案
        const sortedProjects = projectsWithPeople.sort((a, b) => b.totalPeople - a.totalPeople);
        const mostPopularProject = sortedProjects[0];

        if (mostPopularProject) {
          // 計算進度百分比
          const projectTotal = calculateProjectTotals(planesData, mostPopularProject.f_project_id);
          const progressPercentage = Math.min(
            Math.round((projectTotal / Number(mostPopularProject.f_project_amount)) * 100),
            100
          );

          setTopProject({
            ...mostPopularProject,
            progress: progressPercentage
          });

          // 設置進度條動畫
          setTimeout(() => {
            if (barRef.current) {
              barRef.current.style.width = `${progressPercentage}%`;
            }
          }, 1000);

          // 數字動畫
          let currentCount = 0;
          const interval = setInterval(() => {
            if (currentCount <= progressPercentage) {
              setCount(currentCount);
              currentCount++;
            } else {
              clearInterval(interval);
            }
          }, 30);
        }

        setProjects(sortedProjects);
        setPlane(planesData);
      }
    };

    fetchAndProcessData();
  }, [router.isReady]);

  if (!topProject) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.top}   style={{ backgroundImage: `url(${topProject.f_project_picture})` }}>
        <div className={styles.title}>
          <a href={`/Liam/detail?project=${topProject.f_project_id}`}>
            <h3>{topProject.f_project_title}</h3>
            <p>{count}%</p>
            <p>{topProject.totalPeople} 人贊助</p>
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <div 
          className={styles.bar} 
          ref={barRef}
        ></div>
      </div>
    </div>
  );
}