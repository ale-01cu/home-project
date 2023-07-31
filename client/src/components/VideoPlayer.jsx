import {useRef} from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoJS from './VideoJs'
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ id }) => {
  const srcSubtitle = useSelector(state => state.contentDetail.subtitle)
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
    },{
      src: videoUrl,
      type: 'video/mp4',
    },],
    playbackRates: [0.5, 1, 1.5, 2],
    aspectRatio: '16:9',
    enableSourceset: true,
    controls: true,
    autoplay: false,
    fluid: true,
    responsive: true,
    preload: 'metadata',
    language: 'es',
    subtitles: {
      src: srcSubtitle,
      kind: 'subtitles',
      srclang: 'es',
      label: 'Español'
    },
    html5: {
      nativeTextTracks: false
    }
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('error', (error) => {
      console.log("error en el reproductor");
    });

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