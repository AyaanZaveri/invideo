import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import VideoPlayer from "../components/VideoPlayer";
import videojs from "video.js";
import NavbarIndex from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { HiCheckCircle } from "react-icons/hi";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";
import { Head } from "next/document";

const Watch = () => {
  const { query } = useRouter();
  const [watchData, setWatchData] = useState<any>();
  const [pipedData, setPipedData] = useState<any>();
  const baseUrl = "https://inv.riverside.rocks";
  // Using Piped to get uploaderVerified and Chapters
  const pipedBaseUrl = "https://pa.il.ax";

  const [sponsors, setSponsors] = useState<any>([]);

  const [chapterTime, setChapterTime] = useState<any>(0);
  const [likeDislikeData, setLikeDislikeData] = useState<any>();

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

  const getLikeDislike = () => {
    if (query.v) {
      axios
        .get(`https://returnyoutubedislikeapi.com/Votes?videoId=${query.v}`)
        .then((res) => setLikeDislikeData(res.data));
    }
  };

  useEffect(() => {
    getWatchData();
    getPiped();
    getLikeDislike();
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

  console.log(watchData?.authorThumbnails[3]?.url);

  return (
    <div className="font-['Inter']">
      <NavbarIndex />
      <Sidebar />
      {/* <title>Invideo: {watchData?.title}</title> */}
      <div className="pl-52 pt-16 bg-stone-50 h-full">
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
                    src={watchData?.authorThumbnails[2]?.url}
                    alt=""
                  />
                  <span className="font-medium text-orange-800 inline-flex items-center gap-1">
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
                <div className="gap-2 inline-flex">
                  <span className="text-stone-600 inline-flex items-center gap-1">
                    {String(likeDislikeData?.likes).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1,"
                    )}{" "}
                    <HandThumbUpIcon className="h-4 w-4" />
                  </span>
                  <span className="text-stone-600 inline-flex items-center gap-1">
                    {String(likeDislikeData?.dislikes).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1,"
                    )}{" "}
                    <HandThumbDownIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full border-t border-stone-200">
              <div
                className="mt-3 text-stone-800"
                dangerouslySetInnerHTML={{ __html: pipedData?.description }}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/4 gap-8">
            <div className="flex flex-col items-center">
              {/* Chapters */}
              {pipedData?.chapters.length > 0 ? (
                <div className="flex flex-col gap-3 w-full">
                  <span className="text-xl font-bold text-stone-800">
                    Chapters
                  </span>
                  <div className="flex items-start flex-col w-full h-96 overflow-y-scroll scrollbar pr-2">
                    {pipedData?.chapters.map((chapter: any) => (
                      <div
                        className="flex flex-row gap-3 break-words cursor-pointer rounded-lg transition duration-200 hover:bg-stone-200 px-2 py-2 w-full"
                        onClick={() => setChapterTime(chapter?.start)}
                      >
                        <img
                          className="w-28 h-min rounded-md transition"
                          src={chapter?.image}
                          alt=""
                        />
                        <div className="flex flex-col gap-1 justify-center">
                          <span className="font-bold text-stone-800 text-sm">
                            {chapter?.title}
                          </span>
                          <span className="font-semibold text-xs text-orange-600 bg-orange-100 py-0.5 px-1.5 w-min text-center rounded">
                            {fancyTimeFormat(chapter?.start)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-center">
              {/* Chapters */}
              {watchData?.recommendedVideos?.length > 0 ? (
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-start flex-col w-full h-96 overflow-y-scroll scrollbar pr-2">
                    {watchData?.recommendedVideos?.map((chapter: any) => (
                      <div className="flex flex-row gap-3 break-words cursor-pointer rounded-lg transition duration-200 hover:bg-stone-200 px-2 py-2 w-full">
                        <img
                          className="w-28 h-min rounded-md transition"
                          src={watchData?.videoThumbnails[0]?.url}
                          alt=""
                        />
                        <div className="flex flex-col gap-1 justify-center">
                          <span className="font-bold text-stone-800 text-sm">
                            {chapter?.title}
                          </span>
                          <span className="font-semibold text-xs text-orange-600 bg-orange-100 py-0.5 px-1.5 w-min text-center rounded">
                            {fancyTimeFormat(chapter?.start)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
