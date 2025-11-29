import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionRequired = () => {
  const navigate = useNavigate();

  const features = [
    "Unlimited book access",
    "Personalized recommendations",
    "Advanced progress tracking",
    "Offline reading mode",
    "Ad-free experience",
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10">
              <Crown className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-serif text-4xl font-bold">Upgrade to Pro</h1>
            <p className="text-muted-foreground text-lg">
              Unlock unlimited access to all features
            </p>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center pb-6 border-b border-border">
                <div className="text-5xl font-bold mb-2">$9.99</div>
                <div className="text-muted-foreground">per month</div>
              </div>

              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full" size="lg">
                Upgrade Now
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/home")}
              >
                Maybe Later
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default SubscriptionRequired;
