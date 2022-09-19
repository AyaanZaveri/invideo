import axios from "axios";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import NavbarIndex from "../../components/Navbar";
import { commaNumber } from "../../utils/commaNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../../components/Card";

const Channel = () => {
  const router = useRouter();

  const baseUrl = typeof window !== "undefined"
      ? localStorage?.getItem("invidiousInstance")
      : null;
  const pipedBaseUrl = "https://pa.il.ax";

  const [channelData, setChannelData] = useState<any>();
  const [pipedData, setPipedData] = useState<any>();
  const [showMore, setShowMore] = useState<boolean>(false);

  const { query } = router;
  const id = query.id;

  const getChannelData = () => {
    axios
      .get(`${baseUrl}/api/v1/channels/${id}`)
      .then((res) => setChannelData(res.data));
  };

  const getPiped = () => {
    axios
      .get(`${pipedBaseUrl}/channel/${id}`)
      .then((res) => setPipedData(res.data));
  };

  useEffect(() => {
    getChannelData();
    getPiped();
  }, [id]);

  return (
    <div className="font-['Inter']">
      <NavbarIndex />

      <div className="pt-16">
        <div className="flex flex-col">
          <img
            className="w-full select-none"
            draggable="false"
            src={channelData?.authorBanners[0]?.url}
            alt=""
          />
          <div className="flex flex-row justify-between p-8 items-start">
            <div className="flex flex-col w-9/12 items-start gap-3">
              <div className="flex flex-row gap-3 items-center">
                <img
                  className="w-20 rounded-full select-none"
                  draggable="false"
                  src={
                    channelData?.authorThumbnails[
                      channelData?.authorThumbnails.length - 1
                    ]?.url
                  }
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="font-bold text-stone-800 inline-flex items-center gap-1 text-2xl">
                    {channelData?.author}
                    {pipedData?.verified ? (
                      <HiCheckCircle className="h-5 w-5" />
                    ) : null}
                  </span>
                  <span className="text-orange-600 font-medium text inline-flex items-center gap-1">
                    <span className="font-bold">
                      {commaNumber(channelData?.subCount)}
                    </span>{" "}
                    Subscribers
                  </span>
                </div>
              </div>
              {showMore ? (
                <div>
                  <div
                    className="mt-3 text-stone-800"
                    dangerouslySetInnerHTML={{
                      __html: channelData?.descriptionHtml.replaceAll(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  />
                  <button
                    onClick={() => setShowMore(false)}
                    className="text-orange-800 hover:text-orange-600 transition-colors duration-200 text-sm"
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    className="mt-3 text-stone-800 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: channelData?.descriptionHtml.replaceAll(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  />
                  <button
                    onClick={() => setShowMore(true)}
                    className="text-orange-800 hover:text-orange-600 transition-colors duration-200 text-sm"
                  >
                    Show More
                  </button>
                </div>
              )}
              <div className="mt-3">
                <span className="text-2xl font-bold text-stone-800">
                  Latest Videos
                </span>
                <div className="mt-3 flex flex-row flex-wrap gap-y-8 gap-x-6">
                  {channelData?.latestVideos?.map((video: any) => (
                    <Card videoResults={video} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-3/12 items-end">
              <span className="text-stone-800 font-medium inline-flex items-center gap-1">
                <span className="font-bold">
                  {commaNumber(channelData?.totalViews)}
                </span>{" "}
                Total Views
              </span>
              {channelData?.joined ? (
                <span className="text-stone-800 font-medium inline-flex items-center gap-1">
                  Joined on
                  <span className="font-bold">
                    {DateTime.fromSeconds(channelData?.joined).toFormat(
                      "MMMM dd, yyyy"
                    )}
                  </span>{" "}
                </span>
              ) : null}
              {channelData?.isFamilyFriendly ? (
                <div className="text-orange-600 font-medium inline-flex items-center gap-1">
                  <span className="font-bold">Family Friendly</span>
                  Content
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
