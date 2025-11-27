import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GrowthPlan = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  
  const totalSteps = 10; // Simplified version
  const progress = (step / totalSteps) * 100;

  const handleAnswer = (questionKey: string, value: any) => {
    setAnswers({ ...answers, [questionKey]: value });
    setTimeout(() => setStep(step + 1), 300);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              The effects of doomscrolling can vary by age. What age group are you in?
            </h2>
            <div className="space-y-3">
              {["Under 18", "18-24", "25-34", "35-44", "45+"].map((age) => (
                <Button
                  key={age}
                  onClick={() => handleAnswer("age", age)}
                  variant="outline"
                  className="w-full h-12 text-base"
                >
                  {age}
                </Button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-full max-w-[350px] h-[250px] bg-secondary/50 rounded-2xl flex items-center justify-center">
                  <p className="text-muted-foreground">Welcome illustration placeholder</p>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Welcome!</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                We're here to support your self-growth journey. Let's proceed to learn more about you!
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 3:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Do you focus on the big picture or prefer the finer details?
            </h2>
            <div className="space-y-3">
              <Button
                onClick={() => handleAnswer("thinking", "visionary")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                🌅 Visionary Thinker
              </Button>
              <Button
                onClick={() => handleAnswer("thinking", "detail")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                🧩 Detail-focused
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              How do you learn from mistakes?
            </h2>
            <div className="space-y-3">
              <Button
                onClick={() => handleAnswer("mistakes", "reflect")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                I reflect and adapt
              </Button>
              <Button
                onClick={() => handleAnswer("mistakes", "move")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                I move on quickly
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              What's your communication style?
            </h2>
            <div className="space-y-3">
              <Button
                onClick={() => handleAnswer("communication", "direct")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                Direct and honest
              </Button>
              <Button
                onClick={() => handleAnswer("communication", "diplomatic")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                Diplomatic and careful
              </Button>
            </div>
          </div>
        );

      case 6:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Are you more introverted or extroverted?
            </h2>
            <div className="space-y-3">
              <Button
                onClick={() => handleAnswer("personality", "introvert")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                Introverted
              </Button>
              <Button
                onClick={() => handleAnswer("personality", "extrovert")}
                variant="outline"
                className="w-full h-12 text-base"
              >
                Extroverted
              </Button>
            </div>
          </div>
        );

      case 7:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-full max-w-[350px] h-[250px] bg-secondary/50 rounded-2xl flex items-center justify-center">
                  <p className="text-muted-foreground">Amazing illustration placeholder</p>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground">You're amazing!</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                Based on your answers, we're creating a personalized learning plan just for you.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 8:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              What topics interest you most?
            </h2>
            <div className="space-y-3">
              {["Personal Growth", "Business & Finance", "Health & Wellness", "Technology", "Arts & Creativity"].map((topic) => (
                <Button
                  key={topic}
                  onClick={() => handleAnswer("interests", topic)}
                  variant="outline"
                  className="w-full h-12 text-base"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              How much time can you dedicate daily?
            </h2>
            <div className="space-y-3">
              {["5-10 minutes", "10-20 minutes", "20-30 minutes", "30+ minutes"].map((time) => (
                <Button
                  key={time}
                  onClick={() => handleAnswer("time", time)}
                  variant="outline"
                  className="w-full h-12 text-base"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-full max-w-[350px] h-[250px] bg-secondary/50 rounded-2xl flex items-center justify-center">
                  <p className="text-muted-foreground">Celebration illustration placeholder</p>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground">Your plan is ready!</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                Get started with your personalized microlearning journey today.
              </p>
            </div>
            <Button onClick={() => navigate("/")} className="w-full h-12 mt-2">
              Get Started
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-[600px] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1 mx-4">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="text-sm text-muted-foreground min-w-[60px] text-right">
            {step}/{totalSteps}
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-primary">Deepkeep</h1>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Note: This is a simplified version. Full version requires image assets and LoadingPage component.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GrowthPlan;