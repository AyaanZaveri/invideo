import { useRouter } from "next/router";
import React from "react";

const Channel = () => {
  const router = useRouter();

  const { query } = router;
  const id = query.id;

	

  return <div>Channel</div>;
};

export default Channel;
