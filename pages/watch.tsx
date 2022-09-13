import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import VideoPlayer from "../components/VideoPlayer";
import videojs from "video.js";
import NavbarIndex from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { HiCheckCircle } from "react-icons/hi";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

const Watch = () => {
  const { query } = useRouter();
  const [watchData, setWatchData] = useState<any>();
  const [pipedData, setPipedData] = useState<any>();
  const baseUrl = "https://inv.riverside.rocks";
  // Using Piped to get uploaderVerified and Chapters
  const pipedBaseUrl = "https://pa.il.ax";
  
  const [sponsors, setSponsors] = useState<any>([]);
  
  const [chapterTime, setChapterTime] = useState<any>(0);

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

  const getPiped = () => {
    if (query.v) {
      axios
        .get(`${pipedBaseUrl}/streams/${query.v}`)
        .then((res) => setPipedData(res.data));
    }
  };

  useEffect(() => {
    getWatchData();
    getPiped();
    getSponsors();
  }, [query.v]);

  console.log(pipedData);

  function fancyTimeFormat(duration: number) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  return (
    <div className="font-['Inter']">
      <NavbarIndex />
      <Sidebar />
      <div className="pl-52 pt-16 bg-stone-50 h-screen">
        <div className="flex flex-row justify-around p-8 gap-8">
          <div className="flex flex-col gap-5 w-3/4">
            {watchData?.dashUrl.length > 0 &&
            watchData?.dashUrl !== undefined ? (
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
                chapterTime={chapterTime}
              />
            ) : null}
            <div className="flex flex-row justify-between">
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
                  <span className="font-semibold text-orange-800 inline-flex items-center gap-1">
                    {watchData?.author}
                    {pipedData?.uploaderVerified ? (
                      <HiCheckCircle className="h-4 w-4" />
                    ) : null}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end text-end">
                <span className="text-orange-800">
                  Published · <b>{watchData?.publishedText}</b>
                </span>
                <span className="text-stone-800">
                  Views ·{" "}
                  <b>
                    {String(watchData?.viewCount).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1,"
                    )}{" "}
                  </b>
                </span>
                <div>
                  <span className="text-stone-800">
                    <MdThumbUp className="h-4 w-4" />
                  </span>
                  <span className="text-stone-800">
                    <MdThumbDown className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/4">
            {/* Chapters */}
            <div className="bg-stone-100 flex items-start flex-col w-full rounded-lg p-5 gap-3 h-1/2 overflow-y-scroll">
              {pipedData?.chapters.map((chapter: any) => (
                <div className="flex flex-row gap-3 break-words group cursor-pointer" onClick={() => setChapterTime(chapter?.start)}>
                  <img
                    className="w-32 h-min rounded-md group-hover:brightness-90 group-active:brightness-75 transition"
                    src={watchData?.videoThumbnails[0]?.url}
                    alt=""
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-stone-800">
                      {chapter?.title}
                    </span>
                    <span className="font-bold text-xs text-orange-600 bg-orange-100 py-0.5 px-1.5 w-min text-center rounded">
                      {fancyTimeFormat(chapter?.start)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
