import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import styles from './daily.module.css';

// 假資料配置
const MOCK_DATA = {
  songs: [
    {
      id: 1,
      title: "夏日精選",
      artist: "夜雨聲",
      album: "夏日精選輯",
      genre: "流行",
      cover: "/Liam/05/1.jpg",
      trackList: [
        { 
          id: "t1", 
          name: "城市邊緣", 
          duration: 30,
          audioUrl: "/Liam/music/01/01.mp3"
        },
        { 
          id: "t2", 
          name: "無重力時刻", 
          duration: 30,
          audioUrl: "/Liam/music/01/02.mp3"
        },
        { 
          id: "t3", 
          name: "山間絮語", 
          duration: 30,
          audioUrl: "/Liam/music/01/03.mp3"
        }
      ]
    },
    {
      id: 2,
      title: "冬季精選",
      artist: "海嵐樂團",
      album: "冬日精選輯",
      genre: "R&B",
      cover: "/Liam/18/2.jpg",
      trackList: [
        { 
          id: "t4", 
          name: "藍色浪潮", 
          duration: 30,
          audioUrl: "/Liam/music/01/11.mp3"
        },
        { 
          id: "t5", 
          name: "春意盎然", 
          duration: 30,
          audioUrl: "/Liam/music/01/12.mp3"
        },
        { 
          id: "t6", 
          name: "午夜咖啡廳", 
          duration: 30,
          audioUrl: "/Liam/music/01/8.mp3"
        }
      ]
    },
    {
      id: 3,
      title: "春季精選",
      artist: "林澗",
      album: "春日精選輯",
      genre: "流行",
      cover: "/Liam/16/1.jpg",
      trackList: [
        { 
          id: "t7", 
          name: "銀河漫遊", 
          duration: 30,
          audioUrl: "/Liam/music/01/1.mp3"
        },
        { 
          id: "t8", 
          name: "四季輪迴", 
          duration: 30,
          audioUrl: "/Liam/music/01/2.mp3"
        },
        { 
          id: "t9", 
          name: "自由飛翔", 
          duration: 30,
          audioUrl: "/Liam/music/01/3.mp3"
        }
      ]
    },
    {
      id: 4,
      title: "秋季精選",
      artist: "雲端漫步者",
      album: "秋日精選輯",
      genre: "搖滾",
      cover: "/Liam/25/1.jpg",
      trackList: [
        { 
          id: "t10", 
          name: "星空列車", 
          duration: 30,
          audioUrl: "/Liam/music/01/4.mp3"
        },
        { 
          id: "t11", 
          name: "時光的拼圖", 
          duration: 30,
          audioUrl: "/Liam/music/01/5.mp3"
        },
        { 
          id: "t12", 
          name: "擁抱", 
          duration: 30,
          audioUrl: "/Liam/music/01/6.mp3"
        }
      ]
    },
    {
      id: 5,
      title: "年度精選",
      artist: "霓虹森林",
      album: "年度精選輯",
      genre: "流行",
      cover: "/Liam/30/1.jpg",
      trackList: [
        { 
          id: "t13", 
          name: "三樓的風", 
          duration: 30,
          audioUrl: "/Liam/music/01/7.mp3"
        },
        { 
          id: "t14", 
          name: "紙飛機的軌跡", 
          duration: 30,
          audioUrl: "/Liam/music/01/8.mp3"
        },
        { 
          id: "t15", 
          name: "記得", 
          duration: 30,
          audioUrl: "/Liam/music/01/9.mp3"
        }
      ]
    }
  ]
};

