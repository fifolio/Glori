import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Home } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
