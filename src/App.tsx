
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import KnowledgePage from "./pages/KnowledgePage";
import BookmarksPage from "./pages/BookmarksPage";
import AccountPage from "./pages/AccountPage";
import FindLawyerPage from "./pages/FindLawyerPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./pages/NotFound";

// This would come from your authentication system
// For now, we'll mock it
const isAuthenticated = true;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page is always shown at the root, regardless of auth state */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          
          {/* Disclaimer page after login */}
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          
          {/* App routes - protected in a real app */}
          <Route path="/app" element={<AppLayout />}>
            {/* Redirect root /app directly to chat */}
            <Route index element={<Navigate to="/app/chat" replace />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="knowledge" element={<KnowledgePage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="find-lawyer" element={<FindLawyerPage />} />
          </Route>
          
          {/* Add a redirect from /chat to /app/chat for direct access */}
          <Route path="/chat" element={<Navigate to="/app/chat" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
