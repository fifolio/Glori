import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Home } from "./pages";
import { Navbar } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
