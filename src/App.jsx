import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import Home from "./pages/Home";
import { FiltersContextProvider } from "./context/FiltersContext";
import Country from "./pages/Country";
import Header from "./components/Header";

setupIonicReact();

function App() {
  return (
    <>
      <Header />
      <FiltersContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/:countryName" element={<Country />} />
          </Routes>
        </BrowserRouter>
      </FiltersContextProvider>
    </>
  );
}
/* <Router path="about" element={<About />} /> */
/* </Router> */

export default App;
