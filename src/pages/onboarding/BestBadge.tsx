import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SegmentedProgress from "@/components/SegmentedProgress";

const BestBadge = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center px-6 pt-16 pb-32 bg-background animate-scale-pop overflow-hidden">
      <SegmentedProgress currentStep={3} totalSteps={4} />
      <div className="max-w-md w-full text-center mt-6">
        <p className="text-2xl text-muted-foreground mb-8">Rated 4.8/5 and loved by users around the world!</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pb-12 pt-4 bg-background">
        <Button
          onClick={() => navigate("/onboarding/auth-final")}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 text-base font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BestBadge;
