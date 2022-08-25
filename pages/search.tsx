import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavbarIndex from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

const Search = () => {
  const { query } = useRouter();
  const baseUrl = "https://inv.vern.cc";
  const [searchRes, setSearchRes] = useState<any>();

  const getSearch = (q: string) => {
    if (typeof q !== "undefined" && q.length > 0)
      axios
        .get(`${baseUrl}/api/v1/search?q=${q}`)
        .then((res) => setSearchRes(res.data));
  };

  useEffect(() => {
    getSearch(query.q as string);
  }, [query]);

  console.log(query.q);
  console.log(searchRes);

  return (
    <div className="font-['Inter']">
      <NavbarIndex />
      <Sidebar />
      <div className="pl-52 pt-16 bg-stone-50 h-full">
        <div className="rounded-lg flex flex-row flex-wrap justify-center p-5 gap-8">
          {typeof searchRes !== "undefined" && searchRes.length > 0
            ? searchRes.map((v: any) => <Card videoData={v} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
