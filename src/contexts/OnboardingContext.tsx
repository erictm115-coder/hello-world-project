import React, { createContext, useContext, useState } from "react";

interface OnboardingState {
  topics: string[];
  reminderTime: string | null;
  allowReminders: boolean;
  authenticated: boolean;
  proStatus: "free" | "trial" | "pro";
  onboardingComplete: boolean;
}

interface OnboardingContextType {
  state: OnboardingState;
  updateTopics: (topics: string[]) => void;
  updateReminder: (time: string, allow: boolean) => void;
  updateAuth: (authenticated: boolean) => void;
  updateProStatus: (status: "free" | "trial" | "pro") => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>({
    topics: [],
    reminderTime: null,
    allowReminders: false,
    authenticated: false,
    proStatus: "free",
    onboardingComplete: false,
  });

  const updateTopics = (topics: string[]) => {
    setState((prev) => ({ ...prev, topics }));
  };

  const updateReminder = (time: string, allow: boolean) => {
    setState((prev) => ({ ...prev, reminderTime: time, allowReminders: allow }));
  };

  const updateAuth = (authenticated: boolean) => {
    setState((prev) => ({ ...prev, authenticated }));
  };

  const updateProStatus = (status: "free" | "trial" | "pro") => {
    setState((prev) => ({ ...prev, proStatus: status }));
  };

  const completeOnboarding = () => {
    setState((prev) => ({ ...prev, onboardingComplete: true }));
    localStorage.setItem("onboardingComplete", "true");
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        updateTopics,
        updateReminder,
        updateAuth,
        updateProStatus,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
