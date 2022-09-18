import axios from "axios";
import React, { useEffect, useState } from "react";
import { fancyTimeFormat } from "../utils/fancyTimeFormat";

const RecommendationCard = ({ video }: { video: any }) => {
  const baseUrl = "https://inv.riverside.rocks";

  const [recommendationData, setRecommendationData] = useState<any>();

  const getWatchData = () => {
    axios
      .get(`${baseUrl}/api/v1/channels/${video?.authorId}`)
      .then((res) => setRecommendationData(res.data));
  };

  useEffect(() => {
    getWatchData();
  }, []);

  return (
    <div
      className="flex flex-row gap-3 break-words cursor-pointer rounded-lg transition duration-200 hover:bg-stone-200 active:bg-stone-300 px-2 py-2 w-full"
      onClick={() => (location.href = `/watch?v=${video?.videoId}`)}
    >
      <div className="h-min">
        <div className="h-full w-28 grid relative">
          <img
            className="w-full object-contain min-h-0 h-full rounded-md transition"
            src={video?.videoThumbnails[0]?.url}
          />
          <span className="absolute bottom-0 right-0 m-1 font-semibold text-xs text-orange-600 bg-orange-100/75 backdrop-blur-md py-0.5 px-1.5 w-min text-center rounded">
            {fancyTimeFormat(video?.lengthSeconds)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-stone-800 text-sm">{video?.title}</span>
        <div className="inline-flex items-center gap-1">
          <img
            className="w-[1.125rem] h-[1.125rem] rounded-full"
            src={recommendationData?.authorThumbnails[1].url}
            alt=""
          />
          <span className="font-medium text-orange-800 text-sm">
            {video?.author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
