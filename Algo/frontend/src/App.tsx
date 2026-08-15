import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AlgorithmDetailPage } from "./pages/AlgorithmDetailPage";
import { AlgorithmsPage } from "./pages/AlgorithmsPage";
import { AlgorithmVisualizerPage } from "./pages/AlgorithmVisualizerPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { QuizPage } from "./pages/QuizPage";
import { AdminPage } from "./pages/AdminPage";
import { RoadmapPage } from "./pages/RoadmapPage";

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn" element={<AlgorithmsPage />} />
      <Route path="/topics" element={<AlgorithmsPage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/algorithms/:algorithmId" element={<AlgorithmDetailPage />} />
      <Route path="/visualize/:algorithmId" element={<AlgorithmVisualizerPage />} />
      <Route path="/practice" element={<PlaceholderPage title="Practice problems are next." description="The frontend MVP focuses on the reusable learning visualizers first. Practice sets will build on those lessons." />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/auth" element={<AuthPage mode="login" />} />
      <Route path="/auth/login" element={<AuthPage mode="login" />} />
      <Route path="/auth/register" element={<AuthPage mode="register" />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/progress" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
