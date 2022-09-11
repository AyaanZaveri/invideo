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
import { useSnackbar } from "react-simple-snackbar";

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
  const [sponsors, setSponsors] = useState([
    {
      segment: [87.39, 104.9],
      category: "sponsor",
    },
    {
      segment: [792.335, 858.977],
      category: "sponsor",
    },
  ]);

  const videoRef = useRef<any>(null);

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
      setInterval(() => {
        console.log(player.currentTime());
        sponsors.map((sponsor) => {
          if (
            player.currentTime().toFixed(0) == sponsor.segment[0].toFixed(0)
          ) {
            player.currentTime(sponsor.segment[1]);
          }
        });
      }, 1000);
    }
  }, []);

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
    </div>
  );
};

export default VideoPlayer;
