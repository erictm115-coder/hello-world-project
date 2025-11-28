import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SegmentedProgress from "@/components/SegmentedProgress";

const ListenOrRead = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center px-6 pt-16 pb-32 bg-background animate-scale-pop overflow-hidden">
      <SegmentedProgress currentStep={2} totalSteps={4} />
      <div className="max-w-md w-full text-center mt-6">
        <h2 className="font-serif font-bold text-2xl">Listen or read on the go</h2>
        <p className="text-muted-foreground text-base mt-2">Become a better you</p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pb-12 pt-4 bg-background">
        <Button
          onClick={() => navigate("/growth-plan")}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 text-base font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ListenOrRead;
