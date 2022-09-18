import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import onClickOutside from "react-onclickoutside";

const Search = () => {
  const baseUrl = "https://inv.riverside.rocks/api/v1";

  const [search, setSearch] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<any>([]);
  const [showSuggestions, setShowSuggestions] = useState<any>(false);
  const searchSuggestionsRef = useRef<any>();

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getSearchSuggestions = (query: string) => {
    axios
      .get(`${baseUrl}/search/suggestions?q=${query}`)
      .then((res) => setSearchSuggestions(res.data?.suggestions));
  };

  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    setShowSuggestions(false);
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    if (search) {
      setShowSuggestions(true);
      getSearchSuggestions(search);
    }
  }, [search]);

  console.log(searchSuggestions);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!searchSuggestionsRef?.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="bg-white/75 backdrop-blur-md relative w-full h-16 flex items-center justify-center flex-row">
          <img src="/logo.svg" className="p-4 h-16 absolute top-0 left-0" alt="" />
          <div className="relative rounded-md shadow-sm w-6/12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="text-gray-500 sm:text-sm" />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-8 pr-12 sm:text-sm border-stone-300 rounded-md transition"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div
          ref={searchSuggestionsRef}
          className={`w-6/12 ${isOpen ? "hidden" : ""}`}
        >
          {searchSuggestions?.length > 0 && showSuggestions ? (
            <div className="flex flex-col w-full py-2 gap-1 rounded-lg border border-stone-300/50 select-none bg-white/90 shadow-sm shadow-stone-100 backdrop-blur-lg overflow-hidden">
              {searchSuggestions.map((v: string) => (
                <div
                  onClick={() => {
                    setShowSuggestions(false);
                    router.push(`/search?q=${v}`);
                  }}
                >
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
