import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import deepkeepLogo from "@/assets/deepkeep-logo.png";
import headlineImage from "@/assets/headline-image.png";
import speechBubble from "@/assets/speech-bubble.png";
import tiredIllustration from "@/assets/tired-illustration-final.png";
import growthComparison from "@/assets/growth-comparison.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 -mt-8">
      <div className="w-full max-w-[600px] space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img src={deepkeepLogo} alt="deepkeep" className="h-12 w-auto" />
        </div>

        {/* Main Headline */}
        <div className="flex justify-center">
          <img
            src={headlineImage}
            alt="Replace doomscrolling with microlearning"
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        {/* Illustration with Speech Bubble */}
        <div className="relative mb-2">
          {/* Speech Bubble */}
          <div className="flex justify-start mb-1">
            <img
              src={speechBubble}
              alt="Me at 2AM: I'm tired... of doomscrolling"
              className="w-full max-w-[200px] h-auto"
            />
          </div>

          <div className="rounded-2xl overflow-hidden bg-secondary/50 p-6">
            <img
              src={tiredIllustration}
              alt="Person in bed looking tired while holding phone"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Outsmart Doomscrolling Section */}
        <div className="text-center space-y-4 mt-8">
          <h2 className="text-3xl font-bold text-foreground animate-fade-in">
            Outsmart doomscrolling:
          </h2>
          <p className="text-2xl font-bold text-primary animate-fade-in" style={{ animationDelay: '0.1s' }}>
            It doesn't stand a chance
          </p>
          <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Become part of the community that escaped doomscrolling. Grow daily and achieve your goals with us.
          </p>
        </div>

        {/* Growth Comparison Chart */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <img
            src={growthComparison}
            alt="Growth comparison chart"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full h-12 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
          size="lg"
          style={{ animationDelay: '0.4s' }}
        >
          <Link to="/growth-plan">Continue</Link>
        </Button>

        {/* Footer Links */}
        <div className="text-center text-xs text-muted-foreground mt-2">
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
          {" • "}
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Index;