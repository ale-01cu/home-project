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

function VideoPlayer({ id }) {
  const [params] = useSearchParams()
  const videoQuery = params.get("v")
  console.log(videoQuery);
  const videoUrl = videoQuery ? `http://localhost:8000/api/catalogue/stream/${id}/${params.get("v")}/` : `http://localhost:8000/api/catalogue/stream/${id}/`
  const videoRef = useRef(null)

  console.log(videoUrl);
  useEffect(() => {
    console.log("almejas");
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
      autoplay: false,
      fluid: true,
      preload: 'auto',
    };
    
    const player = videojs(videoRef.current, options);

    // Destruir la instancia del reproductor de video antes de desmontar el componente
    return () => {
      if (player) {
        player.dispose();
      }
    }
  }, [id, videoUrl, videoQuery]);

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin"></video>
    </div>
  );
}

export default VideoPlayer