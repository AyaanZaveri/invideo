import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashUtils from "../utils/DashUtils";

const Watch = () => {
  const { query } = useRouter();

  const [videoData, setVideoData] = useState<any>();
  const [streams, setStreams] = useState<any>([]);

  const baseUrl = "https://api-piped.mha.fi";

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
    console.log(videoData);
  }, [videoData]);

  let uri: any

  const convert = async () => {
    await console.log(streams);

    const dash = await DashUtils.generate_dash_file_from_formats(
      streams,
      videoData?.duration
    );

    uri = "data:application/dash+xml;charset=utf-8;base64," + btoa(dash);

    const url = new URL(uri);
    const proxyURL = new URL(videoData?.proxyUrl);
    let proxyPath = proxyURL.pathname;
    if (proxyPath.lastIndexOf("/") === proxyPath.length - 1) {
      proxyPath = proxyPath.substring(0, proxyPath.length - 1);
    }
    url.searchParams.set("host", url.host);
    url.protocol = proxyURL.protocol;
    url.host = proxyURL.host;
    url.pathname = proxyPath + url.pathname;
    uri = url.toString();

    await console.log(uri);
  };

  return (
    <div>
      <button onClick={() => convert()}>Convert</button>
    </div>
  );
};

export default Watch;
