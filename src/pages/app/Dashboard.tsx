import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold">Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card p-6 rounded-lg border shadow-card">
            <h2 className="text-xl font-serif font-semibold mb-2">Welcome!</h2>
            <p className="text-muted-foreground">
              {user?.email}
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-card">
            <h2 className="text-xl font-serif font-semibold mb-2">Your Progress</h2>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">Books completed</p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-card">
            <h2 className="text-xl font-serif font-semibold mb-2">Current Streak</h2>
            <p className="text-3xl font-bold text-accent">0 days</p>
            <p className="text-sm text-muted-foreground">Keep learning!</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Button 
            onClick={() => navigate("/app/library")}
            className="w-full"
            size="lg"
          >
            Browse Library
          </Button>
          <Button 
            onClick={() => navigate("/app/profile")}
            variant="outline"
            className="w-full"
            size="lg"
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
