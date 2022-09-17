import React, { Component, useEffect, useRef, useState } from "react";
import "video.js/dist/video-js.css";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-vtt-thumbnails/dist/videojs-vtt-thumbnails.css";
import dashjs from "dashjs";
require("videojs-contrib-quality-levels");
require("videojs-http-source-selector");
require("videojs-vtt-thumbnails");
require("videojs-overlay");
import "videojs-hotkeys";
require("@silvermine/videojs-quality-selector/dist/css/quality-selector.css");
require("@silvermine/videojs-quality-selector")(videojs);

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
  chapterTime: any;
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
  chapterTime,
}: Props) => {
  const videoRef = useRef<any>(null);
  const [player, setPlayer] = useState<any>();

  console.log(sponsors);

  var videoOptions = {
    autoplay: false,
    plugins: {
      httpSourceSelector: {
        default: "high",
      },
    },
  };

  useEffect(() => {
    var videoPlayer = videoRef
      ? videojs(videoRef?.current, videoOptions)
      : null;
    setPlayer(videoPlayer);
  }, []);

  useEffect(() => {
    if (player) {
      // @ts-ignore
      if (typeof player.httpSourceSelector === "function" && player) {
        // @ts-ignore
        player.httpSourceSelector();
      }

      // @ts-ignore
      if (typeof player.hotkeys === "function" && player) {
        // @ts-ignore
        player.hotkeys({
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false,
        });
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
                player?.currentTime().toFixed(0) ==
                sponsor.segment[0].toFixed(0)
              ) {
                player?.currentTime(sponsor.segment[1]);

                // @ts-ignore
                if (typeof player.overlay === "function" && player) {
                  // @ts-ignore
                  player?.overlay({
                    overlays: [
                      {
                        content: `A ${sponsor.category} has been skipped.`,
                        start: sponsor.segment[1],
                        end: sponsor.segment[1] + 3,
                        class:
                          "p-5 text-lg font-semibold text-orange-500 opacity-80 py-3 backdrop-blur inline-flex justify-end w-full items-end transition ease-in-out duration-500",
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

      // player.src([
      //   {
      //     src: "https://rr2---sn-p5qs7nsk.googlevideo.com/videoplayback?expire=1663390912&ei=YAAlY7eKMIO6gwPerrYI&ip=135.148.149.204&id=o-AEY15Jk1PkMZSH08xZ74IjCLP_dVo6PH-fmYrkR02pYF&itag=313&source=youtube&requiressl=yes&mh=Pw&mm=31%2C29&mn=sn-p5qs7nsk%2Csn-p5qlsn6l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=348750&vprv=1&svpuc=1&mime=video%2Fwebm&gir=yes&clen=827196261&dur=573.172&lmt=1663267743084008&mt=1663368781&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=ANDROID&rbqsm=fr&txp=4532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgfUkqtK5_SqzZjlpgRiR4Gj42sptJVbMlNLppSr07HRECICgrh0-MgyNjSl4GF6SXsprdUMixfMvGDnHJD5FlMjkb&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAOCiKcyjU8e1ffF_m4FlP6XvxahnTl5ePLFIRUgQpf5wAiA-mhKy1T2OqHmaK2iFuCh6eM8FXG8Iv_tvDmrUYX386Q%3D%3D&host=rr2---sn-p5qs7nsk.googlevideo.com",
      //     type: "video/webm",
      //     label: "2160P",
      //   },
      //   {
      //     src: "https://rr2---sn-p5qs7nsk.googlevideo.com/videoplayback?expire=1663390912&ei=YAAlY7eKMIO6gwPerrYI&ip=135.148.149.204&id=o-AEY15Jk1PkMZSH08xZ74IjCLP_dVo6PH-fmYrkR02pYF&itag=248&source=youtube&requiressl=yes&mh=Pw&mm=31%2C29&mn=sn-p5qs7nsk%2Csn-p5qlsn6l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=348750&vprv=1&svpuc=1&mime=video%2Fwebm&gir=yes&clen=91404880&dur=573.172&lmt=1663268355330538&mt=1663368781&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=ANDROID&rbqsm=fr&txp=4537434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAIB2nFMqplkA_fxzOJ6Wusrl986_ccN1O-kanNYgVMEPAiBm7IwN9uSMsMgS2cltCH3k8xeznHidTYh-bTIgvxwKeA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAOCiKcyjU8e1ffF_m4FlP6XvxahnTl5ePLFIRUgQpf5wAiA-mhKy1T2OqHmaK2iFuCh6eM8FXG8Iv_tvDmrUYX386Q%3D%3D&host=rr2---sn-p5qs7nsk.googlevideo.com",
      //     type: "video/webm",
      //     label: "1080P",
      //     selected: true,
      //   },
      //   {
      //     src: "https://rr2---sn-p5qs7nsk.googlevideo.com/videoplayback?expire=1663390912&ei=YAAlY7eKMIO6gwPerrYI&ip=135.148.149.204&id=o-AEY15Jk1PkMZSH08xZ74IjCLP_dVo6PH-fmYrkR02pYF&itag=247&source=youtube&requiressl=yes&mh=Pw&mm=31%2C29&mn=sn-p5qs7nsk%2Csn-p5qlsn6l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=348750&vprv=1&svpuc=1&mime=video%2Fwebm&gir=yes&clen=51749685&dur=573.172&lmt=1663268444924300&mt=1663368781&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=ANDROID&rbqsm=fr&txp=4537434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgRjgJ9neQh8SuyIME0JX3y6XG5HCeyQMosVsJJoyRG8YCIQD-1EZtMWn_dtSCxkfkeTW6LnmVpFjdhqkXOlwGqD0dfQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAOCiKcyjU8e1ffF_m4FlP6XvxahnTl5ePLFIRUgQpf5wAiA-mhKy1T2OqHmaK2iFuCh6eM8FXG8Iv_tvDmrUYX386Q%3D%3D&host=rr2---sn-p5qs7nsk.googlevideo.com",
      //     type: "video/webm",
      //     label: "720P",
      //   },
      // ]);

      // var track = new videojs.AudioTrack({
      //   id: "my-spanish-audio-track",
      //   kind: "translation",
      //   label: "Spanish",
      //   language: "es",
      // });

      // player.audioTracks().addTrack(track);
    }
  }, [player]);

  useEffect(() => {
    player?.currentTime(chapterTime);
  }, [chapterTime]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        className="video-js vjs-default-skin w-full vjs-fluid vjs-big-play-centered rounded-lg overflow-hidden"
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
      {/* <video
        ref={videoRef}
        controls
        className="video-js vjs-default-skin w-full vjs-fluid vjs-big-play-centered rounded-lg overflow-hidden"
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
      </video> */}
    </div>
  );
};

export default VideoPlayer;