const MusicPlayer = () => {
  // 基本狀態
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolume] = useState(0.8);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Audio ref
  const audioRef = useRef(null);

  // 初始化 Audio 對象
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new window.Audio();
    }
  }, []);

  // 初始化推薦列表
  useEffect(() => {
    try {
      const today = new Date();
      const recommendList = MOCK_DATA.songs.map((song, index) => {
        const date = new Date(today);
        date.setDate(date.getDate() - index);
        
        return {
          ...song,
          date: date.toISOString().split('T')[0],
          dayText: index === 0 ? '今天' : `${index}天前`
        };
      });

      setRecommendations(recommendList);
      setSelectedRecommendation(recommendList[0]);
      setLoading(false);
    } catch (err) {
      setError('載入推薦列表失敗');
      setLoading(false);
    }
  }, []);

  // 音頻事件監聽
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(Math.min(audio.duration, 30));
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleError = (e) => {
      setError('音頻播放失敗');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // 音量控制
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 切換曲目時的處理
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (selectedRecommendation && selectedRecommendation.trackList[currentTrackIndex]) {
      const track = selectedRecommendation.trackList[currentTrackIndex];
      audioRef.current.src = track.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          setError('播放失敗');
          setIsPlaying(false);
        });
      }
    }
  }, [selectedRecommendation, currentTrackIndex]);

  // 播放控制
  const togglePlayback = () => {
    if (!selectedRecommendation || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        setError('播放失敗');
      });
    }
    setIsPlaying(!isPlaying);
  };

  // 上一首
  const handlePrevious = () => {
    if (!selectedRecommendation) return;
    
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
    } else {
      setCurrentTrackIndex(selectedRecommendation.trackList.length - 1);
    }
  };

  // 下一首
  const handleNext = () => {
    if (!selectedRecommendation) return;
    
    if (currentTrackIndex < selectedRecommendation.trackList.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  // 進度控制
  const handleProgressBarClick = (e) => {
    if (!audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = Math.min(30, percentage * duration);
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 選擇推薦
  const handleRecommendationSelect = (recommendation) => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    }
    setSelectedRecommendation(recommendation);
    setCurrentTrackIndex(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // 格式化時間
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 載入中狀態
  if (loading) {
    return <div className={styles.loadingState}>載入中...</div>;
  }

  // 錯誤狀態
  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }

  // 獲取當前播放的曲目
  const currentTrack = selectedRecommendation?.trackList[currentTrackIndex];

  // JSX 部分保持不變...
  // 返回之前的完整 JSX 結構
  return (
    <div className={styles.player}>
      {/* 當前播放區域 */}
      {selectedRecommendation && (
        <div className={styles.nowPlaying}>
          <img 
            src={selectedRecommendation.cover}
            alt={selectedRecommendation.title}
            className={styles.currentImage}
          />
          
          <div className={styles.currentInfo}>
            <div className={styles.titleRow}>
              <h2>{currentTrack?.name}</h2>
              <span className={styles.genre}>{selectedRecommendation.genre}</span>
            </div>
            
            <p className={styles.artistName}>{selectedRecommendation.artist}</p>

            {/* 播放控制 */}
            <div className={styles.controls}>
              {/* 進度條 */}
              <div className={styles.progressBar} onClick={handleProgressBarClick}>
                <div 
                  className={styles.progressFill}
                  style={{width: `${(currentTime / duration) * 100}%`}}
                />
              </div>
              
              {/* 時間和音量 */}
              <div className={styles.timeAndVolume}>
                <span className={styles.time}>
                  {formatTime(currentTime)}/{formatTime(duration)}
                </span>
                <div className={styles.volume}>
                  <Volume2 size={16} />
                  <input 
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className={styles.volumeSlider}
                  />
                </div>
              </div>

              {/* 播放按鈕 */}
              <div className={styles.playButtons}>
                <button 
                  className={styles.controlBtn}
                  onClick={handlePrevious}
                >
                  <SkipBack size={20} />
                </button>
                <button 
                  className={styles.playBtn}
                  onClick={togglePlayback}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button 
                  className={styles.controlBtn}
                  onClick={handleNext}
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 推薦列表 */}
      <div className={styles.recommendList}>
        <div className={styles.listHeader}>
          <h3>每日推薦</h3>
        </div>
        
        <div className={styles.list}>
          {recommendations.map((rec) => (
            <button
              key={rec.id}
              className={`${styles.recommendItem} ${selectedRecommendation?.id === rec.id ? styles.active : ''}`}
              onClick={() => handleRecommendationSelect(rec)}
            >
              <img 
                src={rec.cover}
                alt={rec.title}
                className={styles.albumCover}
              />
              <div className={styles.itemInfo}>
                <span className={styles.date}>{rec.dayText}</span>
                <span className={styles.name}>{rec.artist}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;