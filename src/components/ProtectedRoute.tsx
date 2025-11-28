import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import SubscriptionRequired from "@/pages/SubscriptionRequired";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { hasActiveSubscription, loading: subLoading } = useSubscription();

  // Show skeleton loading state while checking auth and subscription
  if (authLoading || subLoading) {
    return (
      <div className="h-screen bg-background">
        <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
          <Skeleton className="h-16 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-48 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  // Redirect to onboarding if no user
  if (!user) {
    return <Navigate to="/onboarding/books-vs-micro" replace />;
  }

  // Show subscription required screen if no active subscription
  if (!hasActiveSubscription) {
    return <SubscriptionRequired />;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
