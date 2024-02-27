import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllPerfumes from "./pages/AllPerfumes";
import AllCleaning from "./pages/AllCleaning";
import AllProducts from "./pages/AllProducts";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProfile from "./pages/admin/AdminProfile";
import EditAdmin from "./pages/admin/EditAdmin";
import NewCleaningProduct from "./pages/admin/NewCleaningProduct";
import NewPerfume from "./pages/admin/NewPerfume";
import useScrollToTop from "./components/UseScrollToTop";
import SinglePerfume from "./components/SinglePerfume";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import Cart from "../src/pages/Cart";

function App() {
  useScrollToTop();
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };

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
          <Route path="/allperfumes" element={<AllPerfumes />} />
          <Route path="/perfume/:perfumeId" element={<SinglePerfume />} />
          <Route path="/allcleaning" element={<AllCleaning />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/editadmin" element={<EditAdmin />} />
          <Route path="/newcleaningproduct" element={<NewCleaningProduct />} />
          <Route path="/newperfume" element={<NewPerfume />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
      <Fab
        aria-label="view cart"
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
          backgroundColor: "#f05b3f",
          color: "white",
          "&:hover": {
            backgroundColor: "#8c3027",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          },
        }}
        onClick={goToCart}
      >
        <ShoppingCartIcon />
      </Fab>
      <Footer />
    </div>
  );
}

export default App;
