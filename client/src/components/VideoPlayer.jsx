import {useEffect, useRef} from 'react'
import videojs from 'video.js';
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

function VideoPlayer({ id }) {
  const videoUrl = `http://localhost:8000/api/catalogue/stream/${id}/`
  const videoRef = useRef()

  useEffect(() => {
    // Cree una instancia del reproductor de video utilizando las opciones
    const options = {
      sources: [{
        src: videoUrl,
        type: 'video/mp4',
      }, {
        src: videoUrl,
        type: 'video/x-matroska',
      }],
      controls: true,
      autoplay: true,
      fluid: false,
      with: 200,
      height: 100,
      preload: 'auto'
    };
    const player = videojs(videoRef.current, options);

    // Destruir la instancia del reproductor de video antes de desmontar el componente
    return () => {
      if (player) {
        player.dispose();
      }
    }
  }, [id, videoUrl]);

  return (
    <div>
        <video ref={videoRef} className="video-js vjs-default-skin"></video>
    </div>
  );
}

export default VideoPlayer