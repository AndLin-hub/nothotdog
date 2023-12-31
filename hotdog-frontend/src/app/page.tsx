"use client"
import axios from 'axios';
import React from "react"
import {useState,useEffect} from 'react'

export default function Home() {
  const [file,setFile] = useState<File|null>(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [predictions, setPrediction] = useState<number|null>(null);
  const [loading, setLoading] = useState<boolean|null>(null)
  const send = async (formData:FormData) => await axios.post("/api", formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  ).then((response) => {
  setPrediction(Math.round(response.data*100))})

  const handleChange = async (event:Event |any) =>{
    setFile(event.target!.files[0])
    const formData = new FormData()
    formData.append("file", event.target!.files[0])
    setLoading(true)
    await send(formData)
    setLoading(false)
  }

  useEffect(() => {
    let fileReader:FileReader|any, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e:Event |any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file]);

  return (

    <div className="flex items-center flex-col h-screen overflow-auto">
      <h1 className="font-sans text-[4vw] text-violet-500 rounded-xl mt-[2vh] p-[1vw]">
        not hotdog
      </h1>
      <p className="font-sans text-[1vw] text-black mt-[0.2vh] mb-[2vh] flex items-center">
        Image classification AI used to determine if a image is an hotdog or not hotdog. Currently not working as vercel blocks long api calls.
      </p>
      <label className=" text-black p-[0.2vw] rounded-xl hover:text-sky-500 mb-[2vh]" >
        Upload image
        <input type="file" className="hidden"  accept="image/*" onChange={handleChange}>
        </input>
      </label>
      {fileDataURL ?
        <p className="h-[10vh] w-[15vw] flex items-center flex-col">
          {
            <img src={fileDataURL} alt="preview" />
          }
        </p> : null}
      
      {file ? 
      <div>
      { loading && <div className="relative mt-[20vh]  text-sky-500 rounded-xl p-[0.2vw]">
        Loading
      </div>}
      {!loading && <div className="relative mt-[20vh]  text-sky-500 rounded-xl p-[0.2vw]">
      {predictions}% of being a hotdog
      </div>}
      </div>
      : null}
    </div>  

  )
}