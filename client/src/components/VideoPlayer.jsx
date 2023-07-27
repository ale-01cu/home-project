import {useRef} from 'react'
import { useSearchParams } from 'react-router-dom';
import VideoJS from './VideoJs'
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ id }) => {
  const [params] = useSearchParams()
  const videoQuery = params.get("v")
  const videoUrl = videoQuery 
  ? `http://localhost:8000/api/catalogue/stream/${id}/${videoQuery}/` 
  : `http://localhost:8000/api/catalogue/stream/${id}/`
  const playerRef = useRef(null)

  const options = {
    sources: [{
      src: videoUrl,
      type: 'video/mp4',
    }, {
      src: videoUrl,
      type: 'video/x-matroska',
    }],
    controls: true,
    autoplay: false,
    fluid: true,
    responsive: true,
    preload: 'metadata',
    language: 'es'
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });
  };

  return (
    <>
      <VideoJS 
        options={options} 
        onReady={handlePlayerReady} 
        videoQuery={videoQuery}
      />
    </>
  );
}

export default VideoPlayer