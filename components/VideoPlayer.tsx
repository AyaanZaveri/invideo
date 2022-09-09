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

class VideoPlayer extends Component {
  startVideo(video: any) {
    var player = videojs(video);

    player.httpSourceSelector();
    player.vttThumbnails({
      src: "https://inv.riverside.rocks/api/v1/storyboards/N8M8OOe3SV4?width=179&height=90",
    });
  }

  render() {
    return (
      <div className="flex justify-center items-center h-screen">
        <video
          ref={this.startVideo}
          width={this.props.width}
          height={this.props.height}
          controls
          className="video-js vjs-default-skin"
        >
          <source src={this.props.source} type="application/dash+xml" />
          <track
            src="https://inv.riverside.rocks/api/v1/captions/N8M8OOe3SV4?label=English+%28auto-generated%29"
            kind="subtitles"
            srclang="en"
            label="English"
          />
        </video>
      </div>
    );
  }
}

export default VideoPlayer;
