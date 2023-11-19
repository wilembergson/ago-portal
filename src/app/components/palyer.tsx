'use client'
import YouTube from 'react-youtube'

export default function Player(){
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
        
      }
    return (
        <YouTube videoId='jfKfPfyJRdk' opts={opts}/>
    )
}
