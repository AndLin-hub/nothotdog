import axios from "axios"

export async function POST(request:Request){
  const log = await request.formData()
  const res = await axios.post(process.env.url!, log,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => {
    return response.data.prediction
  })
  .catch((error) => {
    console.log(error.response)
  })
  return new Response(res)
}

export async function GET(request: Request){
  const res = await axios.get(process.env.url!)
  .then((response) => {
    return response.data
  })

  return new Response(res)
}