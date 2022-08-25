import axios from 'axios';
import React, { useState } from 'react'

const Video = () => {

  const [videoData, setChannelData] = useState<any>();

  const baseUrl = "https://inv.vern.cc/";

  const getChannelData = (id: string) => {
    axios
      .get(`${baseUrl}/api/v1/channels/${id}`)
      .then((res) => setChannelData(res.data));
  };

  useEffect(() => {
    getChannelData(videoData?.authorId);
  }, []);
  return (
    <div>Video</div>
  )
}

export default Video