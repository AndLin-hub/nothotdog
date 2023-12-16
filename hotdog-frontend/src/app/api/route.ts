import axios from "axios"
import { collectGenerateParams } from "next/dist/build/utils"

export async function POST(request:Request){
  const res = await axios.post(process.env.url, request,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  console.log(res)
  return new Response(JSON.stringify({hello: "cool karina"}))
}

export async function GET(request: Request){
  console.log("hello")
    return new Response(JSON.stringify({Hello:"Hello world"}))
}