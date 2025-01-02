function SpotifyEmbedPlayer() {
  const playlistId = "YOUR_PLAYLIST_ID"; // 替換成您的播放清單 ID

  return (
    <iframe
      // src={`https://open.spotify.com/embed/playlist/${playlistId}`}
      src={`https://open.spotify.com/embed/playlist/1rlVbPZEYLNHHICSQE4dJ9`}
      width="300"
      height="380"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      title="Spotify Embed Player"
    ></iframe>
  );
}

export default SpotifyEmbedPlayer;