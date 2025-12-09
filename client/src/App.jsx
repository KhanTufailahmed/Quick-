import { RouterProvider } from "react-router-dom"
import AppRouter from "./routes/routes"
import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"

function App() {
  const {getToken}=useAuth()
  useEffect( ()=>{

    // const token=await getToken()
    // console.log(token)
    getToken().then((token)=>{
      console.log(token)
    })
  })
  return (
    <>
    <RouterProvider router={AppRouter}></RouterProvider>
    </>
  )
}

export default App
