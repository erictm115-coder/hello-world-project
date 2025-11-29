import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import deepkeepLogo from "@/assets/deepkeep-logo.png";
import welcomeIllustration from "@/assets/welcome-illustration.png";
import bigPictureIllustration from "@/assets/big-picture-illustration.png";
import mistakesIllustration from "@/assets/mistakes-illustration.png";
import decisivenessIllustration from "@/assets/decisiveness-illustration.png";
import honestIllustration from "@/assets/honest-illustration.png";
import extrovertIllustration from "@/assets/extrovert-illustration.png";
import motivatorIllustration from "@/assets/motivator-illustration.png";
import tiredIllustration from "@/assets/tired-illustration-final.png";
import amazingIllustration from "@/assets/amazing-illustration.png";
import amazingCloudsIllustration from "@/assets/amazing-clouds-illustration.png";
import speechBubble from "@/assets/speech-bubble.png";
import headlineImage from "@/assets/headline-image.png";
import atomicHabitsBook from "@/assets/atomic-habits-book.png";
import winFriendsBook from "@/assets/win-friends-book.png";
import deepWorkBook from "@/assets/deep-work-book.png";
import psychologyOfMoneyBook from "@/assets/psychology-of-money-book.png";
import workLifePodcast from "@/assets/worklife-podcast.png";
import timFerrissAuthor from "@/assets/tim-ferriss-author.png";
import simonSinekAuthor from "@/assets/simon-sinek-author.png";
import celebrationIllustration from "@/assets/celebration-illustration.png";
import platformLogos from "@/assets/platform-logos.png";
import becomeInteresting from "@/assets/become-interesting.png";
import { Check, ArrowLeft, X, Lock, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import worldMap from "@/assets/world-map.png";
import growthComparison from "@/assets/growth-comparison.png";
import LoadingPage from "@/components/LoadingPage";
import { PaymentForm } from "@/components/PaymentForm";

// Initialize Stripe with publishable key
const stripePromise = loadStripe("pk_test_51SVB2EDf5HdJBV7ZJm9WKt7bR4v2aCsScHfvZV6l15ZZ9gteJICFE7tUWmS1nBRAbhNt63YZ7fggWmrkNNoImsS000selbvXlx");

const GrowthPlan = () => {
  // Check URL params for step from Stripe redirect
  const urlParams = new URLSearchParams(window.location.search);
  const urlStep = urlParams.get('step');
  const initialStep = urlStep ? parseInt(urlStep) : 1;
  
  const [step, setStep] = useState(initialStep);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { toast } = useToast();

  // Load email from URL if redirected from Stripe
  useEffect(() => {
    const sessionId = urlParams.get('session_id');
    if (sessionId && initialStep === 39) {
      // Email should be stored in localStorage or retrieved from Stripe session
      const storedEmail = localStorage.getItem('deepkeep_email');
      if (storedEmail) {
        setAnswers(prev => ({ ...prev, email: storedEmail }));
      }
    }
  }, []);

  const totalSteps = 37;

  // Carousel auto-scroll effect
  useEffect(() => {
    if (step === 36) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % 8);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Calculate progress for each section
  const profileSteps = 11;
  const personalitySteps = 7;
  const personaliseSteps = 16;

  let profileProgress = 0;
  let personalityProgress = 0;
  let personaliseProgress = 0;
  let currentSection = "Profile";

  if (step <= profileSteps) {
    profileProgress = (step / profileSteps) * 100;
    currentSection = "Profile";
  } else if (step <= profileSteps + personalitySteps) {
    profileProgress = 100;
    personalityProgress = ((step - profileSteps) / personalitySteps) * 100;
    currentSection = "Personality";
  } else {
    profileProgress = 100;
    personalityProgress = 100;
    personaliseProgress = ((step - profileSteps - personalitySteps) / personaliseSteps) * 100;
    currentSection = "Personalise";
  }

  const handleAnswer = (questionKey: string, value: any) => {
    setAnswers({ ...answers, [questionKey]: value });
    const content = document.querySelector(".fade-content");
    if (content) {
      content.classList.add("animate-fade-out");
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleAnswerWithFeedback = (questionKey: string, value: any) => {
    setAnswers({ ...answers, [questionKey]: value });
  };

  const handleStripeCheckout = async () => {
    if (!answers.plan || !answers.email) {
      toast({
        title: "Missing information",
        description: "Please select a plan and enter your email",
        variant: "destructive",
      });
      return;
    }

    // Store email in localStorage for later retrieval
    localStorage.setItem('deepkeep_email', answers.email);

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planType: answers.plan,
          email: answers.email,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handlePasswordCreation = async () => {
    if (!answers.password || answers.password.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: answers.email,
        password: answers.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      if (data.user) {
        // Update subscription with user_id
        await supabase
          .from('subscriptions')
          .update({ user_id: data.user.id })
          .eq('email', answers.email)
          .eq('user_id', '00000000-0000-0000-0000-000000000000');

        toast({
          title: "Account created!",
          description: "Welcome to Deepkeep. Redirecting...",
        });

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error creating account:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
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
                  className={`w-full h-12 text-base ${answers.age === age ? "bg-primary/20 border-primary border-2" : ""}`}
                >
                  {age}
                </Button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={welcomeIllustration}
                  alt="Welcome illustration"
                  className="w-full max-w-[350px] h-auto"
                  loading="eager"
                />
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
                className={`w-full h-12 text-base ${answers.thinking === "visionary" ? "bg-primary/20 border-primary border-2" : ""}`}
              >
                🌅 Visionary Thinker
              </Button>
              <Button
                onClick={() => handleAnswer("thinking", "detail")}
                variant="outline"
                className={`w-full h-12 text-base ${answers.thinking === "detail" ? "bg-primary/20 border-primary border-2" : ""}`}
              >
                🧩 Detail-focused
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={bigPictureIllustration}
                  alt="Big picture thinking illustration"
                  className="w-full max-w-[450px] h-auto"
                  loading="eager"
                />
              </div>
              <p className="text-lg font-bold text-foreground leading-snug">
                Big-picture thinking is a valuable skill for tackling complex challenges.
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                Both perspectives are equally important, and attention to detail matters too. We'll tailor your plan to
                help you enhance both your ability to see the bigger scope and focus on finer details.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 5:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-foreground text-center leading-tight mb-4">
                Do you always have a clear idea of what you want?
              </h2>
              <div className="min-h-[80px] mb-3">
                {answers.clarity && (
                  <div className="p-4 bg-primary/10 rounded-xl space-y-2 animate-fade-in">
                    <p className="font-semibold text-sm">
                      {answers.clarity === 1 && "Got it!"}
                      {answers.clarity === 2 && "We hear you!"}
                      {answers.clarity === 3 && "We understand!"}
                      {answers.clarity === 4 &&
                        "Did you know the average person spends 4.8 hours a day on their phone?"}
                      {answers.clarity === 5 && "Fun fact: People spend an average of 4.8 hours a day on their phones!"}
                    </p>
                    <p className="text-xs leading-snug">
                      {answers.clarity === 1 &&
                        "💪\n\nIt's not always easy to pinpoint your desires. A personalized growth plan will help you clarify, prioritize, and achieve your goals effectively."}
                      {answers.clarity === 2 &&
                        "💡\n\nUnderstanding what you truly want can be challenging. Let's create a growth plan to help you navigate and achieve your aspirations."}
                      {answers.clarity === 3 &&
                        "🌟\n\nWe'll use the growth areas you've selected to craft a tailored plan that perfectly suits your needs."}
                      {answers.clarity === 4 &&
                        "📱\n\nIf you dedicate just 5 minutes daily to Deepkeep, you can gain essential insights to help you crush your goals. *Source: App Annie research"}
                      {answers.clarity === 5 &&
                        "🚀\n\nInvesting just 5 minutes a day on Deepkeep can provide the knowledge you need to achieve your goals. *Source: App Annie research"}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      onClick={() => handleAnswerWithFeedback("clarity", num)}
                      variant="outline"
                      className={`flex-1 h-14 ${answers.clarity === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground px-1">
                  <span>Disagree</span>
                  <span>Agree</span>
                </div>
              </div>
            </div>
            {answers.clarity && (
              <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2 animate-fade-in">
                Continue
              </Button>
            )}
          </div>
        );

      case 6:
        return (
          <div key={step} className="space-y-4 flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              I tend to doubt myself and my skills if I make a mistake
            </h2>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleAnswer("doubt", num)}
                    variant="outline"
                    className={`flex-1 h-14 ${answers.doubt === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-1">
                <span>Disagree</span>
                <span>Agree</span>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={mistakesIllustration}
                  alt="Mistakes illustration"
                  className="w-full max-w-[350px] h-auto"
                  loading="eager"
                />
              </div>
              <p className="text-base font-bold text-foreground leading-snug">
                If you don't make mistakes, you don't make anything. So, doubting yourself and your skills is normal if
                you make a mistake, buddy!
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                However, working out this issue will help you achieve your goals more seamlessly and efficiently. And
                your growth plan will target this as well.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 8:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-foreground text-center leading-tight mb-4">
                Which best describes you?
              </h2>
              <div className="h-[140px] mb-3 flex items-start">
                {answers.role && (
                  <div className="p-4 bg-primary/10 rounded-xl space-y-2 animate-fade-in w-full">
                    <p className="font-semibold text-sm">
                      {answers.role === "leader" && "Leading the way with vision and inspiration."}
                      {answers.role === "team" && "Growth starts with self-awareness."}
                      {answers.role === "mix" && "Breaking free from traditional roles."}
                    </p>
                    <p className="text-xs leading-snug">
                      {answers.role === "leader" &&
                        "🏔️\n\nBeing a leader comes with its challenges. Spend just 15 minutes daily learning strategies to further enhance your leadership skills."}
                      {answers.role === "team" &&
                        "🌱\n\nBeing a team player is valuable, but you can evolve further. Explore our tools to identify your strengths and unlock new opportunities."}
                      {answers.role === "mix" &&
                        "🎯\n\nYou have the best of both worlds! Our extensive library of resources will help you strengthen both leadership and teamwork skills."}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => handleAnswerWithFeedback("role", "leader")}
                  variant="outline"
                  className={`w-full h-12 text-base ${answers.role === "leader" ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                >
                  ⭐ A leader
                </Button>
                <Button
                  onClick={() => handleAnswerWithFeedback("role", "team")}
                  variant="outline"
                  className={`w-full h-12 text-base ${answers.role === "team" ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                >
                  🤝 A team player
                </Button>
                <Button
                  onClick={() => handleAnswerWithFeedback("role", "mix")}
                  variant="outline"
                  className={`w-full h-12 text-base ${answers.role === "mix" ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                >
                  ⚖️ A mix of both
                </Button>
              </div>
            </div>
            {answers.role && (
              <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2 animate-fade-in">
                Continue
              </Button>
            )}
          </div>
        );

      case 9:
        return (
          <div key={step} className="space-y-4 flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              I often find it challenging to make a decision quickly
            </h2>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleAnswer("decision", num)}
                    variant="outline"
                    className={`flex-1 h-14 ${answers.decision === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-1">
                <span>Disagree</span>
                <span>Agree</span>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={decisivenessIllustration}
                  alt="Decisiveness illustration"
                  className="w-full max-w-[350px] h-auto"
                  loading="eager"
                />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Way to go!</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                We admire your decisiveness, as it's an essential trait for becoming successful.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 11:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={honestIllustration}
                  alt="Thanks for being honest illustration"
                  className="w-full max-w-[350px] h-auto"
                  loading="eager"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">Thanks for being honest!</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                Now, we'll dive into your personality to have a better idea of you. It will help us build a personal
                approach to your growth plan.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue to Next Section
            </Button>
          </div>
        );

      case 12:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              What do you consider yourself?
            </h2>
            <div className="space-y-3 pt-8">
              <Button
                onClick={() => handleAnswer("personality", "extrovert")}
                variant="outline"
                className={`w-full h-12 text-base ${answers.personality === "extrovert" ? "bg-primary/20 border-primary border-2" : ""}`}
              >
                ⭐ Extrovert
              </Button>
              <Button
                onClick={() => handleAnswer("personality", "introvert")}
                variant="outline"
                className={`w-full h-12 text-base ${answers.personality === "introvert" ? "bg-primary/20 border-primary border-2" : ""}`}
              >
                🌙 Introvert
              </Button>
              <Button
                onClick={() => handleAnswer("personality", "both")}
                variant="outline"
                className={`w-full h-12 text-base ${answers.personality === "both" ? "bg-primary/20 border-primary border-2" : ""}`}
              >
                🎆 Both
              </Button>
            </div>
          </div>
        );

      case 13:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={extrovertIllustration}
                  alt="Cheers to the extrovert squad illustration"
                  className="w-full max-w-[280px] h-auto"
                  loading="eager"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">Cheers to the extrovert squad!</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                Extroverts thrive on connection and energy, requiring a tailored approach to happiness. We'll use your
                inputs to create a personalized growth plan that aligns with your needs!
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 14:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-foreground text-center leading-tight mb-4">
                Do you believe regular workouts improve your performance at work?
              </h2>
              <div className="h-[140px] mb-3 flex items-start">
                {answers.workouts && (
                  <div className="p-4 bg-primary/10 rounded-xl space-y-2 animate-fade-in w-full">
                    <p className="font-semibold text-sm">
                      {(answers.workouts === 1 || answers.workouts === 2) && "Absolutely, it makes a difference!"}
                      {answers.workouts === 3 && "We can fine-tune your growth plan to explore this further."}
                      {(answers.workouts === 4 || answers.workouts === 5) && "We're on the same page!"}
                    </p>
                    <p className="text-xs leading-snug">
                      {(answers.workouts === 1 || answers.workouts === 2) &&
                        "💪\n\nConsistent exercise is key to staying energized and reaching your career goals. Your personalized growth plan will help you strike the right balance."}
                      {answers.workouts === 3 &&
                        "✨\n\nRegular exercise can significantly boost your focus, memory, and ability to manage stress effectively!"}
                      {(answers.workouts === 4 || answers.workouts === 5) &&
                        "🌟\n\nMaintaining a healthy work-life balance, including regular exercise, is essential for staying productive and resourceful."}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      onClick={() => handleAnswerWithFeedback("workouts", num)}
                      variant="outline"
                      className={`flex-1 h-14 ${answers.workouts === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground px-1">
                  <span>Disagree</span>
                  <span>Agree</span>
                </div>
              </div>
            </div>
            {answers.workouts && (
              <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2 animate-fade-in">
                Continue
              </Button>
            )}
          </div>
        );

      case 15:
        return (
          <div key={step} className="space-y-4 flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Do you sometimes need a friendly push to keep moving forward?
            </h2>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleAnswer("push", num)}
                    variant="outline"
                    className={`flex-1 h-14 ${answers.push === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-1">
                <span>Disagree</span>
                <span>Agree</span>
              </div>
            </div>
          </div>
        );

      case 16:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={motivatorIllustration}
                  alt="A friendly push motivator illustration"
                  className="w-full max-w-[280px] h-auto"
                  loading="eager"
                />
              </div>
              <p className="text-base font-bold text-foreground leading-snug">
                A friendly push here and there can surely be an excellent motivator.
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                We'll consider how you feel about it for creating your growth plan.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 17:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-foreground text-center leading-tight mb-4">
                Do you feel the need to improve your time management skills?
              </h2>
              <div className="h-[140px] mb-3 flex items-start">
                {answers.timeManagement && (
                  <div className="p-4 bg-primary/10 rounded-xl space-y-2 animate-fade-in w-full">
                    <p className="font-semibold text-sm">
                      {(answers.timeManagement === 1 || answers.timeManagement === 2) && "Well done!"}
                      {answers.timeManagement === 3 && "You're not alone in feeling this way!"}
                      {(answers.timeManagement === 4 || answers.timeManagement === 5) && "Your drive is inspiring!"}
                    </p>
                    <p className="text-xs leading-snug">
                      {(answers.timeManagement === 1 || answers.timeManagement === 2) &&
                        "🎉\n\nGreat to hear! Let's concentrate on other areas of your growth. If time management ever becomes a priority, we'll adjust your plan accordingly."}
                      {answers.timeManagement === 3 &&
                        "🤗\n\nWe're here to support you in improving your time-management skills whenever you need it."}
                      {(answers.timeManagement === 4 || answers.timeManagement === 5) &&
                        "🔥\n\nDid you know that 93% of Deepkeep users consider time management essential for achieving their goals? We'll guide you on this journey!"}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      onClick={() => handleAnswerWithFeedback("timeManagement", num)}
                      variant="outline"
                      className={`flex-1 h-14 ${answers.timeManagement === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground px-1">
                  <span>Disagree</span>
                  <span>Agree</span>
                </div>
              </div>
            </div>
            {answers.timeManagement && (
              <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2 animate-fade-in">
                Continue
              </Button>
            )}
          </div>
        );

      case 18:
        return (
          <div key={step} className="space-y-4 flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              I often tend to lose my boundaries in relationships
            </h2>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleAnswer("boundaries", num)}
                    variant="outline"
                    className={`flex-1 h-14 ${answers.boundaries === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-1">
                <span>Disagree</span>
                <span>Agree</span>
              </div>
            </div>
          </div>
        );

      case 19:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={honestIllustration}
                  alt="Boundaries illustration"
                  className="w-full max-w-[400px] h-auto"
                  loading="eager"
                />
              </div>
              {answers.boundaries && (
                <>
                  {answers.boundaries === 1 || answers.boundaries === 2 ? (
                    <>
                      <h2 className="text-xl font-bold text-foreground">Great for you!</h2>
                      <p className="text-sm text-muted-foreground leading-snug">
                        Your boundaries are important and valid, and we're glad you hold onto them.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-bold text-foreground leading-snug mb-4">
                        No matter what, your boundaries are important, and it can hurt to lose them.
                      </p>
                      <p className="text-base text-muted-foreground leading-snug">
                        There's always room for improvement, though! We'll help you work on it with your growth plan.
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
            {answers.boundaries && (
              <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2 animate-fade-in">
                Continue
              </Button>
            )}
          </div>
        );

      case 20:
        return (
          <div key={step} className="space-y-4 flex flex-col min-h-[calc(100vh-280px)] animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Do you want to better understand your body and desires?
            </h2>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleAnswer("bodyDesires", num)}
                    variant="outline"
                    className={`flex-1 h-14 ${answers.bodyDesires === num ? "bg-primary border-primary border-2 text-primary-foreground" : ""}`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground px-1">
                <span>Disagree</span>
                <span>Agree</span>
              </div>
            </div>
          </div>
        );

      case 21:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={amazingCloudsIllustration}
                  alt="You're amazing illustration"
                  className="w-full max-w-[400px] h-auto"
                  loading="eager"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">You're amazing!</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                Your determination is inspiring! Let's take a closer look at your favorite books, podcasts, and authors
                to craft the perfect growth plan for you.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 22:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Does this book seem interesting to you?
            </h2>
            <div className="flex justify-center">
              <img src={atomicHabitsBook} alt="Atomic Habits book cover" className="w-full max-w-[200px] h-auto" />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              An easy & proven way to build good habits & break bad ones. Helps build tiny changes into remarkable results.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Button
                onClick={() => handleAnswer("book1", false)}
                variant="outline"
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 flex flex-col items-center justify-center gap-1"
              >
                <X className="w-7 h-7 text-red-500" />
                <span className="text-sm text-red-500 font-medium">No</span>
              </Button>
              <Button
                onClick={() => handleAnswer("book1", true)}
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-primary hover:bg-primary/10 flex flex-col items-center justify-center gap-1"
              >
                <Check className="w-7 h-7 text-primary" />
                <span className="text-sm text-primary font-medium">Yes</span>
              </Button>
            </div>
          </div>
        );

      case 23:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Does this book seem interesting to you?
            </h2>
            <div className="flex justify-center">
              <img
                src={winFriendsBook}
                alt="How to Win Friends and Influence People book cover"
                className="w-full max-w-[200px] h-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              Provides practical techniques to win people over, handle conflicts, and inspire cooperation.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Button
                onClick={() => handleAnswer("book2", false)}
                variant="outline"
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 flex flex-col items-center justify-center gap-1"
              >
                <X className="w-7 h-7 text-red-500" />
                <span className="text-sm text-red-500 font-medium">No</span>
              </Button>
              <Button
                onClick={() => handleAnswer("book2", true)}
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-primary hover:bg-primary/10 flex flex-col items-center justify-center gap-1"
              >
                <Check className="w-7 h-7 text-primary" />
                <span className="text-sm text-primary font-medium">Yes</span>
              </Button>
            </div>
          </div>
        );

      case 24:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Does this book seem interesting to you?
            </h2>
            <div className="flex justify-center">
              <img src={deepWorkBook} alt="Deep Work book cover" className="w-full max-w-[200px] h-auto" />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              The book guides readers on how to cultivate deep work habits and minimize the impact of shallow work.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Button
                onClick={() => handleAnswer("book3", false)}
                variant="outline"
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 flex flex-col items-center justify-center gap-1"
              >
                <X className="w-7 h-7 text-red-500" />
                <span className="text-sm text-red-500 font-medium">No</span>
              </Button>
              <Button
                onClick={() => handleAnswer("book3", true)}
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-primary hover:bg-primary/10 flex flex-col items-center justify-center gap-1"
              >
                <Check className="w-7 h-7 text-primary" />
                <span className="text-sm text-primary font-medium">Yes</span>
              </Button>
            </div>
          </div>
        );

      case 25:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Does this book seem interesting to you?
            </h2>
            <div className="flex justify-center">
              <img
                src={psychologyOfMoneyBook}
                alt="The Psychology of Money book cover"
                className="w-full max-w-[200px] h-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              A collection of short stories exploring the strange ways people think about money and teaches you how to
              make better sense of it.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Button
                onClick={() => handleAnswer("book4", false)}
                variant="outline"
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 flex flex-col items-center justify-center gap-1"
              >
                <X className="w-7 h-7 text-red-500" />
                <span className="text-sm text-red-500 font-medium">No</span>
              </Button>
              <Button
                onClick={() => handleAnswer("book4", true)}
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-primary hover:bg-primary/10 flex flex-col items-center justify-center gap-1"
              >
                <Check className="w-7 h-7 text-primary" />
                <span className="text-sm text-primary font-medium">Yes</span>
              </Button>
            </div>
          </div>
        );

      case 26:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Does this podcast seem interesting to you?
            </h2>
            <div className="flex justify-center">
              <img src={workLifePodcast} alt="WorkLife podcast cover" className="w-full max-w-[200px] h-auto" />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              Uncovers valuable lessons and practical strategies that can improve individual and organizational
              performance.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Button
                onClick={() => handleAnswer("podcast1", false)}
                variant="outline"
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 flex flex-col items-center justify-center gap-1"
              >
                <X className="w-7 h-7 text-red-500" />
                <span className="text-sm text-red-500 font-medium">No</span>
              </Button>
              <Button
                onClick={() => handleAnswer("podcast1", true)}
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-primary hover:bg-primary/10 flex flex-col items-center justify-center gap-1"
              >
                <Check className="w-7 h-7 text-primary" />
                <span className="text-sm text-primary font-medium">Yes</span>
              </Button>
            </div>
          </div>
        );

      case 27:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Does Tim Ferriss seem interesting to you?
            </h2>
            <div className="flex justify-center">
              <img src={timFerrissAuthor} alt="Tim Ferriss portrait" className="w-full max-w-[200px] h-auto" />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              Tim Ferriss is an influential author, entrepreneur, and podcast host known for his unconventional
              strategies and unique approach to self-improvement.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Button
                onClick={() => handleAnswer("author1", false)}
                variant="outline"
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 flex flex-col items-center justify-center gap-1"
              >
                <X className="w-7 h-7 text-red-500" />
                <span className="text-sm text-red-500 font-medium">No</span>
              </Button>
              <Button
                onClick={() => handleAnswer("author1", true)}
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-primary hover:bg-primary/10 flex flex-col items-center justify-center gap-1"
              >
                <Check className="w-7 h-7 text-primary" />
                <span className="text-sm text-primary font-medium">Yes</span>
              </Button>
            </div>
          </div>
        );

      case 28:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Does Simon Sinek seem interesting to you?
            </h2>
            <div className="flex justify-center">
              <img src={simonSinekAuthor} alt="Simon Sinek portrait" className="w-full max-w-[200px] h-auto" />
            </div>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              An inspiring speaker and author, Simon Sinek focuses on leadership, purpose, and finding fulfillment in
              work and life.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Button
                onClick={() => handleAnswer("author2", false)}
                variant="outline"
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-red-500 hover:bg-red-50 flex flex-col items-center justify-center gap-1"
              >
                <X className="w-7 h-7 text-red-500" />
                <span className="text-sm text-red-500 font-medium">No</span>
              </Button>
              <Button
                onClick={() => handleAnswer("author2", true)}
                className="flex-1 max-w-[160px] min-h-[80px] h-20 rounded-xl bg-white border-2 border-primary hover:bg-primary/10 flex flex-col items-center justify-center gap-1"
              >
                <Check className="w-7 h-7 text-primary" />
                <span className="text-sm text-primary font-medium">Yes</span>
              </Button>
            </div>
          </div>
        );

      case 29:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img
                  src={celebrationIllustration}
                  alt="Celebration"
                  className="w-full max-w-[300px] h-auto"
                  loading="eager"
                />
              </div>
              <h2 className="text-xl font-bold text-foreground">Great choices! We're almost done.</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                Thanks for your impressive sincerity. We've almost done setting up your journey. A little patience,
                fellow!
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 30:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              <div className="flex justify-center">
                <img src={worldMap} alt="World map" className="w-full max-w-[500px] h-auto" loading="eager" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Join over 10M+ people</h2>
              <p className="text-sm text-muted-foreground leading-snug">
                Become part of the community that escaped doomscrolling. Grow daily and achieve your goals with us.
              </p>
            </div>
            <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
              Continue
            </Button>
          </div>
        );

      case 31:
        const growthOptions = [
          { emoji: "📈", text: "Advancing in your career" },
          { emoji: "🚀", text: "Starting your own business" },
          { emoji: "💖", text: "Strengthening a relationship" },
          { emoji: "👪", text: "Embracing parenthood" },
          { emoji: "🧠", text: "Improving mental and emotional health" },
          { emoji: "💰", text: "Achieving financial goals" },
          { emoji: "🌴", text: "Planning for retirement" },
        ];

        const selectedGrowthDrivers = answers.growthDrivers || [];

        const toggleGrowthDriver = (text: string) => {
          const current = answers.growthDrivers || [];
          const newSelection = current.includes(text)
            ? current.filter((item: string) => item !== text)
            : [...current, text];
          setAnswers({ ...answers, growthDrivers: newSelection });
        };

        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-300px)] animate-fade-in">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-foreground text-center leading-tight mb-6">
                What drives your self-growth journey?
              </h2>
              <div className="space-y-3">
                {growthOptions.map((option, index) => {
                  const isSelected = selectedGrowthDrivers.includes(option.text);
                  return (
                    <button
                      key={index}
                      onClick={() => toggleGrowthDriver(option.text)}
                      className={`w-full h-12 px-4 rounded-lg border text-base flex items-center gap-3 transition-all ${
                        isSelected ? "bg-primary/10 border-primary border-2" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span className="flex-1 text-left">
                        {option.emoji} {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedGrowthDrivers.length > 0 && (
              <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2 animate-fade-in">
                Continue
              </Button>
            )}
          </div>
        );

      case 32:
        return (
          <div key={step} className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground text-center leading-tight">
              Set Your Daily Self-Development Goal
            </h2>
            <p className="text-sm text-muted-foreground text-center leading-snug">
              Choose how much time you want to dedicate to self-growth each day.
            </p>
            <div className="space-y-3">
              {[
                { emoji: "🌱", text: "Light - 5 min/day", value: "light" },
                { emoji: "🌿", text: "Moderate - 10 min/day", value: "moderate" },
                { emoji: "🌳", text: "Intense - 15 min/day", value: "intense" },
              ].map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handleAnswer("dailyGoal", option.value)}
                  variant="outline"
                  className={`w-full h-12 text-base justify-start ${answers.dailyGoal === option.value ? "bg-primary/20 border-primary border-2" : ""}`}
                >
                  {option.emoji} {option.text}
                </Button>
              ))}
            </div>
          </div>
        );

      case 33:
        if (!answers.loadingComplete) {
          return <LoadingPage onComplete={() => {
            handleAnswerWithFeedback("loadingComplete", true);
            setTimeout(() => setStep(step + 1), 100);
          }} />;
        }
        return null;

      case 34:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6">
              {!answers.emailFocused ? (
                <>
                  <h2 className="text-2xl font-bold text-foreground text-center leading-tight">
                    Enter your email to create your personal account and track your progress
                  </h2>
                  <p className="text-sm text-muted-foreground text-center leading-snug flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" />
                    We'll never spam you or share your email
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground text-center leading-tight">
                    Enter your email to create personal account
                  </h2>
                  <p className="text-sm text-muted-foreground text-center leading-snug flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3" />
                    We'll never spam you or share your email
                  </p>
                </>
              )}
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 text-base"
                  value={answers.email || ""}
                  onChange={(e) => handleAnswerWithFeedback("email", e.target.value)}
                  onFocus={() => handleAnswerWithFeedback("emailFocused", true)}
                />
              </div>
            </div>
            <Button
              onClick={() => setStep(step + 1)}
              className="w-full h-12 mt-2"
              disabled={!answers.email || !answers.email.includes("@")}
            >
              Continue
            </Button>
          </div>
        );

      case 35:
        return (
          <div key={step} className="space-y-8 pb-12 animate-fade-in bg-background -mx-4 px-4 py-6">
            {/* Logo */}
            <div className="flex justify-center pt-4">
              <img src={deepkeepLogo} alt="Deepkeep" className="h-10 w-auto" />
            </div>

            {/* White Panel Container */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Your personal growth plan <span style={{ color: "#2dbe89" }}>is ready</span>
                </h1>
                <p className="text-sm text-muted-foreground">Based on your answers, we crafted a self-growth plan</p>
              </div>
              {/* Growth Curve Visualization with Copybook Background */}
              <div
                className="relative py-8 px-4 bg-white rounded-xl"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 29px, #e5e7eb 29px, #e5e7eb 30px)",
                  backgroundSize: "100% 30px",
                }}
              >
                <svg viewBox="0 0 300 120" className="w-full h-32">
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#2dbe89", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#FF6B35", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>

                  {/* Animated Curved path */}
                  <path
                    d="M 20 90 Q 80 80, 150 50 T 280 20"
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    style={{
                      animation: "drawLine 2s ease-out forwards",
                    }}
                  />

                  {/* Start point */}
                  <circle cx="20" cy="90" r="6" fill="#2dbe89" />
                  {/* End point */}
                  <circle cx="280" cy="20" r="6" fill="#FF6B35" />
                </svg>

                {/* Start label - positioned above green dot */}
                <div className="absolute left-[20px] bottom-[35px] -translate-x-1/2">
                  <p className="text-sm font-bold" style={{ color: "#2dbe89" }}>
                    Now
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">November 25</p>
                </div>

                {/* End label - positioned above orange dot */}
                <div className="absolute right-0 top-[8px] text-right">
                  <p className="text-sm font-bold" style={{ color: "#FF6B35" }}>
                    15 books per month
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">December 25</p>
                </div>
              </div>

              {/* Platform Compatibility */}
              <div className="flex items-center justify-center gap-3 py-4">
                <img src={platformLogos} alt="iOS and Android" className="h-12 w-auto" />
                <p className="text-xs text-muted-foreground">You can use Deepkeep on iOS, Android and web</p>
              </div>

              {/* Benefits Section */}
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold text-foreground">
                    One Month In: You're <br />
                    <span style={{ color: "#2dbe89" }}>Legally Smarter</span>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    People reported these top 6 benefits after the first month
                  </p>
                </div>

                {/* Benefit List */}
                <div className="space-y-3 px-2">
                  <div className="flex gap-3 items-start">
                    <span className="text-xl flex-shrink-0">📚</span>
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">Replace mindless scrolling habits</span> — Your phone becomes a
                      tool for growth, not distraction
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="text-xl flex-shrink-0">✨</span>
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">You start connecting dots everywhere</span> — Ideas from different
                      fields suddenly click together
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="text-xl flex-shrink-0">⭐</span>
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">Become the 'interesting person' in conversations</span> — People
                      ask where you get your cool insights
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="text-xl flex-shrink-0">💡</span>
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">Confidence boost from continuous growth</span> — You feel smarter
                      and more intellectually capable
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="text-xl flex-shrink-0">🤔</span>
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">Enhanced curiosity muscle</span> — You naturally ask better
                      questions and seek deeper understanding
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="text-xl flex-shrink-0">🧠</span>
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">Decision-making improvements</span> — You have more mental
                      frameworks to draw from
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button onClick={() => setStep(step + 1)} className="w-full h-12 mt-2">
                Continue
              </Button>
            </div>
          </div>
        );

      case 36:
        const CarouselItem36 = ({ email, insights, minutes }: { email: string; insights: number; minutes: number }) => {
          return (
            <div className="bg-white rounded-lg p-3 shadow-sm border border-border w-full">
              <p className="text-sm font-medium text-foreground">{email}</p>
              <p className="text-xs text-muted-foreground">
                {insights} insights, {minutes} minutes
              </p>
            </div>
          );
        };

        const testimonials36 = [
          { email: "so*********@gmail.com", insights: 4, minutes: 4 },
          { email: "ge*********@gmail.com", insights: 5, minutes: 3 },
          { email: "ma*********@gmail.com", insights: 7, minutes: 6 },
          { email: "al*********@gmail.com", insights: 3, minutes: 2 },
          { email: "je*********@gmail.com", insights: 6, minutes: 5 },
          { email: "ra*********@gmail.com", insights: 4, minutes: 3 },
          { email: "ch*********@gmail.com", insights: 8, minutes: 7 },
          { email: "em*********@gmail.com", insights: 5, minutes: 4 },
        ];

        return (
          <div key={step} className="space-y-4 pb-12 animate-fade-in bg-background -mx-4 px-4 py-6">
            {/* Logo at very top */}
            <div className="flex justify-center pt-4 pb-2">
              <img src={deepkeepLogo} alt="Deepkeep" className="h-10 w-auto" />
            </div>

            {/* Main Image */}
            <div className="flex justify-center px-4">
              <img src={becomeInteresting} alt="Become the most interesting person in the room" className="w-full max-w-[600px] h-auto rounded-lg" />
            </div>

            {/* Carousel Section with Gray Outline */}
            <div className="mx-2 border border-gray-300 rounded-lg p-3 space-y-2">
              {/* Subtitle */}
              <p className="text-sm font-semibold text-foreground text-center">
                1102 people learned self-growth insights in the last hour
              </p>

              {/* Scrolling Testimonial Carousel - One at a time */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  {testimonials36.map((testimonial, idx) => (
                    <div key={idx} className="w-full flex-shrink-0">
                      <CarouselItem36
                        email={testimonial.email}
                        insights={testimonial.insights}
                        minutes={testimonial.minutes}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="px-2">
              <Button onClick={() => setStep(38)} className="w-full h-12 mt-2">
                Continue
              </Button>
            </div>
          </div>
        );

      case 38:
        return (
          <div key={step} className="space-y-6 animate-fade-in pb-8">
            {/* Header */}
            <div className="bg-muted/30 -mx-4 px-4 py-4">
              <h2 className="text-xl font-bold text-foreground text-center">
                Choose your plan
              </h2>
            </div>

            {/* Pricing Options */}
            <div className="space-y-3">
              {/* 1 Month Plan */}
              <div
                onClick={() => handleAnswerWithFeedback("plan", "1month")}
                className={`bg-background border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  answers.plan === "1month" ? "border-destructive bg-destructive/5" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    answers.plan === "1month" ? "border-destructive" : "border-muted-foreground"
                  }`}>
                    {answers.plan === "1month" && <div className="w-3 h-3 rounded-full bg-destructive" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">1 Month Plan</span>
                      <span className="bg-destructive text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        SAVE 51%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">€22.61</span>
                      <span className="text-lg font-bold text-foreground">€11.07</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-start">
                      <span className="text-3xl font-bold text-foreground">€0</span>
                      <span className="text-sm font-bold text-foreground">.36</span>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">per day</div>
                  </div>
                </div>
              </div>

              {/* 3 Months Plan - Most Popular */}
              <div className="relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-destructive text-white text-xs px-4 py-1 rounded-full font-bold z-10">
                  MOST POPULAR
                </div>
                <div
                  onClick={() => handleAnswerWithFeedback("plan", "3months")}
                  className={`bg-background border-2 rounded-lg p-4 cursor-pointer transition-all mt-2 ${
                    answers.plan === "3months" ? "border-destructive bg-destructive/5" : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers.plan === "3months" ? "border-destructive" : "border-muted-foreground"
                    }`}>
                      {answers.plan === "3months" && <div className="w-3 h-3 rounded-full bg-destructive" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">3 Months Plan</span>
                        <span className="bg-destructive text-white text-xs px-2 py-0.5 rounded-full font-bold">
                          SAVE 60%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">€49.95</span>
                        <span className="text-lg font-bold text-foreground">€19.98</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-start">
                        <span className="text-3xl font-bold text-foreground">€0</span>
                        <span className="text-sm font-bold text-foreground">.21</span>
                      </div>
                      <div className="text-xs text-muted-foreground uppercase">per day</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1 Year Plan */}
              <div
                onClick={() => handleAnswerWithFeedback("plan", "1year")}
                className={`bg-background border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  answers.plan === "1year" ? "border-destructive bg-destructive/5" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    answers.plan === "1year" ? "border-destructive" : "border-muted-foreground"
                  }`}>
                    {answers.plan === "1year" && <div className="w-3 h-3 rounded-full bg-destructive" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">1 Year Plan</span>
                      <span className="bg-destructive text-white text-xs px-2 py-0.5 rounded-full font-bold">
                        SAVE 51%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through">€102</span>
                      <span className="text-lg font-bold text-foreground">€49.98</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-start">
                      <span className="text-3xl font-bold text-foreground">€0</span>
                      <span className="text-sm font-bold text-foreground">.13</span>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase">per day</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-base font-semibold text-foreground">
                Select payment method
              </h3>

              {/* Google Pay Option */}
              <div
                onClick={() => handleAnswerWithFeedback("paymentMethod", "googlepay")}
                className={`bg-background border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  answers.paymentMethod === "googlepay" ? "border-destructive bg-destructive/5" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    answers.paymentMethod === "googlepay" ? "border-destructive" : "border-muted-foreground"
                  }`}>
                    {answers.paymentMethod === "googlepay" && <div className="w-3 h-3 rounded-full bg-destructive" />}
                  </div>
                  <span className="flex-1 font-medium text-foreground">Google Pay</span>
                  <div className="text-2xl">G</div>
                </div>
              </div>

              {/* Credit Card Option */}
              <div
                onClick={() => handleAnswerWithFeedback("paymentMethod", "card")}
                className={`bg-background border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  answers.paymentMethod === "card" ? "border-destructive bg-destructive/5" : "border-border"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers.paymentMethod === "card" ? "border-destructive" : "border-muted-foreground"
                    }`}>
                      {answers.paymentMethod === "card" && <div className="w-3 h-3 rounded-full bg-destructive" />}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">VISA</span>
                      <span className="text-xs font-medium text-muted-foreground">Mastercard</span>
                      <span className="text-xs font-medium text-muted-foreground">Discover</span>
                    </div>
                  </div>

                  <div className="space-y-2 pl-8">
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Check className="w-4 h-4" />
                      <span>No third party dependencies</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Check className="w-4 h-4" />
                      <span>Secure purchases</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Payment Form */}
              {answers.paymentMethod === "card" && clientSecret && (
                <div className="animate-fade-in">
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm 
                      onSuccess={() => setStep(39)}
                      onCancel={() => {
                        setClientSecret(null);
                        setIsProcessing(false);
                      }}
                    />
                  </Elements>
                </div>
              )}
            </div>

            {/* Continue Button - shown only when payment form is not displayed */}
            {!clientSecret && (
              <Button
                onClick={handleStripeCheckout}
                className="w-full h-12 mt-6"
                disabled={!answers.plan || !answers.paymentMethod || isProcessing}
              >
                {isProcessing ? "Loading payment form..." : "Continue to Payment"}
              </Button>
            )}
          </div>
        );

      case 39:
        return (
          <div key={step} className="flex flex-col min-h-[calc(100vh-280px)] fade-content animate-fade-in">
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <h2 className="text-2xl font-bold text-foreground text-center leading-tight">
                Create your password
              </h2>
              <p className="text-sm text-muted-foreground text-center leading-snug">
                Set a secure password to access your account
              </p>
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 text-base"
                  value={answers.password || ""}
                  onChange={(e) => handleAnswerWithFeedback("password", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters
                </p>
              </div>
            </div>
            <Button
              onClick={handlePasswordCreation}
              className="w-full h-12 mt-2"
              disabled={!answers.password || answers.password.length < 6 || isProcessing}
            >
              {isProcessing ? "Creating account..." : "Create Account"}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Logo-only Header for steps 38 and 39 */}
      {(step === 38 || step === 39) && (
        <div className="fixed top-0 left-0 right-0 bg-background z-10 border-b border-border">
          <div className="w-full max-w-[600px] mx-auto px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setStep(step === 39 ? 38 : 36)}
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={deepkeepLogo} alt="deepkeep" className="h-10 w-auto" />
              <div className="w-10" />
            </div>
          </div>
        </div>
      )}

      {/* Fixed Header with Progress */}
      {step !== 33 && step !== 34 && step !== 35 && step !== 36 && step !== 38 && step !== 39 && (
        <div className="fixed top-0 left-0 right-0 bg-background z-10 border-b border-border">
          <div className="w-full max-w-[600px] mx-auto px-4 pt-4 pb-3 space-y-3">
            {/* Back Button & Logo */}
            <div className="flex items-center justify-between">
              <Button
                onClick={() => step > 1 && setStep(step - 1)}
                variant="ghost"
                size="icon"
                className={`text-muted-foreground ${step === 1 ? "invisible" : ""}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={deepkeepLogo} alt="deepkeep" className="h-10 w-auto" />
              <div className="w-10" /> {/* Spacer for centering */}
            </div>

            {/* Progress Bar with Gaps */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-1">
                  <Progress value={profileProgress} className="h-2 flex-1" />
                  {step > profileSteps && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
                <div className="flex-1 flex items-center gap-1">
                  <Progress value={personalityProgress} className="h-2 flex-1" />
                  {step > profileSteps + personalitySteps && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
                <div className="flex-1 flex items-center gap-1">
                  <Progress value={personaliseProgress} className="h-2 flex-1" />
                  {step > totalSteps && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
              </div>
              <div className="flex justify-center">
                <span className="text-sm font-semibold text-primary">{currentSection}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content with top padding to account for fixed header */}
      <div className={
        step === 33 || step === 34 || step === 35 || step === 36 || step === 37 
          ? "px-4 pb-6" 
          : step === 38 || step === 39
          ? "pt-[80px] px-4 pb-6"
          : "pt-[140px] px-4 pb-6"
      }>
        <div className="w-full max-w-[600px] mx-auto">{renderStep()}</div>
      </div>
    </div>
  );
};

export default GrowthPlan;