import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import deepkeepLogo from "@/assets/deepkeep-logo.png";

interface LoadingPageProps {
  onComplete: () => void;
}

const reviews = [
  {
    text: "I love how they can summarize the books into different topic ideas. That combined with the quotes I can read and point system. I love learning already, and this app makes it's addictive.",
    author: "christopher bowne"
  },
  {
    text: "I love this app for learning and exploring ideas in short bursts. It's the perfect replacement for scrolling social media. I feel much better spending my down time scrolling this app then most others. Definitely worth the subscription",
    author: "whatwhatandp2"
  },
  {
    text: "I love to read and learn but never have enough time. This app has really been enjoyable for times when I have a short break and I can check out content that will teach me something new or lead me to discover a new great book. I look forward to my daily 'keeping!'",
    author: "bro.mike"
  }
];

const LoadingPage = ({ onComplete }: LoadingPageProps) => {
  const [step, setStep] = useState(1);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    // First progress bar - slower animation
    if (step === 1) {
      const interval = setInterval(() => {
        setProgress1((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep(2);
              setCurrentReviewIndex(1);
            }, 300);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    // Second progress bar - slower animation
    if (step === 2) {
      const interval = setInterval(() => {
        setProgress2((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep(3);
              setCurrentReviewIndex(2);
            }, 300);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    // Third progress bar - slower animation
    if (step === 3) {
      const interval = setInterval(() => {
        setProgress3((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(4), 300);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="space-y-8 text-center pt-8">
        <div className="flex justify-center mb-6">
          <img src={deepkeepLogo} alt="DeepKeep" className="h-12 w-auto" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground leading-tight">
            We are crafting your
          </h2>
          <h2 className="text-2xl font-bold leading-tight" style={{ color: '#2dbe89' }}>
            personalized growth plan...
          </h2>
        </div>

        <div className="space-y-3 mt-8">
          {/* First progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-foreground text-left">
                {progress1 >= 100 ? "Goal Set ✓" : "Defining your goals"}
              </p>
              <p className="text-sm font-semibold text-foreground">{Math.round(progress1)}%</p>
            </div>
            <Progress value={progress1} className="h-2" />
          </div>

          {/* Second progress */}
          {step >= 2 && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-foreground text-left">
                  {progress2 >= 100 ? "Growth areas tailored ✓" : "Tailoring growth areas"}
                </p>
                <p className="text-sm font-semibold text-foreground">{Math.round(progress2)}%</p>
              </div>
              <Progress value={progress2} className="h-2" />
            </div>
          )}

          {/* Third progress */}
          {step >= 3 && (
            <div className="space-y-2 animate-fade-in">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-foreground text-left">
                  {progress3 >= 100 ? "Resources selected ✓" : "Selecting growth resources"}
                </p>
                <p className="text-sm font-semibold text-foreground">{Math.round(progress3)}%</p>
              </div>
              <Progress value={progress3} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Reviews section at bottom - only show when not complete */}
      {step < 4 && (
        <div className="mt-auto space-y-4 pb-8 pt-12">
          <p className="text-center text-lg font-bold text-foreground">
            Loved by over 10M people worldwide
          </p>

          <div className="overflow-hidden relative">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
            >
              <div className="flex">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-0"
                    style={{ minWidth: '100%' }}
                  >
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground/60">
                          {review.author}
                        </p>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Continue button - only show when complete */}
      {step === 4 && (
        <div className="mt-24">
          <Button onClick={onComplete} className="w-full h-12 animate-fade-in">
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoadingPage;