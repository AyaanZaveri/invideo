import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { commaNumber } from "../utils/commaNumber";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";

const Card = ({ videoResults }: any) => {
  // const [videoData, setVideoData] = useState<any>();

  // const baseUrl = "https://inv.riverside.rocks/api/v1/";

  // const getVideoData = (id: string) => {
  //   axios
  //     .get(`${baseUrl}/api/v1/channels/${id}`)
  //     .then((res) => setVideoData(res.data));
  // };

  // useEffect(() => {
  //   if (videoResults) {
  //     getVideoData(videoResults?.videoId);
  //   }
  // }, []);

  console.log(videoResults);

  const router = useRouter();

  return (
    <div>
      {videoResults?.type == "video" || videoResults?.type == "shortVideo" ? (
        <div
          className="w-64 flex flex-col gap-2"
          onClick={() => router.push(`/watch?v=${videoResults?.videoId}`)}
        >
          <div className="h-min">
            <div className="h-full w-64 grid relative">
              <img
                className="w-full object-contain min-h-0 h-full rounded-lg transition shadow-lg hover:brightness-90 active:brightness-75 hover:cursor-pointer"
                src={
                  videoResults?.videoThumbnails?.length > 0
                    ? videoResults?.videoThumbnails[1]?.url.replace(":3000", "")
                    : "https://dummyimage.com/1280x720/fff/aaa"
                }
              />
              <span className="absolute bottom-0 right-0 m-1 font-semibold text-xs text-orange-600 bg-orange-100/75 backdrop-blur-md py-0.5 px-1.5 w-min text-center rounded">
                {fancyTimeFormat(videoResults?.lengthSeconds)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold">{videoResults?.title}</span>
            <span className="text-xs font-semibold text-orange-500">
              {videoResults?.author}
            </span>
            <div className="flex flex-row">
              <span className="text-xs font-semibold text-orange-900">
                {commaNumber(videoResults?.viewCount)} Views ·{" "}
                {videoResults?.publishedText}
              </span>
            </div>
          </div>
        </div>
      ) : videoResults.type == "channel" ? (
        <div className="w-64 flex items-center justify-center flex-col gap-3">
          <img
            src={
              videoResults?.authorThumbnails?.length > 0
                ? "https:" +
                  videoResults?.authorThumbnails[
                    videoResults?.authorThumbnails.length - 1
                  ]?.url.replace("s88", "s176")
                : "https://dummyimage.com/1280x720/fff/aaa"
            }
            alt=""
            className="rounded-full w-24 shadow-lg"
          />
          <div className="flex flex-col items-center justify-center">
            <span className="font-semibold text-stone-900">
              {videoResults?.author}
            </span>
            <span className="font-semibold text-sm text-orange-500">
              {commaNumber(videoResults?.subCount)} Subscribers
            </span>
            <span className="font-semibold text-sm text-orange-900">
              {commaNumber(videoResults?.videoCount)} Videos
            </span>
            <span className="font-medium text-xs text-center mt-2 text-black">
              {videoResults?.description}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
