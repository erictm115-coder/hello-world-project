import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { TrendingUp, BookOpen, Target, Award } from "lucide-react";

const GrowthStats = () => {
  const stats = [
    { label: "Books Completed", value: "12", icon: BookOpen, color: "text-primary" },
    { label: "Current Streak", value: "7 days", icon: TrendingUp, color: "text-accent" },
    { label: "Total Reading Time", value: "24h 30m", icon: Target, color: "text-primary" },
    { label: "Ideas Captured", value: "48", icon: Award, color: "text-accent" },
  ];

  const recentBooks = [
    { title: "Atomic Habits", completedDate: "2024-03-15", rating: 5 },
    { title: "Deep Work", completedDate: "2024-03-10", rating: 5 },
    { title: "The Lean Startup", completedDate: "2024-03-05", rating: 4 },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-bold">Growth Stats</h1>
            <p className="text-muted-foreground text-lg">
              Track your learning journey
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6">
                  <div className="space-y-2">
                    <div className={`${stat.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Reading Activity */}
          <Card className="p-6">
            <h2 className="font-serif text-2xl font-bold mb-6">Weekly Activity</h2>
            <div className="flex gap-2 h-32 items-end">
              {[40, 60, 45, 80, 55, 90, 70].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recently Completed */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">Recently Completed</h2>
            <div className="space-y-3">
              {recentBooks.map((book) => (
                <Card key={book.title} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed on {new Date(book.completedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(book.rating)].map((_, i) => (
                        <span key={i} className="text-accent">★</span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GrowthStats;
