import React, { Component } from "react";
import PropTypes from "prop-types";

import videojs from "video.js";
import "video.js/dist/video-js.css";
require("videojs-contrib-hls");
require("videojs-contrib-quality-levels");
require("videojs-hls-quality-selector");
require("videojs-http-source-selector");

if (typeof window !== "undefined") {
  window.videojs = videojs as any;
}

class VideoPlayer extends Component {
  startVideo(video: any) {
    var player = videojs(video);

    player.httpSourceSelector();
  }

  render() {
    return (
      <div>
        <video
          ref={this.startVideo}
          width={this.props.width}
          height={this.props.height}
          className="video-js vjs-default-skin"
          controls
        >
          <source src={this.props.source} type="application/dash+xml" />
          <track
            src="https://inv.riverside.rocks/api/v1/captions/JAEfMGz1QBA?label=English+%28auto-generated%29"
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
