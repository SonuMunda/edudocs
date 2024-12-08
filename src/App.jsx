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
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import ChatBot from "./pages/ChatBot";
import DocumentSearch from "./pages/DocumentSearch";
import Books from "./pages/Books";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/:username/:userId/document/:filename/:fileId/view"
            element={<DocumentView />}
          />
          <Route path="/document-search" element={<DocumentSearch />} />
          <Route path="/books" element={<Books />} />
          <Route path="/solve-doubt" element={<ChatBot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
