"use client"
import axios from 'axios';
import React from "react"


const fileTypes = ["JPG", "PNG", "GIF"];

export default function Home() {


  return (
    <div className="flex items-center flex-col h-[100vh] bg-sky-300">
      <h1 className="font-sans text-[4vw] text-white rounded-xl mt-[2vh] p-[1vw]">
        not hotdog
      </h1>
      <p className="font-sans text-[1.3vw] text-white mt-[0.2vh] mb-[2vh]">
        Image classification AI used to determine if a image is a hotdog or not hotdog
      </p>
      <label className="bg-white text-sky-300 p-[0.2vw] rounded-xl hover:text-sky-500">
        Upload image
        <input type="file" className="hidden" >
        </input>
      </label>
      
    </div>
  )
}
