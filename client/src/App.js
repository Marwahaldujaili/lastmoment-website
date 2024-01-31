import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Perfumes from "./pages/Perfumes";
import Cleaning from "./pages/Cleaning";
function App() {
  return (
    <div className="App">
      <Header />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products">
            <Route path="perfumes" element={<Perfumes />} />
            <Route path="cleaning" element={<Cleaning />} />
          </Route>
        </Routes>
      </>
      <Footer />
    </div>
  );
}

export default App;
