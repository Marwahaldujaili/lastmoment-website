import "./App.css";
import AdminLogin from "./pages/users/AdminLogin";
import AdminRegistration from "./pages/users/AdminRegistration";

function App() {
  return (
    <div className="App">
      <AdminRegistration />
      <AdminLogin />
    </div>
  );
}

export default App;
