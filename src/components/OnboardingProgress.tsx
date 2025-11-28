import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const OnboardingProgress = ({ currentStep, totalSteps = 10 }: OnboardingProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-4 pb-2 bg-background">
      <Progress value={progress} className="h-1" />
    </div>
  );
};

export default OnboardingProgress;
