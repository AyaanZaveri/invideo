import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavbarIndex from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

const Search = () => {
  const { query } = useRouter();
  const baseUrl = "https://inv.riverside.rocks/api/v1";
  const [searchRes, setSearchRes] = useState<any>();

  const getSearch = (q: string) => {
    try {
      if (typeof q !== "undefined" && q.length > 0) {
        axios
          .get(`${baseUrl}/search?q=${q}`)
          .then((res) => setSearchRes(res.data));
      }
    } catch (error) {
        console.log("Error")
    }
  };

  useEffect(() => {
    if (query.q) {
      getSearch(query.q as string);
    }
  }, [query.q]);

  console.log(searchRes)

  return (
    <div className="font-['Inter']">
      <NavbarIndex />
      <Sidebar />
      {searchRes ? (
        <div>
          <div className="pl-52 pt-16 bg-stone-50 h-full">
            <div className="rounded-lg flex flex-row flex-wrap justify-center gap-12 py-8 px-2">
              {typeof searchRes !== "undefined" && searchRes.length > 0
                ? searchRes.map((v: any) => <Card videoResults={v} />)
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
