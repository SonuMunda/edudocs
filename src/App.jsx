import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Uploads from "./pages/Uploads";
import Footer from "./components/Footer";
import DocumentView from "./pages/DocumentView";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/document/view" element={<DocumentView />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;
