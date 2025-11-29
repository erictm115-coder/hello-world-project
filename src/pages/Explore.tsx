import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, BookOpen, Star, Clock } from "lucide-react";
import { useState } from "react";

import atomicHabitsImg from "@/assets/atomic-habits-book.png";
import deepWorkImg from "@/assets/deep-work-book.png";
import psychologyOfMoneyImg from "@/assets/psychology-of-money-book.png";
import winFriendsImg from "@/assets/win-friends-book.png";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "Business", count: 234 },
    { name: "Psychology", count: 189 },
    { name: "Self-Help", count: 312 },
    { name: "Science", count: 156 },
    { name: "Technology", count: 198 },
    { name: "History", count: 145 },
    { name: "Philosophy", count: 167 },
    { name: "Health", count: 223 },
    { name: "Fiction", count: 456 },
    { name: "Biography", count: 178 },
    { name: "Finance", count: 201 },
    { name: "Leadership", count: 134 }
  ];

  const trendingBooks = [
    { 
      title: "Atomic Habits", 
      author: "James Clear", 
      category: "Self-Help",
      image: atomicHabitsImg,
      rating: 4.8,
      readers: "2.3M"
    },
    { 
      title: "Deep Work", 
      author: "Cal Newport", 
      category: "Productivity",
      image: deepWorkImg,
      rating: 4.7,
      readers: "1.8M"
    },
    { 
      title: "The Psychology of Money", 
      author: "Morgan Housel", 
      category: "Finance",
      image: psychologyOfMoneyImg,
      rating: 4.9,
      readers: "1.5M"
    },
    { 
      title: "How to Win Friends", 
      author: "Dale Carnegie", 
      category: "Self-Help",
      image: winFriendsImg,
      rating: 4.6,
      readers: "3.1M"
    },
  ];

  const newReleases = [
    { 
      title: "Thinking, Fast and Slow", 
      author: "Daniel Kahneman", 
      category: "Psychology",
      rating: 4.5,
      readers: "892K"
    },
    { 
      title: "The Lean Startup", 
      author: "Eric Ries", 
      category: "Business",
      rating: 4.6,
      readers: "1.2M"
    },
    { 
      title: "Sapiens", 
      author: "Yuval Noah Harari", 
      category: "History",
      rating: 4.8,
      readers: "2.7M"
    },
    { 
      title: "The 7 Habits", 
      author: "Stephen Covey", 
      category: "Self-Help",
      rating: 4.7,
      readers: "5.2M"
    },
    { 
      title: "Good to Great", 
      author: "Jim Collins", 
      category: "Business",
      rating: 4.5,
      readers: "1.9M"
    },
    { 
      title: "Meditations", 
      author: "Marcus Aurelius", 
      category: "Philosophy",
      rating: 4.9,
      readers: "1.1M"
    },
  ];

  const editorsPicks = [
    { 
      title: "Man's Search for Meaning", 
      author: "Viktor Frankl", 
      category: "Psychology",
      rating: 4.9,
      readers: "2.1M"
    },
    { 
      title: "Range", 
      author: "David Epstein", 
      category: "Self-Help",
      rating: 4.6,
      readers: "734K"
    },
    { 
      title: "The Innovator's Dilemma", 
      author: "Clayton Christensen", 
      category: "Business",
      rating: 4.4,
      readers: "612K"
    },
    { 
      title: "When Breath Becomes Air", 
      author: "Paul Kalanithi", 
      category: "Biography",
      rating: 4.8,
      readers: "1.4M"
    },
  ];


  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Explore
            </h1>
            <p className="text-muted-foreground text-xl">
              Discover knowledge that transforms your life
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search 10,000+ books, authors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          {/* Categories */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-3xl font-bold">Browse by Category</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {categories.map((category) => (
                <Card
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 text-center hover:bg-primary/10 cursor-pointer transition-all hover:scale-105 ${
                    selectedCategory === category.name ? "bg-primary/10 border-primary" : ""
                  }`}
                >
                  <p className="font-semibold">{category.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{category.count} books</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-3xl font-bold">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingBooks.map((book) => (
                <Card key={book.title} className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer group">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
                    {book.image && (
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <Badge variant="secondary" className="text-xs">{book.category}</Badge>
                    <h3 className="font-bold line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{book.readers} readers</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* New Releases */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-3xl font-bold">New Releases</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newReleases.map((book) => (
                <Card key={book.title} className="p-5 hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex-shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <Badge variant="outline" className="text-xs">{book.category}</Badge>
                      <h3 className="font-bold line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{book.rating}</span>
                        </div>
                        <span>{book.readers} readers</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Editor's Picks */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-3xl font-bold">Editor's Picks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {editorsPicks.map((book) => (
                <Card key={book.title} className="p-5 hover:shadow-lg transition-shadow cursor-pointer space-y-3">
                  <div className="w-full aspect-[2/3] bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-lg" />
                  <Badge className="text-xs">{book.category}</Badge>
                  <div className="space-y-1">
                    <h3 className="font-bold line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{book.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{book.readers}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h3 className="font-serif text-3xl font-bold">Can't find what you're looking for?</h3>
              <p className="text-muted-foreground text-lg">
                Create your own personalized reading plan or request specific book summaries
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="lg">Create Custom Plan</Button>
                <Button size="lg" variant="outline">Request a Book</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Explore;
