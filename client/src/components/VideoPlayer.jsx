import {useEffect, useRef} from 'react'
import videojs from 'video.js';
import { useSearchParams } from 'react-router-dom';
import 'video.js/dist/video-js.css';

// const VideoPlayer = ({id, path}) => {
//   const [videoUrl, setVideoUrl] = useState(`http://localhost:8000/api/catalogue/stream/${id}`);

//   return (
//     <div>
//       <video controls>
//         <source src={videoUrl} type="video/mp4"/>
//       </video>
//     </div>
//   )
// }

 const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const {options, onReady} = props;

  useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

function VideoPlayer({ id }) {
  const [params] = useSearchParams()
  const videoQuery = params.get("v")
  const videoUrl = videoQuery ? `http://localhost:8000/api/catalogue/stream/${id}/${params.get("v")}/` : `http://localhost:8000/api/catalogue/stream/${id}/`
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
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <VideoJS options={options} onReady={handlePlayerReady} />
    </>
  );
}

export default VideoPlayer