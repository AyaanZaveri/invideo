import React, { Component, useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/forest/index.css";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-vtt-thumbnails/dist/videojs-vtt-thumbnails.css";
require("videojs-contrib-quality-levels");
require("videojs-http-source-selector");
require("videojs-vtt-thumbnails");
import "videojs-hotkeys";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

if (typeof window !== "undefined") {
  window.videojs = videojs as any;
}

interface Props {
  width: number;
  height: number;
  source: string;
  captions: any;
  storyboard: string;
  poster: string;
  baseUrl: string;
}

const VideoPlayer = ({
  width,
  height,
  source,
  captions,
  storyboard,
  poster,
  baseUrl,
}: Props) => {
  const [currentTime, setCurrentTime] = useState();

  const videoRef = useRef(null);

  useEffect(() => {
    var player = videoRef
      ? videojs(videoRef?.current, {
          autoplay: false,
          plugins: {
            hotkeys: {
              volumeStep: 0.1,
              seekStep: 5,
              enableModifiersForNumbers: false,
            },
          },
        })
      : "";
    // @ts-ignore
    if (typeof player.httpSourceSelector === "function") {
      player.httpSourceSelector();
    }

    // @ts-ignore
    if (typeof player.vttThumbnails === "function") {
      player.vttThumbnails({
        src: storyboard,
      });
    }

    // @ts-ignore
    if (typeof player.currentTime === "function") {
      setCurrentTime((ct) => player.currentTime(ct));
    }
  }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     startVideo();
  //   }, 1000);
  // });

  useEffect(() => {
    currentTime ? currentTime(3) : null;
  }, [currentTime]);

  return (
    <div className="w-9/12">
      <video
        ref={videoRef}
        controls
        className="video-js vjs-default-skin h-screen w-full vjs-fluid vjs-big-play-centered rounded-lg shadow-lg overflow-hidden"
        poster={poster}
      >
        <source src={source} type="application/dash+xml" />
        {captions.map((caption: any) => (
          <track
            src={baseUrl + caption?.url}
            kind="subtitles"
            srcLang={caption?.language_code}
            label={caption?.label}
          />
        ))}
      </video>
      {currentTime}
    </div>
  );
};

export default VideoPlayer;
