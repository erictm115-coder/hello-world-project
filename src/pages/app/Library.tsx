import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import { ArrowLeft, BookOpen } from "lucide-react";

const Library = () => {
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
        <Button
          variant="ghost"
          onClick={() => navigate("/app/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-serif font-bold mb-8">Library</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <CardTitle className="font-serif">Saved Books</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your collection of saved books</p>
              <p className="text-3xl font-bold mt-4">0</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-accent" />
                <CardTitle className="font-serif">Ideas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Key insights you've captured</p>
              <p className="text-3xl font-bold mt-4">0</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <CardTitle className="font-serif">In Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Books you're currently reading</p>
              <p className="text-3xl font-bold mt-4">0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Library;
