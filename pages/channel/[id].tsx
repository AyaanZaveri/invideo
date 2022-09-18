import axios from "axios";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import NavbarIndex from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { commaNumber } from "../../utils/commaNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Channel = () => {
  const router = useRouter();

  const baseUrl = "https://inv.riverside.rocks";
  const pipedBaseUrl = "https://pa.il.ax";

  const [channelData, setChannelData] = useState<any>();
  const [pipedData, setPipedData] = useState<any>();

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
      <Sidebar />
      <div className="pt-16">
        <div className="flex flex-col">
          <img
            className="w-full"
            src={channelData?.authorBanners[0]?.url}
            alt=""
          />
          <div className="flex flex-row justify-between p-8 items-center">
            <div className="flex flex-row items-center gap-3">
              <img
                className="w-20 rounded-full"
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
            <div className="flex flex-col gap-1">
              <span className="text-stone-800 font-medium text inline-flex items-center gap-1">
                <span className="font-bold">
                  {commaNumber(channelData?.totalViews)}
                </span>{" "}
                Total Views
              </span>
              {channelData?.joined ? (
                <span className="text-stone-800 font-medium text inline-flex items-center gap-1">
                  Joined on
                  <span className="font-bold">
                    {DateTime.fromSeconds(channelData?.joined).toFormat(
                      "MMMM dd, yyyy"
                    )}
                  </span>{" "}
                </span>
              ) : null}
              {channelData?.isFamilyFriendly ? (
                <div className="text-orange-600 inline-flex gap-2 items-center">
                  <FontAwesomeIcon icon="fa-solid fa-family" />
                  <span className="font-medium text inline-flex items-center gap-1">
                    Family Friendly
                  </span>
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
