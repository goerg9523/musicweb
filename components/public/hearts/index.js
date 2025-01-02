import React, { useState, useEffect } from "react";
import { Heart as HeartIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@/Context/auth-context";

const styles = {
  container: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heart: {
    transition: 'all 0.2s ease-in-out',
  }
};

const Heart = ({ size = 1, onClick }) => {
  const { auth } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { project } = router.query;

  // 檢查收藏狀態
  useEffect(() => {
    let isMounted = true;
    
    const checkFavoriteStatus = async () => {
      if (!project || !auth?.id) return;
      
      try {
        setIsLoading(true);
        
        // 修正 API 路徑，移除 /api 前綴
        const response = await fetch(
          `http://localhost:3005/fundraiser/favorites/check/${project}/${auth.id}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('檢查收藏狀態失敗');
        }

        const data = await response.json();
        
        if (isMounted && data.success) {
          setIsActive(data.isFavorite);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkFavoriteStatus();

    return () => {
      isMounted = false;
    };
  }, [project, auth?.id]);

  const handleClick = async () => {
    if (!auth?.id) {
      router.push('/member/login');
      return;
    }

    if (!project || isLoading) return;

    try {
      setIsLoading(true);

      const endpoint = isActive
        ? `http://localhost:3005/fundraiser/favorites/remove/${project}/${auth.id}`
        : `http://localhost:3005/fundraiser/favorites/add/${project}/${auth.id}`;

      const response = await fetch(endpoint, {
        method: isActive ? 'DELETE' : 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsActive(!isActive);
        if (onClick) {
          onClick(!isActive);
        }
      } else {
        console.error('操作失敗:', data.error);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const heartStyle = {
    ...styles.heart,
    cursor: isLoading ? 'wait' : 'pointer',
    opacity: isLoading ? 0.6 : 1,
    transform: `scale(${size})`
  };

  return (
    <div style={styles.container}>
      <HeartIcon
        style={heartStyle}
        fill={isActive ? "#FF0000" : "none"}
        onClick={!isLoading ? handleClick : undefined}
        stroke={isActive ? "#FF0000" : "#494949"}
      />
    </div>
  );
};

export default Heart;