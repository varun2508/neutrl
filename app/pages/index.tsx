import React, { useEffect } from "react";
import qs from "querystring";
import axios from "axios";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

interface IndexProps {
  test: any;
}

const Index: React.FC<IndexProps> = ({ test }) => {
  const router = useRouter();
  if (typeof window !== "undefined" && window.location) {
    const query = router.query;
    axios
      .post("/api/auth", {
        query: query,
      })
      .then((response) => {
        if (response.data.redirectTo) {
          if (window.parent) {
            window.parent.location.href = response.data.redirectTo;
          } else {
            window.location.href = response.data.redirectTo;
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.error(error);
      });
  }
  // page context params
  useEffect(() => {
    if (typeof window !== "undefined" && window.location) {
    }
  }, []);

  return <>Loading...</>;
};

export default Index;
