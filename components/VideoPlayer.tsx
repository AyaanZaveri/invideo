import React, { Component } from "react";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/city/index.css";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-vtt-thumbnails/dist/videojs-vtt-thumbnails.css";
require("videojs-contrib-quality-levels");
require("videojs-http-source-selector");
require("videojs-vtt-thumbnails");

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
  const startVideo = (video: any) => {
    var player = video ? videojs(video, { autoplay: true }) : "";
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
  };
  

  return (
    <div className="">
      <video
        ref={startVideo}
        width={width}
        height={height}
        controls
        className="video-js vjs-default-skin"
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
    </div>
  );
};

export default VideoPlayer;
