import React from "react";

const Card = ({ videoData }: any) => {
  return (
    <div>
      {videoData.type == "channel" ? (
        <div className="w-72">
          <img
            src={
              videoData?.authorThumbnails?.length > 0
                ? "https:" + videoData?.authorThumbnails[videoData?.authorThumbnails.length - 1]?.url
                : "https://dummyimage.com/1280x720/fff/aaa"
            }
            alt=""
          />
        </div>
      ) : videoData.type == "video" ? (
        <div className="w-72">
          <img
            src={
              videoData?.videoThumbnails?.length > 0
                ? videoData?.videoThumbnails[0]?.url
                : "https://dummyimage.com/1280x720/fff/aaa"
            }
            alt=""
          />
        </div>
      ) : null}
    </div>
  );
};

export default Card;
