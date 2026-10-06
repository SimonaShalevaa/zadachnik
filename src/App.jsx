import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import UploadPage from "./pages/UploadPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  useEffect(() => {
    function checkHash() {
      document.getElementById("nav-toggle").checked = false;

      const id = window.location.hash.slice(1);
      if (id && !document.getElementById(id)) {
        window.location.hash = "not-found";
      }
    }

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <div>
      <Header />
      <main className="container main">
        <HomePage />
        <TaskPage />
        <UploadPage />
        <LeaderboardPage />
        <ProfilePage />
        <BlogPage />
        <ArticlePage />
        <HowItWorksPage />
        <LoginPage />
        <RegisterPage />
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
