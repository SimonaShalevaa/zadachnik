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
import UiStatesPage from "./pages/UiStatesPage";
import NotFoundPage from "./pages/NotFoundPage";
import useHashNavigation from "./hooks/useHashNavigation";

function App() {
  useHashNavigation();

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
        <UiStatesPage />
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
