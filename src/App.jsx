import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signin from "./auth/Signin";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Uploads from "./pages/Uploads";
import Footer from "./components/Footer";
import DocumentView from "./pages/DocumentView";
import NotFound from "./pages/NotFound";
import ChatBot from "./pages/ChatBot";
import DocumentSearch from "./pages/DocumentSearch";
import Books from "./pages/Books";
import { ToastContainer } from "react-toastify";
import EmailVerified from "./pages/EmailVerified";
import AuthGuard from "./guards/AuthGuard";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import { SkeletonTheme } from "react-loading-skeleton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HeaderWrapper from "./components/HeaderWrapper";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FetchUserId from "./utils/FetchUserId";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Leaderboard from "./pages/Leaderboard";
import Tools from "./pages/Tools";
import DocxToPdf from "./pages/DocxToPdf";
import PdfToDocx from "./pages/PdfToDocx";
import BookView from "./pages/BookView";

const App = () => {
  const userId = FetchUserId();

  useEffect(() => {
    if (userId) {
      const socket = io(`${import.meta.env.VITE_SERVER_URL}`, {
        query: { userId: userId },
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userId]);

  return (
    <div className="bg-gray-100">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SkeletonTheme enableAnimation>
          <Router
            basename="/"
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true,
            }}
          >
            <HeaderWrapper
              noRenderPaths={[
                "/signin",
                "/signup",
                "/solve-doubt",
                "/forget-password",
                "/reset-password",
                "/email-verified",
                "/privacy-policies",
              ]}
            >
              <Header />
            </HeaderWrapper>

            <ToastContainer />
            <main className="app-body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route
                  path="/uploads"
                  element={<AuthGuard component={<Uploads />} />}
                />
                <Route
                  path="/settings"
                  element={<AuthGuard component={<Settings />} />}
                />
                <Route
                  path="/:username/:userId/document/:filename/:fileId/view"
                  element={<DocumentView />}
                />
                <Route path="/document-search" element={<DocumentSearch />} />
                <Route path="/books" element={<Books />} />
                <Route path="/book/view/:bookId" element={<BookView />} />
                <Route path="/solve-doubt" element={<ChatBot />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/docx-to-pdf" element={<DocxToPdf />} />
                <Route path="/pdf-to-docx" element={<PdfToDocx />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/email-verified/" element={<EmailVerified />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password/" element={<ResetPassword />} />
                <Route path="/privacy-policies" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </SkeletonTheme>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
