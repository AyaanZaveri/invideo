import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import VideoPlayer from "../components/VideoPlayer";
import videojs from "video.js";

const Watch = () => {
  const { query } = useRouter();
  const [watchData, setWatchData] = useState<any>();
  const baseUrl = "https://pa.il.ax";

  const getWatchData = () => {
    axios
      .get(`${baseUrl}/streams/${query.v}`)
      .then((res) => setWatchData(res.data));
  };

  useEffect(() => {
    getWatchData();
  }, [query.v]);

  console.log(watchData?.hls);

  return (
    <div>
      {watchData?.hls ? (
        <VideoPlayer
          width={1280}
          height={720}
          source={
            "https://inv.riverside.rocks/api/manifest/dash/id/N8M8OOe3SV4?local=true"
          }
        />
      ) : null}
    </div>
  );
};

export default Watch;
