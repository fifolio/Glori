import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { Home, PerfumeDetails, Collections, Search, Error, Policies } from "./pages";
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
        <Route path='collections/:collectionID' element={<Collections />} />
        <Route path='perfumes/:perfumeID' element={<PerfumeDetails />} />
        <Route path='perfumes' element={<Search />} />
        <Route path='policies' element={<Policies />} />
        {/* <Route path='reset' element={<Reset />} /> */}
        <Route path='*' element={<Error />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
