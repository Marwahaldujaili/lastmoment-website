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
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import Cart from "../src/pages/Cart";

function App() {
  useScrollToTop();
  const navigate = useNavigate();

  // Function to navigate to the cart view
  const goToCart = () => {
    navigate("/cart"); // Assuming '/cart' is your route to view the cart
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
      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="view cart"
        style={{ position: "fixed", right: 20, bottom: 20 }}
        onClick={goToCart}
      >
        <ShoppingCartIcon />
      </Fab>
      <Footer />
    </div>
  );
}

export default App;
