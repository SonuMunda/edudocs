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
import ChatBot from "./pages/ChatBot";
import DocumentSearch from "./pages/DocumentSearch";
import Books from "./pages/Books";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDocuments } from "./store/slices/documentSlice";
import { ToastContainer } from "react-toastify";
import EmailVerified from "./pages/EmailVerified";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <div className="bg-blue-100">
      <Router>
        <Header />
        <ToastContainer />
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
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
