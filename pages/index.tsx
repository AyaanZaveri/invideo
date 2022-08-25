import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { HiOutlineSearch } from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import NavbarIndex from "../components/Navbar";

const Home: NextPage = () => {

  return (
    <div className="font-['Inter']">
      <NavbarIndex />
      <Sidebar />
    </div>
  );
};

export default Home;
