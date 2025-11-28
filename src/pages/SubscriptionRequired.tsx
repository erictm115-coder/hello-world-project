import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";

const SubscriptionRequired = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative bg-card border-2 border-primary/30 rounded-3xl p-8 space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Crown className="h-10 w-10 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif font-bold text-3xl">Subscription Required</h1>
              <p className="text-muted-foreground text-lg">Upgrade to access all features</p>
            </div>

            <Button
              onClick={() => navigate("/growth-plan")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-base font-semibold"
            >
              View Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionRequired;
