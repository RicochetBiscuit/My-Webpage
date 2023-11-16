"use client";
import React from "react";
import { Hourglass } from "react-loader-spinner";

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#gra-blue", "#gra-black"]}
      />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;