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
              <Route path="/" element={<Index />} />
              <Route path="/growth-plan" element={<ProtectedRoute><AppLayout><GrowthPlan /></AppLayout></ProtectedRoute>} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
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
