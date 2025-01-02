import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './music.module.css';
import { Play, Pause, SkipBack, SkipForward, Mic } from 'lucide-react';

const AudioPlayer = () => {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [music, setMusic] = useState([])
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const SONG_LIMIT = 30; // 30 seconds limit

  const songs = [
    {
      title: "夜曲",
      artist: "周杰倫",
      url: "/Liam/music/04.wav",
      cover: "/Liam/01/01.jpg"
    },
    {
      title: "告白氣球",
      artist: "周杰倫",
      url: "/Liam/music/04.wav",
      cover: "/Liam/01/02.jpg"
    },
    {
      title: "說好不哭",
      artist: "周杰倫",
      url: "/path/to/song3.mp3",
      cover: "/Liam/01/03.jpg"
    },
    {
      title: "晴天",
      artist: "周杰倫",
      url: "/path/to/song4.mp3",
      cover: "/Liam/01/04.jpg"
    },
    {
      title: "稻香",
      artist: "周杰倫",
      url: "/path/to/song5.mp3",
      cover: "/Liam/01/06.jpg"
    }
  ];

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Check if current time exceeds 30 seconds
    if (currentTime >= SONG_LIMIT) {
      handleSongChange('next');
    }
  }, [currentTime]);

  useEffect(()=>{
    const fetchMusic = async () => {
      try {
        if (!router.isReady) return;

        const { project } = router.query;

        const response = await fetch(
          `http://localhost:3005/fundraiser/music/${project}`
        );
        const data = await response.json();
        console.log(data);
        setMusic(data.data||[])
        
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMusic()
  },[router.isReady])

  const handlePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongChange = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentSong + 1) % songs.length;
    } else {
      newIndex = (currentSong - 1 + songs.length) % songs.length;
    }
    setCurrentSong(newIndex);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  if (!music) {
    return <div className={styles.loading}>載入中...</div>;
  }

  if (music.length === 0) {
    return <div className={styles.noMusic} style={{textAlign:'center',height:'50px'}}>暫無音樂</div>;
  }

  return (
    <div className={styles.playerContainer}>
      <div className={styles.albumCarousel}>
        {music.map((song, index) => {
          const offset = index - currentSong;
          const isActive = index === currentSong;
          
          return (
            <div
              key={index}
              className={`${styles.albumCard} ${isActive ? styles.active : ''}`}
              style={{
                transform: `
                  translateX(${offset * 120}%) 
                  translateZ(${isActive ? 0 : -100}px) 
                  rotateY(${offset * 45}deg)
                `,
                opacity: isActive ? 1 : 0.5,
                zIndex: isActive ? 5 : Math.abs(offset)
              }}
            >
              <img src={song.cover} alt={song.title} />
            </div>
          );
        })}
      </div>

      <div className={styles.trackProgress}>
        <div className={styles.timeDisplay}>
          <span>{formatTime(currentTime)}</span>
          <span className={styles.trackCount}>{`${currentSong + 1}/${music.length}`}</span>
          <span>{formatTime(Math.min(SONG_LIMIT, duration))}</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFilled} 
            style={{width: `${(currentTime / SONG_LIMIT) * 100}%`}}
          />
          <input
            type="range"
            value={currentTime}
            max={SONG_LIMIT}
            onChange={(e) => {
              const time = parseFloat(e.target.value);
              setCurrentTime(time);
              if (audioRef.current) {
                audioRef.current.currentTime = time;
              }
            }}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <button 
          className={styles.controlButton}
          onClick={() => handleSongChange('prev')}
        >
          <SkipBack size={24} />
        </button>
        <button 
          className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
        <button 
          className={styles.controlButton}
          onClick={() => handleSongChange('next')}
        >
          <SkipForward size={24} />
        </button>
      </div>

      {music[currentSong] && (
        <audio
          ref={audioRef}
          src={music[currentSong].url}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => handleSongChange('next')}
        />
      )}
    </div>
  );
};

export default AudioPlayer;