import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DashGenerator } from "../utils/dash.generator";

const Watch = () => {
  const { query } = useRouter();

  const [videoData, setVideoData] = useState<any>();
  const [streams, setStreams] = useState<any>([]);

  const baseUrl = "https://inv.vern.cc/api/v1";

  const getVideoData = (id: string) => {
    axios.get(`${baseUrl}/videos/${id}`).then((res) => setVideoData(res.data));
  };

  console.log(videoData)

  useEffect(() => {
    getVideoData(query.v as string);
  }, [query]);

  useEffect(() => {
    setStreams(
      videoData?.adaptiveFormats?.filter(
        (video: any) => video.container == "mp4" || video.container == "m4a"
      ),
    );
  }, [videoData]);
  console.log(streams);

  const generateDash = async () => {
    const xml_string = DashGenerator.generateDashFileFromFormats(
      streams,
      videoData?.lengthSeconds
    );
    console.log(xml_string);
  };

  return (
    <div>
      <button onClick={() => generateDash()}>Convert</button>
    </div>
  );
};

export default Watch;
