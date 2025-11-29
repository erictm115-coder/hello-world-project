import { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingContextType {
  mainFocus: string[];
  setMainFocus: (focus: string[]) => void;
  learningFormat: string;
  setLearningFormat: (format: string) => void;
  topics: string[];
  setTopics: (topics: string[]) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [mainFocus, setMainFocus] = useState<string[]>([]);
  const [learningFormat, setLearningFormat] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

  return (
    <OnboardingContext.Provider
      value={{
        mainFocus,
        setMainFocus,
        learningFormat,
        setLearningFormat,
        topics,
        setTopics,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
