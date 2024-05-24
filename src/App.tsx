import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error } from "./pages";
import { Navbar, Footer } from "./components";

import Products from './pages/Products' 
export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="pb-10"></div>
      </div>
      <Routes>
        <Route index element={<Products />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
