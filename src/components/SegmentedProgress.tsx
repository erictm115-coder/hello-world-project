interface SegmentedProgressProps {
  currentStep: number;
  totalSteps: number;
}

const SegmentedProgress = ({ currentStep, totalSteps }: SegmentedProgressProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 pt-4 pb-2 bg-background">
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              index < currentStep ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SegmentedProgress;
