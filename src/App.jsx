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
import AuthGuard from "../guards/AuthGuard";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import { SkeletonTheme } from "react-loading-skeleton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HeaderWrapper from "./components/HeaderWrapper";

const App = () => {
  return (
    <div className="bg-neutral-100">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <SkeletonTheme enableAnimation>
          <Router>
            <HeaderWrapper
              noRenderPaths={[
                "/signin",
                "/signup",
                "/forget-password",
                "/reset-password",
                "/email-verified",
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
                <Route
                  path="/solve-doubt"
                  element={<AuthGuard component={<ChatBot />} />}
                />
                <Route path="/email-verified/" element={<EmailVerified />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password/" element={<ResetPassword />} />
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
