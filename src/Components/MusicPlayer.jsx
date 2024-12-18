import React, { useContext } from "react";
import { MusicPlayerContext } from "../Context/MusicPlayerContext";

const MusicPlayer = () => {
  const {
    isPlaying,
    currentTrack,
    progress,
    volume,
    tracks,
    handlePlayPause,
    handleTrackChange,
    handleProgressChange,
    handleVolumeChange,
  } = useContext(MusicPlayerContext);

  return (
    <div className="music-player">
      <h3>Music Player</h3>
      <div className="controls">
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-control"
        />
      </div>
      <div className="track-list">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`track ${currentTrack === track ? "active" : ""}`}
            onClick={() => handleTrackChange(track)}
          >
            <img
              src={track.image}
              alt={track.title}
              className="track-thumbnail"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
            <span className="track-title">{track.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
