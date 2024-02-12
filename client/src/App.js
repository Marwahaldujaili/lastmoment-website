import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Perfumes from "./pages/Perfumes";
import AllCleaning from "./pages/AllCleaning";
import AllProducts from "./pages/AllProducts";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProfile from "./pages/admin/AdminProfile";
import EditAdmin from "./pages/admin/EditAdmin";
import NewCleaningProduct from "./pages/admin/NewCleaningProduct";

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
          <Route path="/allcleaning" element={<AllCleaning />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/editadmin" element={<EditAdmin />} />
          <Route path="/newcleaningproduct" element={<NewCleaningProduct />} />
        </Routes>
      </>
      <Footer />
    </div>
  );
}

export default App;
