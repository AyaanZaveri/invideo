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
import { fancyTimeFormat } from "../utils/fancyTimeFormat";
import { commaNumber } from "../utils/commaNumber";
import {
  BsBadge4KFill,
  BsBadge8KFill,
  BsBadgeCcFill,
  BsBadgeHdFill,
} from "react-icons/bs";

const Watch = () => {
  const { query } = useRouter();
  const [watchData, setWatchData] = useState<any>();
  const [pipedData, setPipedData] = useState<any>();
  const [showMore, setShowMore] = useState<boolean>(false);
  const baseUrl = "https://inv.riverside.rocks";
  // Using Piped to get uploaderVerified and Chapters
  const pipedBaseUrl = "https://pa.il.ax";

  const [sponsors, setSponsors] = useState<any>([]);
  const [commentsData, setCommentsData] = useState<any>();

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

  const getComments = () => {
    if (query.v) {
      axios
        .get(`${baseUrl}/api/v1/comments/${query.v}`)
        .then((res) => setCommentsData(res.data));
    }
  };

  useEffect(() => {
    getWatchData();
    getPiped();
    getLikeDislike();
    getSponsors();
    getComments();
  }, [query.v]);

  return (
    <div className="font-['Inter']">
      <NavbarIndex />
      <Sidebar />
      {/* <title>Invideo: {watchData?.title}</title> */}
      <div className="pt-16">
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
                <div className="inline-flex gap-2 items-center">
                  <span className="text-2xl font-bold text-stone-800">
                    {watchData?.title}
                  </span>
                </div>
                <div className="inline-flex gap-2 items-center">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={watchData?.authorThumbnails[2]?.url}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-orange-800 inline-flex items-center gap-1">
                      {watchData?.author}
                      {pipedData?.uploaderVerified ? (
                        <HiCheckCircle className="h-4 w-4" />
                      ) : null}
                    </span>
                    <span className="text-stone-600 text-xs inline-flex items-center gap-1">
                      {watchData?.subCountText} Subscribers
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end text-end">
                {watchData?.publishedText ? (
                  <span className="text-orange-800">
                    Published · <b>{watchData?.publishedText}</b>
                  </span>
                ) : null}
                {watchData?.viewCount ? (
                  <span className="text-stone-800">
                    Views · <b>{commaNumber(watchData?.viewCount)} </b>
                  </span>
                ) : null}
                {likeDislikeData?.likes & likeDislikeData?.dislikes ? (
                  <div>
                    <div className="gap-2 inline-flex">
                      <span className="text-stone-600 inline-flex items-center gap-1">
                        {commaNumber(likeDislikeData?.likes)}{" "}
                        <HandThumbUpIcon className="h-4 w-4" />
                      </span>
                      <span className="text-stone-600 inline-flex items-center gap-1">
                        {commaNumber(likeDislikeData?.dislikes)}{" "}
                        <HandThumbDownIcon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="bg-orange-200 w-full rounded-full">
                      <div
                        className="h-0.5 mt-0.5 z-30 bg-orange-500 rounded-full"
                        style={{
                          width:
                            (likeDislikeData?.likes /
                              (likeDislikeData?.dislikes +
                                likeDislikeData?.likes)) *
                              100 +
                            "%",
                        }}
                      ></div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full border-t border-stone-200">
              {showMore ? (
                <div>
                  <div
                    className="mt-3 text-stone-800"
                    dangerouslySetInnerHTML={{
                      __html: watchData?.descriptionHtml.replaceAll(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  />
                  <button
                    onClick={() => setShowMore(false)}
                    className="text-stone-800 hover:text-orange-600 transition-colors duration-200 text-sm"
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    className="mt-3 text-stone-800 line-clamp-6"
                    dangerouslySetInnerHTML={{
                      __html: watchData?.descriptionHtml.replaceAll(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  />
                  <button
                    onClick={() => setShowMore(true)}
                    className="text-stone-800 hover:text-orange-600 transition-colors duration-200 text-sm"
                  >
                    Show More
                  </button>
                </div>
              )}
              <div className="mt-3 w-full border-t border-stone-200"></div>
              {/* Comments */}
              <div className="mt-6 flex flex-col gap-8">
                {commentsData
                  ? commentsData?.comments.map((comment: any) => (
                      <div className="flex flex-row gap-3 items-start">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={comment?.authorThumbnails[0]?.url}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <span className="text-stone-800 font-semibold">
                            {comment?.author}
                          </span>
                          <div
                            className="text-stone-600"
                            dangerouslySetInnerHTML={{
                              __html: comment?.content.replaceAll(
                                /\n/g,
                                "<br />"
                              ),
                            }}
                          />
                          {comment?.likeCount ? (
                            <div className="gap-2 inline-flex mt-1">
                              <span className="text-stone-600 inline-flex items-center gap-1">
                                {commaNumber(comment?.likeCount)}{" "}
                                <HandThumbUpIcon className="h-4 w-4" />
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/4 select-none">
            <div className="flex flex-col items-center">
              {/* Chapters */}
              {pipedData?.chapters.length > 0 ? (
                <div className="flex flex-col gap-3 w-full">
                  <span className="text-xl font-bold text-stone-800">
                    Chapters
                  </span>
                  <div className="flex items-start flex-col w-full h-96 overflow-y-scroll scrollbar pr-2 bg-stone-100 p-3 rounded-lg">
                    {pipedData?.chapters.map((chapter: any) => (
                      <div
                        className="flex flex-row gap-3 break-words cursor-pointer rounded-lg transition duration-200 hover:bg-stone-200 active:bg-stone-300 px-2 py-2 w-full"
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
              {/* Video Recommendations */}
              {watchData?.recommendedVideos?.length > 0 ? (
                <div
                  className={`flex flex-col gap-3 w-full ${
                    pipedData?.chapters.length > 0 ? "mt-6" : ""
                  }`}
                >
                  <div className="flex items-start flex-col w-full h-96 pr-2">
                    {watchData?.recommendedVideos?.map((video: any) => (
                      <div
                        className="flex flex-row gap-3 break-words cursor-pointer rounded-lg transition duration-200 hover:bg-stone-200 active:bg-stone-300 px-2 py-2 w-full"
                        onClick={() =>
                          (location.href = `/watch?v=${video?.videoId}`)
                        }
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
                        <div className="flex items-center">
                          <span className="font-bold text-stone-800 text-sm">
                            {video?.title}
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
