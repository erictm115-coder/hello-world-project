import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Mail, Eye, EyeOff } from "lucide-react";
import SegmentedProgress from "@/components/SegmentedProgress";

const AuthFinal = () => {
  const navigate = useNavigate();
  const { updateAuth, completeOnboarding } = useOnboarding();
  const { signUp, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<null | 'signin' | 'signup'>(null);

  const handleComplete = (isSignIn: boolean = false) => {
    updateAuth(true);
    completeOnboarding();
    navigate("/app/home");
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      if (authMode === 'signup') {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error(error.message || "Failed to sign up");
          return;
        }
        toast.success("Welcome to DeepKeep! 🎉");
        await handleComplete(false);
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message || "Failed to sign in");
          return;
        }
        toast.success("Welcome back!");
        await handleComplete(true);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!authMode) {
    return (
      <div className="h-screen flex flex-col items-center px-6 pt-16 pb-32 bg-background">
        <SegmentedProgress currentStep={4} totalSteps={4} />
        <div className="max-w-md w-full text-center flex-1 flex flex-col justify-center">
          <h1 className="font-serif font-bold text-3xl mb-2">Welcome to DeepKeep</h1>
          <p className="text-muted-foreground mb-8">Choose how to continue</p>
          
          <div className="space-y-4">
            <Button
              onClick={() => setAuthMode('signup')}
              className="w-full bg-primary hover:bg-primary/90 rounded-full h-12"
            >
              <Mail className="mr-2 h-5 w-5" />
              Sign up with Email
            </Button>

            <Button
              variant="outline"
              onClick={() => setAuthMode('signin')}
              className="w-full rounded-full h-12"
            >
              Already have an account? Sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center px-6 pt-16 pb-32 bg-background">
      <SegmentedProgress currentStep={4} totalSteps={4} />
      <div className="max-w-md w-full flex-1 flex flex-col justify-center">
        <h1 className="font-serif font-bold text-3xl mb-8 text-center">
          {authMode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 rounded-full h-12"
          >
            {loading ? "Loading..." : authMode === 'signup' ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button
            variant="ghost"
            onClick={() => setAuthMode(null)}
            className="w-full"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthFinal;
