import "./App.css";
import AdminLogin from "./pages/users/AdminLogin";
import AdminProfile from "./pages/users/AdminProfile";
import AdminRegistration from "./pages/users/AdminRegistration";

function App() {
  return (
    <div className="App">
      <AdminRegistration />
      <AdminLogin />
      <AdminProfile />
    </div>
  );
}

export default App;
