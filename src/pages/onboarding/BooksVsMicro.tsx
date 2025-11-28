import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SegmentedProgress from "@/components/SegmentedProgress";

const BooksVsMicro = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center px-6 pt-16 pb-32 bg-background animate-fade-in overflow-hidden">
      <SegmentedProgress currentStep={1} totalSteps={4} />
      <div className="max-w-md w-full text-center mt-6">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold">DeepKeep</h1>
        </div>

        <div className="mb-8">
          <h2 className="font-serif font-bold text-2xl mb-4">Books vs Microlearning</h2>
          <p className="text-muted-foreground">Full books versus bite-sized learning</p>
        </div>
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

export default BooksVsMicro;
