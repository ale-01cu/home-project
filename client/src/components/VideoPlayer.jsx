import {useState} from 'react'

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
  const videoUrl = `http://localhost:8000/api/catalogue/stream/${id}`
  const [videoSrc, setVideoSrc] = useState(null);

  const fetchVideo = async () => {
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    setVideoSrc(URL.createObjectURL(await response.blob()));
  };

  console.log(videoSrc);
  return (
    <div>
      <button onClick={fetchVideo}>Cargar video</button>
      {videoSrc && <video src={videoSrc} controls />}
    </div>
  );
}

export default VideoPlayer