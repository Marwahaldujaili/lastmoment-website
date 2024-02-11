import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Perfumes from "./pages/Perfumes";
import Cleaning from "./pages/Cleaning";
import AllProducts from "./pages/AllProducts";
import AdminLogin from "./pages/users/AdminLogin";
import AdminProfile from "./pages/users/AdminProfile";
import EditAdmin from "./pages/users/EditAdmin";

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
          <Route path="/products" element={<AllProducts />} />
          <Route path="/perfumes" element={<Perfumes />} />
          <Route path="/cleaning" element={<Cleaning />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/editadmin" element={<EditAdmin />} />
        </Routes>
      </>
      <Footer />
    </div>
  );
}

export default App;
