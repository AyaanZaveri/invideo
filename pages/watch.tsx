import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Watch = () => {
  const { query } = useRouter();

  const [videoData, setVideoData] = useState<any>();
  const [streams, setStreams] = useState<any>([]);

  const baseUrl = "https://inv.vern.cc/api/v1";

  const getVideoData = (id: string) => {
    axios.get(`${baseUrl}/videos/${id}`).then((res) => setVideoData(res.data));
  };

  useEffect(() => {
    getVideoData(query.v as string);
  }, [query]);

  videoData?.adaptiveFormats
    ?.filter((video: any) => video.container == "webm")
    ?.map((video: any) =>
      console.log(
        video.resolution ? video.resolution : video.audioQuality,
        video.url
      )
    );

  console.log(videoData);

  return (
    <div>
      <button>Convert</button>
    </div>
  );
};

export default Watch;
