import videojs from 'video.js';
import { useRef, useEffect, useState } from 'react';
import {CHAPTERDETAILURL, CONTENTSUBTITLEURL} from '../utils/urls'
import '@videojs/http-streaming'

const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const {options, onReady, videoQuery, id} = props;
  const [chapter, setChapter] = useState(null)
  
  useEffect(() => {
    if (videoQuery) {
      const url = CHAPTERDETAILURL + videoQuery + '/'

      fetch(url)
      .then(res => res.json())
      .then(data => setChapter(data))
      .catch(e => console.error(e))
    }

  }, [videoQuery])

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

      const videoJs = document.querySelector('video-js video')

      const track = document.createElement('track')
      track.src = options.subtitles.src
      track.kind = options.subtitles.kind
      track.srclang = options.subtitles.srclang
      track.label = options.subtitles.label

      videoJs.appendChild(track)

      player.load();

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
      {
        chapter && 
          <div 
            className='backdrop-blur-lg p-3 pl-2 sm:pl-0 text-lg font-semibold z-50'>
              {chapter.name}
          </div>
      }
      <div ref={videoRef}></div>
    </div>
  );
}

export default VideoJS