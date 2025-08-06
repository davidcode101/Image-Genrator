import React from "react";
import { assets } from "../assets/assets/assets";

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center my-20 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create ai Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination in visuals</p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80-xl:w-96 rounded-lg"
        />
        <div>
            <h1 className='text-3xl font-medium mx-w-lg mb-4'>Introducing the AI-Powerd Text To IMAge Genrator</h1>
          <p className="text-gray-600 mb-4">
            InkWave is a powerful AI image generation platform that transforms
            your imagination into vivid visuals using simple text prompts.
            Whether you're an artist, designer, or casual creator, InkWave lets
            you generate stunning, high-quality images in seconds. With features
            like customizable styles, a public gallery, and light-to-dark theme
            support, it's designed for both inspiration and expression.
            Discover, create, and share your unique visions effortlessly with
            InkWave — where your words become waves of visual magic. 🎨✨
          </p>
          <p>
            <strong>Key Features:</strong>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              <li>AI-powered image generation</li>
              <li>Customizable styles and themes</li>
              <li>Public gallery for inspiration</li>
              <li>Fast and user-friendly interface</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
