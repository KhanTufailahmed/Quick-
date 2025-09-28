import { RouterProvider } from "react-router-dom"
import AppRouter from "./routes/routes"

function App() {

  return (
    <>
    <RouterProvider router={AppRouter}></RouterProvider>
    </>
  )
}

export default App
