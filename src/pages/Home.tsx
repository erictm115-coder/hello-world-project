import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-lg">
              Continue your learning journey
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Books Read</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45m</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Continue Reading */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">Continue Reading</h2>
            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-20 h-28 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">Atomic Habits</h3>
                  <p className="text-sm text-muted-foreground">James Clear</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-primary rounded-full" />
                    </div>
                    <span className="text-sm text-muted-foreground">67%</span>
                  </div>
                  <Button onClick={() => navigate("/book-reader")}>
                    Continue Reading
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/explore")}>
              <h3 className="font-semibold text-lg mb-2">Explore New Books</h3>
              <p className="text-sm text-muted-foreground">
                Discover books tailored to your interests
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/growth-stats")}>
              <h3 className="font-semibold text-lg mb-2">View Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                Track your reading stats and achievements
              </p>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
