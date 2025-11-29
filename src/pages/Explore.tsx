import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Business", "Psychology", "Self-Help", "Science",
    "Technology", "History", "Philosophy", "Health"
  ];

  const featuredBooks = [
    { title: "Atomic Habits", author: "James Clear", category: "Self-Help" },
    { title: "Deep Work", author: "Cal Newport", category: "Productivity" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Psychology" },
    { title: "The Lean Startup", author: "Eric Ries", category: "Business" },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-bold">Explore</h1>
            <p className="text-muted-foreground text-lg">
              Discover your next favorite book
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search books, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <Card
                  key={category}
                  className="p-4 text-center hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <p className="font-medium">{category}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Books */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold">Featured Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredBooks.map((book) => (
                <Card key={book.title} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-16 h-24 bg-muted rounded-lg" />
                    <div className="space-y-2">
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <p className="text-xs text-primary">{book.category}</p>
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

export default Explore;
