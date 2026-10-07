import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
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
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<CatalogPage />} />
        <Route path="tasks/:taskId" element={<TaskPage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="users/:userId" element={<ProfilePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:postId" element={<ArticlePage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
