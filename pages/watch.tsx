import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashUtils from "../utils/DashUtils";

const Watch = () => {
  const { query } = useRouter();

  const [videoData, setVideoData] = useState<any>();
  const [streams, setStreams] = useState<any>([]);

  const baseUrl = "https://pa.il.ax";

  const getVideoData = (id: string) => {
    axios.get(`${baseUrl}/streams/${id}`).then((res) => setVideoData(res.data));
  };

  useEffect(() => {
    getVideoData(query.v as string);
  }, [query]);

  videoData?.adaptiveFormats
    ?.filter((video: any) => video.container == "webm")
    ?.map((video: any) => console.log(video.resolution, video.url));

  useEffect(() => {
    setStreams([...videoData?.audioStreams, ...videoData?.videoStreams]);
  }, [videoData]);

  const convert = async () => {
    await console.log(streams);

    const uri = await DashUtils.generate_dash_file_from_formats(
      streams,
      videoData?.duration
    );

    await console.log(uri);
  };

  return (
    <div>
      <button onClick={() => convert()}>Convert</button>
    </div>
  );
};

export default Watch;
