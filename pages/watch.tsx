import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import VideoPlayer from "../components/VideoPlayer";
import videojs from "video.js";

const Watch = () => {
  const { query } = useRouter();
  const [watchData, setWatchData] = useState<any>();
  const baseUrl = "https://inv.riverside.rocks";

  const getWatchData = () => {
    if (query.v) {
      axios
        .get(`${baseUrl}/api/v1/videos/${query.v}`)
        .then((res) => setWatchData(res.data));
    }
  };

  useEffect(() => {
    getWatchData();
  }, [query.v]);

  return (
    <div>
      {watchData?.dashUrl.length > 0 && watchData?.dashUrl !== undefined ? (
        <VideoPlayer
          width={1280}
          height={720}
          source={
            watchData?.dashUrl.replace("http://", "https://") + "?local=true"
          }
          captions={watchData?.captions}
          storyboard={
            baseUrl +
            watchData?.storyboards[watchData?.storyboards.length - 1]?.url
          }
          poster={watchData?.videoThumbnails[0]?.url}
          baseUrl={baseUrl}
        />
      ) : null}
    </div>
  );
};

export default Watch;
