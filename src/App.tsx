import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, PerfumeDetails, Collections, StoreDetails, Error, Policies, AboutDetails, Contact, CartDetails, SellDetails, SettingsDetails } from "./pages";
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
        <Route path='policies' element={<Policies />} />
        <Route path='about' element={<AboutDetails />} />
        <Route path='contact' element={<Contact />} />
        <Route path='cart' element={<CartDetails />} />
        <Route path='sell' element={<SellDetails />} />
        <Route path='*' element={<Error />} />
        <Route path="store/:id" element={<StoreDetails />} />
        <Route path='settings' element={<SettingsDetails />} />

        {/* Routes NOT ready ... */}
        {/* <Route path='perfumes' element={<Search />} /> */}
        {/* <Route path='reset' element={<Reset />} /> */}``
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
