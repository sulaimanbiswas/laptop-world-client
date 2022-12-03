import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/Routes/Routes";

function App() {
  return (
    <div data-theme="night" className="">
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
