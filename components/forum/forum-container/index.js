import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import ForumPost from "../post";
import styles from "@/components/forum/forum-container/forum-cotainer.module.css";
import SortingButton from "../sorting-button";
import { Clock, Flame } from "lucide-react";
import placeholderPosts from "../forum-placeholder";

const ForumContainer = () => {
  const [posts, setPosts] = useState(placeholderPosts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  const breakpointColumns = {
    default: 3,
    1024: 2,
    768: 1,
  };

  const sortByLatest = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
    );
    setPosts(sortedPosts);
    setSortBy("latest");
  };

  const sortByPopular = () => {
    const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
    setPosts(sortedPosts);
    setSortBy("popular");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/forum/posts?page=${page}&perpage=12`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch posts");
        }

        const data = await response.json();

        if (data.status === "success") {
          setPosts((prevPosts) =>
            page === 1 ? data.data.posts : [...prevPosts, ...data.data.posts]
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (loading && page === 1) {
    return <div className={styles.loadingText}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles.errorText}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className="mb-4 flex items-center">
        <SortingButton active={sortBy === "latest"} onClick={sortByLatest}>
          <Clock size={18} />
          Latest
        </SortingButton>

        <SortingButton active={sortBy === "popular"} onClick={sortByPopular}>
          <Flame size={18} />
          Popular
        </SortingButton>
      </div>

      <Masonry
        breakpointCols={breakpointColumns}
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
      >
        {posts.map((post) => (
          <ForumPost
            key={post.id}
            userImage={post.userImage}
            username={post.username}
            title={post.title}
            content={post.content}
            coverImage={post.coverImage}
            timeStamp={post.timeStamp}
            likes={post.likes}
            reposts={post.reposts}
          />
        ))}
      </Masonry>

      {!loading && posts.length > 0 && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreButton}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumContainer;
