import {useState} from 'react'

const VideoPlayer = ({id}) => {
  const [videoUrl, setVideoUrl] = useState(`http://localhost:8000/api/catalogue/stream/${id}`);

  return (
    <div>
      <video controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  )
}

export default VideoPlayer