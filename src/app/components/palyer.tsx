'use client'
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube'

export default function Player() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const calculateHeight = () => {
    // Use a proporção desejada entre width e height (ex: 16:9)
    const aspectRatio = 14 / 28;
    return windowDimensions.width > 600 ? 336 : windowDimensions.width * aspectRatio;
  };

  const opts = {
    height: calculateHeight(),
    width: windowDimensions.width > 600 ? '600' : '100%', // Use 100% width for smaller screens
    playerVars: {
      autoplay: 1
    },
  };
  return (
    <div>
      <YouTube videoId='jfKfPfyJRdk' opts={opts} />
      {/*<div className="flex w-full h-full z-9 t-0 bg-red-500 relative mt-[-336px] opacity-0"/>*/}
    </div>

  )
}
