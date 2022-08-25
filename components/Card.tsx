import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = ({ videoData }: any) => {

  // const [channelData, setChannelData] = useState<any>()

  // const getChannelData = (id: string) => {
  //   axios.get(`https://inv.vern.cc/api/v1/channels/${id}`).then(res => setChannelData(res.data))
  // };

  // useEffect(() => {
  //   getChannelData(videoData?.authorId)
  // }, [])

  return (
    <div>
      {videoData.type == "video" ? (
        <div className="w-64 flex flex-col">
          <img
            src={
              videoData?.videoThumbnails?.length > 0
                ? videoData?.videoThumbnails[0]?.url
                : "https://dummyimage.com/1280x720/fff/aaa"
            }
            className="rounded-lg"
            alt=""
          />
          <div className="flex-">

          </div>
        </div>
      ) : videoData.type == "channel" ? (
        <div className="w-64">
          <img
            src={
              videoData?.authorThumbnails?.length > 0
                ? "https:" +
                  videoData?.authorThumbnails[
                    videoData?.authorThumbnails.length - 1
                  ]?.url.replace("s88", "s176")
                : "https://dummyimage.com/1280x720/fff/aaa"
            }
            alt=""
            className="rounded-full w-24"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Card;
