import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import VideoPlayer from "../components/VideoPlayer";
import videojs from "video.js";
import NavbarIndex from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Watch = () => {
  const { query } = useRouter();
  const [watchData, setWatchData] = useState<any>();
  const baseUrl = "https://inv.riverside.rocks";

  const [sponsors, setSponsors] = useState<any>([]);

  const getSponsors = () => {
    axios
      .get(
        `https://sponsor.ajay.app/api/skipSegments?videoID=${query.v}&categories=[%22sponsor%22,%22selfpromo%22,%22interaction%22,%22intro%22,%22outro%22,%22preview%22]`
      )
      .then((res) =>
        res.data.map((sponsor: any) =>
          setSponsors((prevSponsors: any) => [
            ...prevSponsors,
            { segment: sponsor.segment, category: sponsor.category },
          ])
        )
      );
  };

  console.log(sponsors);

  const getWatchData = () => {
    if (query.v) {
      axios
        .get(`${baseUrl}/api/v1/videos/${query.v}`)
        .then((res) => setWatchData(res.data));
    }
  };

  useEffect(() => {
    getWatchData();
    getSponsors();
  }, [query.v]);

  return (
    <div className="font-['Inter']">
      <NavbarIndex />
      <Sidebar />
      <div className="pl-52 pt-16 bg-stone-50 h-screen">
        <div className="p-8 flex flex-col gap-5">
          {watchData?.dashUrl.length > 0 && watchData?.dashUrl !== undefined ? (
            <VideoPlayer
              width={1280}
              height={720}
              source={
                watchData?.dashUrl.replace("http://", "https://") +
                "?local=true"
              }
              captions={watchData?.captions}
              storyboard={
                baseUrl +
                watchData?.storyboards[watchData?.storyboards.length - 1]?.url
              }
              poster={watchData?.videoThumbnails[0]?.url}
              baseUrl={baseUrl}
              sponsors={sponsors}
            />
          ) : null}
          <div className="flex flex-row justify-between w-3/4">
            <div className="flex flex-col gap-1.5">
              <span className="text-2xl font-bold text-stone-800">
                {watchData?.title}
              </span>
              <div className="inline-flex gap-2 items-center">
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    watchData?.authorThumbnails[
                      watchData?.authorThumbnails.length - 1
                    ]?.url
                  }
                  alt=""
                />
                <span className="font-semibold text-orange-800">
                  {watchData?.author}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-orange-800">
                Published <b>{watchData?.publishedText}</b>
              </span>
              <span className="text-stone-800">
                <b>
                  {String(watchData?.viewCount).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1,"
                  )}{" "}
                </b>
                Views
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
