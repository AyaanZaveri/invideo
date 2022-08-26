import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashUtils from "../utils/DashUtils";

const Watch = () => {
  const { query } = useRouter();

  const [videoData, setVideoData] = useState<any>();
  const [streams, setStreams] = useState<any>();

  const baseUrl = "https://pa.il.ax";

  const generate_dash_file_from_formats = (VideoFormats: any, VideoLength: any) => {
    const generatedJSON: any = generate_xmljs_json_from_data(VideoFormats, VideoLength);
    return json2xml(generatedJSON);
}

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
    setStreams([streams, videoData?.videoStreams]);
    setStreams([streams, videoData?.audioStreams]);
  }, [videoData])

  generate_

  return (
    <div>

    </div>
  );
};

export default Watch;
