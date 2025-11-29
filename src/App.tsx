import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Main Pages
import Index from "./pages/Index";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Create from "./pages/Create";
import BookReader from "./pages/BookReader";
import GrowthStats from "./pages/GrowthStats";
import GrowthPlan from "./pages/GrowthPlan";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import SubscriptionRequired from "./pages/SubscriptionRequired";

// App Pages
import Dashboard from "./pages/app/Dashboard";
import Profile from "./pages/app/Profile";
import Settings from "./pages/app/Settings";
import Library from "./pages/app/Library";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <OnboardingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/growth-plan" element={<GrowthPlan />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              
              {/* Protected Routes */}
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
              <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
              <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
              <Route path="/book-reader" element={<ProtectedRoute><BookReader /></ProtectedRoute>} />
              <Route path="/growth-stats" element={<ProtectedRoute><GrowthStats /></ProtectedRoute>} />
              <Route path="/subscription" element={<ProtectedRoute><SubscriptionRequired /></ProtectedRoute>} />
              
              {/* Legacy App Routes */}
              <Route path="/app/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/app/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/app/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/app/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </OnboardingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
