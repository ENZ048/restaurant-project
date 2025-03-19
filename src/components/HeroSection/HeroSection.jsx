import React from "react";
import "./herosection.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function HeroSection() {
  return (
    <div className=" min-h-[40vh] max-w-[60vw] bg-white flex mx-auto mt-20 justify-between items-center hero rounded p-2">
      <div>
        <DotLottieReact
          src="https://lottie.host/d6d7e66b-cd57-46a1-a331-87a33bc792e7/lHVUz3RQya.lottie"
          loop
          autoplay
        />
      </div>
      <div className="text-4xl">
        Craving Something Delicious? 🍕✨
        
      </div>
    </div>
  );
}
