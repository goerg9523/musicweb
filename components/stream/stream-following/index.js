import { useState, useEffect } from "react";
import styles from "@/components/stream/stream-following/s_following.module.css";
import ViewerCount from "@/components/public/icons/viewer_count";
import { SquareMenu, X } from "lucide-react";
import DarkModeToggle from "@/components/stream/dark-mode";

const FollowingStream = () => {
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Placeholder data to simulate database response
  const mockStreamData = [
    {
      id: 1,
      streamerName: "Jimmy55",
      viewerCount: 5000,
      profileImage: "/s_img/test.jpg",
      isLive: true,
    },
    {
      id: 2,
      streamerName: "StreamMaster123",
      viewerCount: 3200,
      profileImage: "/s_img/streamer.jpg",
      isLive: true,
    },
    {
      id: 3,
      streamerName: "ProGamer789",
      viewerCount: 1500,
      profileImage: "/s_img/streamer1.jpg",
      isLive: true,
    },
    {
      id: 4,
      streamerName: "Tanuki88",
      viewerCount: 1500,
      profileImage: "/s_img/streamer2.jpg",
      isLive: true,
    },
    {
      id: 5,
      streamerName: "CafeYa",
      viewerCount: 1500,
      profileImage: "/s_img/streamer3.jpg",
      isLive: true,
    },
  ];

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStreams(mockStreamData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load streams");
        setIsLoading(false);
      }
    };

    fetchStreams();
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest(`.${styles.sidebar}`) &&
        !event.target.closest(`.${styles.mobileToggle}`)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  if (isLoading) {
    return <div className="text-center p-4">Loading streams...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  const StreamList = () => (
    <>
      <DarkModeToggle />
      <p className={styles.p}>追隨中</p>
      {streams.map((stream) => (
        <div key={stream.id} className={styles.followingStream}>
          <img
            className={styles.followingStreamChild}
            alt={`${stream.streamerName}'s stream`}
            src={stream.profileImage}
          />
          <div className={styles.streamerName}>{stream.streamerName}</div>
          <div className={styles.veiwerCount}>
            <ViewerCount />
            <div className={styles.div}>
              {stream.viewerCount.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.container}>
      {/* Desktop View */}
      <div className={styles.desktopView}>
        <StreamList />
      </div>

      {/* Mobile View */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open following streams"
      >
        <SquareMenu size={24} />
      </button>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${
          isSidebarOpen ? styles.overlayVisible : ""
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.sidebarHeader}>
          <button
            className={styles.closeButton}
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close following streams"
          >
            <X size={24} />
          </button>
        </div>
        <StreamList />
      </div>
    </div>
  );
};

export default FollowingStream;
