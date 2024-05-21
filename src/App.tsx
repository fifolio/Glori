import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Home } from "./pages";
import { Navbar, Footer } from "./components";

export default function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar />
      <div className="pb-10"></div>
    </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
