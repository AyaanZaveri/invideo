import React, { Component, useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/forest/index.css";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-vtt-thumbnails/dist/videojs-vtt-thumbnails.css";
import dashjs from "dashjs";
// require("videojs-contrib-dash");
require("videojs-contrib-quality-levels");
require("videojs-http-source-selector");
require("videojs-vtt-thumbnails");
require("videojs-overlay");
import "videojs-hotkeys";

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
  sponsors: any;
}

const VideoPlayer = ({
  width,
  height,
  source,
  captions,
  storyboard,
  poster,
  baseUrl,
  sponsors,
}: Props) => {
  const videoRef = useRef<any>(null);

  console.log(sponsors);

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
    if (typeof player.httpSourceSelector === "function" && player) {
      // @ts-ignore
      player.httpSourceSelector();
    }

    // @ts-ignore
    if (typeof player.vttThumbnails === "function" && player) {
      // @ts-ignore
      player.vttThumbnails({
        src: storyboard,
      });
    }

    // @ts-ignore
    if (typeof player.currentTime === "function" && player) {
      setInterval(() => {
        sponsors.map((sponsor: any) => {
          if (player) {
            if (
              player?.currentTime().toFixed(0) == sponsor.segment[0].toFixed(0)
            ) {
              player?.currentTime(sponsor.segment[1]);

              // @ts-ignore
              if (typeof player.overlay === "function" && player) {
                player.overlay({
                  overlays: [
                    {
                      content: `A ${sponsor.category} has been skipped.`,
                      start: sponsor.segment[1],
                      end: sponsor.segment[1] + 3,
                      class:
                        "p-5 text-lg font-semibold text-gray-300 opacity-80 py-3 backdrop-blur inline-flex justify-end w-full items-end transition ease-in-out duration-500",
                    },
                  ],
                });
              }
            }
          }
        });
      }, 100);
    }

    player.src({
      src: source,
      type: "application/dash+xml",
    });
  }, []);

  return (
    <div className="w-9/12">
      <video
        ref={videoRef}
        controls
        className="video-js vjs-default-skin h-screen w-full vjs-fluid vjs-big-play-centered rounded-lg shadow-lg overflow-hidden"
        poster={poster}
      >
        {/* <source src={source} type="application/dash+xml" /> */}
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
