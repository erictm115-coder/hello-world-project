import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import GrowthPlan from "./pages/GrowthPlan";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SubscriptionRequired from "./pages/SubscriptionRequired";
import BooksVsMicro from "./pages/onboarding/BooksVsMicro";
import ListenOrRead from "./pages/onboarding/ListenOrRead";
import BestBadge from "./pages/onboarding/BestBadge";
import AuthFinal from "./pages/onboarding/AuthFinal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <OnboardingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Landing & Marketing */}
              <Route path="/" element={<Index />} />
              <Route path="/growth-plan" element={<GrowthPlan />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              
              {/* Onboarding */}
              <Route path="/onboarding/books-vs-micro" element={<BooksVsMicro />} />
              <Route path="/onboarding/listen-or-read" element={<ListenOrRead />} />
              <Route path="/onboarding/best-badge" element={<BestBadge />} />
              <Route path="/onboarding/auth-final" element={<AuthFinal />} />
              
              {/* Protected App Routes - placeholder for now */}
              <Route path="/app/home" element={<ProtectedRoute><AppLayout><div className="p-8">Home Page - Coming Soon</div></AppLayout></ProtectedRoute>} />
              
              <Route path="/subscription-required" element={<SubscriptionRequired />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </OnboardingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
