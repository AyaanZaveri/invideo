import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Card = ({ videoResults }: any) => {
  const [videoData, setVideoData] = useState<any>();

  const baseUrl = "https://inv.vern.cc/api/v1/";

  const getVideoData = (id: string) => {
    axios
      .get(`${baseUrl}/api/v1/channels/${id}`)
      .then((res) => setVideoData(res.data));
  };

  useEffect(() => {
    if (videoResults) {
      getVideoData(videoResults?.videoId);
    }
  }, []);

  console.log(videoResults);

  const router = useRouter()

  return (
    <div>
      {videoResults?.type == "video" ? (
        <div
          className="w-64 flex flex-col gap-2"
          onClick={() => router.push(`/watch?v=${videoResults?.videoId}`)}
        >
          <img
            src={
              videoResults?.videoThumbnails?.length > 0
                ? videoResults?.videoThumbnails[1]?.url.replace(":3000", "")
                : "https://dummyimage.com/1280x720/fff/aaa"
            }
            className="rounded-lg shadow-lg hover:brightness-90 active:brightness-75 transition hover:cursor-pointer"
            alt=""
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold">{videoResults?.title}</span>
            <span className="text-xs font-semibold text-orange-500">
              {videoResults?.author}
            </span>
            <div className="flex flex-row">
              <span className="text-xs font-semibold text-orange-900">
                {String(videoResults?.viewCount).replace(
                  /(.)(?=(\d{3})+$)/g,
                  "$1,"
                )}{" "}
                Views · {videoResults?.publishedText}
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
              {String(videoResults?.subCount).replace(
                /(.)(?=(\d{3})+$)/g,
                "$1,"
              )}{" "}
              Subscribers
            </span>
            <span className="font-semibold text-sm text-orange-900">
              {String(videoResults?.videoCount).replace(
                /(.)(?=(\d{3})+$)/g,
                "$1,"
              )}{" "}
              Videos
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
