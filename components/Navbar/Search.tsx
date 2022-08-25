import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const Search = () => {
  const baseUrl = "https://inv.vern.cc";

  const [search, setSearch] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<any>([]);

  const router = useRouter()

  const getSearchSuggestions = (query: string) => {
    axios
      .get(`${baseUrl}/api/v1/search/suggestions?q=${query}`)
      .then((res) => setSearchSuggestions(res.data?.suggestions));
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search?q=${search}`)
  };

  useEffect(() => {
    getSearchSuggestions(search);
  }, [search]);

  console.log(searchSuggestions);

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="bg-white w-full h-16 flex items-center justify-center flex-col">
          <div className="relative rounded-md shadow-sm shadow-slate-100 w-6/12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-gray-500 sm:text-sm" />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-8 pr-12 sm:text-sm border-slate-300 rounded-md transition"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="w-6/12">
          {searchSuggestions.length > 0 ? (
            <div className="flex flex-col w-full py-2 gap-1 rounded-lg border border-slate-300/50 select-none bg-white/75 shadow-sm shadow-slate-100 backdrop-blur-lg overflow-hidden">
              {searchSuggestions.map((v: string) => (
                <div onClick={() => router.push(`/search?q=${v}`)}>
                  <span className="block w-full text-sm hover:bg-orange-500/10 py-2 px-4 cursor-pointer transition active:bg-orange-500/20">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;
