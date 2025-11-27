import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 -mt-8">
      <div className="w-full max-w-[600px] space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-primary">Deepkeep</h1>
        </div>

        {/* Main Headline */}
        <div className="flex justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground">
            Replace doomscrolling with microlearning
          </h2>
        </div>

        {/* Illustration with Speech Bubble */}
        <div className="relative mb-2">
          {/* Speech Bubble */}
          <div className="flex justify-start mb-1">
            <div className="bg-card p-4 rounded-2xl shadow-lg max-w-[200px]">
              <p className="text-sm font-medium">Me at 2AM: I'm tired... of doomscrolling</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden bg-secondary/50 p-6 flex items-center justify-center min-h-[300px]">
            <p className="text-muted-foreground text-center">
              📱 Person in bed looking tired while holding phone
              <br /><span className="text-xs">(Image placeholder - add tired-illustration-final.png to src/assets/)</span>
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full h-12 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          size="lg"
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