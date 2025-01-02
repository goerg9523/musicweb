import React, { useEffect, useState } from "react";
import styles from "./stream-frame.module.css";
import ViewerCount from "@/components/public/icons/viewer_count";

const LiveStream = ({
  videoId = "uTMc48XmjrA",
  streamerName = "DefaultStreamer",
}) => {
  const [streamData, setStreamData] = useState({
    viewerCount: 0,
    elapsedTime: "",
    title: "",
    isLive: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!videoId) {
      setError("YouTube Video ID not provided");
      setIsLoading(false);
      return;
    }

    const fetchStreamDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3007/api/live-stream-details/${videoId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const responseText = await response.text();
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(
            `Failed to parse response as JSON: ${responseText.substring(
              0,
              100
            )}...`
          );
        }

        if (!response.ok) {
          throw new Error(data.message || `Server returned ${response.status}`);
        }

        setStreamData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching stream data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamDetails();
    const pollInterval = setInterval(fetchStreamDetails, 30000);
    return () => clearInterval(pollInterval);
  }, [videoId]);

  // Handle screen orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      if (
        window.matchMedia("(orientation: landscape)").matches &&
        window.innerWidth <= 920
      ) {
        setIsFullscreen(true);
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      } else {
        setIsFullscreen(false);
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    // Initial check
    handleOrientationChange();

    // Add event listeners
    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profilePic}>
          <img src="/s_img/anya.png" alt={streamerName} />
        </div>
        <div className={styles.streamInfo}>
          <h2 className={styles.streamerName}>{streamerName}</h2>
          <div className={styles.decorativeLine} />
          <p className={styles.streamTitle}>
            {streamData.title || "Loading..."}
          </p>
        </div>
      </div>

      <div
        className={`${styles.videoContainer} ${
          isFullscreen ? styles.fullscreen : ""
        }`}
      >
        <iframe
          className={styles.videoFrame}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={streamData.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

      {!isLoading && (
        <div className={styles.statsContainer}>
          <div className={styles.viewerCount}>
            <ViewerCount /> {streamData.viewerCount?.toLocaleString() || "0"}
          </div>
          <div className={styles.elapsedTime}>
            ⏱️ {streamData.elapsedTime || "0h 0m"}
          </div>
          {streamData.isLive && (
            <div className={styles.statusIndicator}>
              <span
                className={`${styles.statusDot} ${styles.statusDotLive}`}
              ></span>
              <span>LIVE</span>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <p className={styles.loadingText}>Loading stream details...</p>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LiveStream;
