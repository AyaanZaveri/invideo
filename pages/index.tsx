import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { HiOutlineSearch } from "react-icons/hi";

import NavbarIndex from "../components/Navbar";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const baseUrl = "https://inv.riverside.rocks/api/v1";
  const [trending, setTrending] = useState<any>();
  const [popular, setPopular] = useState<any>();

  const getTrending = () => {
    try {
      axios.get(`${baseUrl}/trending`).then((res) => setTrending(res.data));
    } catch (error) {
      console.log("Error");
    }
  };

  const getPopular = () => {
    try {
      axios.get(`${baseUrl}/popular`).then((res) => setPopular(res.data));
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    getTrending();
    getPopular();
  }, []);

  return (
    <div className="font-['Inter']">
      <NavbarIndex />

      {popular ? (
        <div className="pt-16 bg-stone-50 h-full">
          <div className="rounded-lg flex flex-row flex-wrap justify-center gap-y-8 gap-x-12 py-8 px-2">
            {typeof popular !== "undefined" && popular.length > 0
              ? popular?.map((v: any) => <Card videoResults={v} />)
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
