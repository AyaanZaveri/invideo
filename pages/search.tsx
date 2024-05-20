import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavbarIndex from "../components/Navbar";

import Card from "../components/Card";

const Search = () => {
  const { query } = useRouter();
  const baseUrl = "https://invidious.lunar.icu/api/v1";
  const [searchRes, setSearchRes] = useState<any>();

  const getSearch = (q: string) => {
    try {
      if (typeof q !== "undefined" && q.length > 0) {
        axios
          .get(`${baseUrl}/search?q=${q}`)
          .then((res) => setSearchRes(res.data));
      }
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    if (query.q) {
      getSearch(query.q as string);
    }
  }, [query.q]);

  return (
    <div className="font-['Inter']">
      <NavbarIndex />

      {searchRes ? (
        <div>
          <div className="pt-16 bg-stone-50 h-full">
            <div className="rounded-lg flex flex-row flex-wrap justify-center gap-y-8 gap-x-6 py-8 px-6">
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
