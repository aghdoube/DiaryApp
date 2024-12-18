import React, { createContext, useState, useRef, useEffect } from "react";

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const tracks = [
    {
      title: "Someone You Loved - Lewis Capaldi",
      src: "/Music/lewis-capaldi.mp3",
      image: "/images/Capaldi.png",
    },
    {
      title: "ROSÉ & Bruno Mars - APT.",
      src: "/Music/apt.mp3",
      image: "/images/Apt.png",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      console.log(audioRef.current?.volume);
    }
  }, [volume]);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (currentTrack) {
          await audioRef.current.play();
        } else if (tracks.length > 0) {
          handleTrackChange(tracks[0]);
        }
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      audioRef.current.currentTime =
        (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const updateProgress = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        progress,
        volume,
        tracks,
        audioRef,
        handlePlayPause,
        handleTrackChange,
        handleProgressChange,
        handleVolumeChange,
        updateProgress,
      }}
    >
      <audio ref={audioRef} onTimeUpdate={updateProgress} />
      {children}
    </MusicPlayerContext.Provider>
  );
};
