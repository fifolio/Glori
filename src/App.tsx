import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  PerfumeDetails,
  Collections,
  StoreDetails,
  Error,
  Policies,
  AboutDetails,
  Contact,
  CartDetails,
  SellDetails,
  SettingsDetails,
  EditDetails,
  BrowseDetails
} from "./pages";
import { Navbar, Footer } from "./components"; 

export default function App() {



  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div className="pb-10"></div>
      </div>
      <Routes>

        {/* Basic Routes */}
        <Route index element={<Home />} />
        <Route path='*' element={<Error />} />
        <Route path='policies' element={<Policies />} />
        <Route path='about' element={<AboutDetails />} />
        <Route path='contact' element={<Contact />} />
        <Route path='cart' element={<CartDetails />} />
        <Route path='sell' element={<SellDetails />} />
        <Route path='settings' element={<SettingsDetails />} />
        <Route path='collections' element={<BrowseDetails />} />
        {/* <Route path='reset' element={<Reset />} /> */}

        {/* Custom Routes */}
        <Route path='collections/:collectionID' element={<Collections />} /> 
        <Route path='perfumes/:perfumeID' element={<PerfumeDetails />} />
        <Route path="store/:id" element={<StoreDetails />} />
        <Route path='edit/:id' element={<EditDetails />} />

        {/* Redirect Routes */}
        <Route path="perfumes" element={<Navigate to="/" />} />
        <Route path="store" element={<Navigate to="/" />} />
        <Route path="edit" element={<Navigate to="/" />} />


      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
