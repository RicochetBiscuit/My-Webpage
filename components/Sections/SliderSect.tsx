"use client";
import React from "react";
import FullScreenSlider from "../Slider/FullScreenSlider";

const SliderSect = () => {
  return (
    <div className=" justify-center h-screen w-full ">
      <div className="relative overflow-hidden w-full h-full z-0">
        <FullScreenSlider />
        <div className="static h-full w-full"></div>
      </div>
    </div>
  );
};
export default SliderSect;