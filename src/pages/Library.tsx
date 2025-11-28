import { User, BookMarked, Heart, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Helper function to generate consistent read count from book title
const getReadCount = (title: string): string => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash) + title.charCodeAt(i);
    hash = hash & hash;
  }
  const count = Math.abs(hash % 99) + 1;

  if (count > 10) {
    return `${(count / 10).toFixed(1)}k`;
  }
  return `${count}k`;
};

interface SavedIdea {
  id: string;
  book_title: string;
  idea_title: string;
  idea_explanation: string;
  idea_image_url?: string;
  created_at: string;
}

interface SavedBook {
  id: string;
  book_title: string;
  book_author: string;
  book_cover?: string;
  book_description?: string;
  book_full_description?: string;
  book_background?: string;
  book_impact?: string;
  created_at: string;
}

const Library = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"favorites" | "read-later">("favorites");
  const [selectedIdea, setSelectedIdea] = useState<SavedIdea | null>(null);
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null);
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  useEffect(() => {
    fetchSavedIdeas();
    fetchSavedBooks();
  }, [user]);

  const fetchSavedIdeas = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedIdeas(data || []);
    } catch (error) {
      console.error('Error fetching saved ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedBooks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_books')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedBooks(data || []);
    } catch (error) {
      console.error('Error fetching saved books:', error);
    }
  };

  const handleDeleteIdea = async (ideaId: string) => {
    try {
      const { error } = await supabase
        .from('saved_ideas')
        .delete()
        .eq('id', ideaId);

      if (error) throw error;
      setSavedIdeas(savedIdeas.filter(idea => idea.id !== ideaId));
      setSwipedItemId(null);
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      const { error } = await supabase
        .from('saved_books')
        .delete()
        .eq('id', bookId);

      if (error) throw error;
      setSavedBooks(savedBooks.filter(book => book.id !== bookId));
      setSwipedItemId(null);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent, itemId: string) => {
    touchCurrentX.current = e.touches[0].clientX;
    const diff = touchStartX.current - touchCurrentX.current;

    if (diff > 50) {
      setSwipedItemId(itemId);
    } else if (diff < -20) {
      setSwipedItemId(null);
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="max-w-lg mx-auto px-6 md:px-4 py-5 md:py-3">
          <h1 className="font-serif font-bold text-3xl md:text-2xl tracking-tight">Library</h1>
          <p className="text-sm md:text-xs text-muted-foreground mt-1.5 md:mt-1 font-medium">
            {savedIdeas.length} {savedIdeas.length === 1 ? 'idea' : 'ideas'} • Synced
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 md:px-4 py-8 md:py-6">
        <section className="mb-10">
          <h2 className="font-serif font-bold text-2xl mb-5 tracking-tight">My Stashes</h2>

          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={() => setActiveTab("read-later")}
              className={`relative aspect-square rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] ${
                activeTab === "read-later" ? "ring-2 ring-primary ring-offset-4 ring-offset-background shadow-glow" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/30" />
              <div className="relative z-10 flex justify-end -mr-2">
                <BookMarked className="h-9 w-9 text-white drop-shadow-lg" />
              </div>
              <div className="text-white relative z-10">
                <p className="font-bold text-lg mb-1">Read Later</p>
                <p className="text-sm opacity-95 font-medium">{savedBooks.length} books</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`relative aspect-square rounded-3xl overflow-hidden p-6 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02] ${
                activeTab === "favorites" ? "ring-2 ring-red-500 ring-offset-4 ring-offset-background shadow-glow" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 to-red-600/30" />
              <div className="relative z-10 flex justify-end -mr-2">
                <Heart className="h-9 w-9 text-white drop-shadow-lg" />
              </div>
              <div className="text-white relative z-10">
                <p className="font-bold text-lg mb-1">Favorites</p>
                <p className="text-sm opacity-95 font-medium">{savedIdeas.length} ideas</p>
              </div>
            </button>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !user ? (
          <section className="mt-12 text-center py-12">
            <h3 className="font-sans font-bold text-2xl mb-2">Sign in to view your library</h3>
            <p className="text-muted-foreground mb-6">Save ideas and access them across devices</p>
            <Button
              onClick={() => navigate("/onboarding/auth-final")}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
            >
              Sign In
            </Button>
          </section>
        ) : activeTab === "favorites" && savedIdeas.length === 0 ? (
          <section className="mt-12 text-center py-12">
            <h3 className="font-sans font-bold text-2xl mb-2">No Favorites Yet</h3>
            <p className="text-muted-foreground mb-6">Save ideas by tapping the heart icon while reading</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
            >
              Start Reading
            </Button>
          </section>
        ) : activeTab === "read-later" && savedBooks.length === 0 ? (
          <section className="mt-12 text-center py-12">
            <h3 className="font-sans font-bold text-2xl mb-2">No Books Saved</h3>
            <p className="text-muted-foreground">Tap the bookmark icon while browsing to save books here</p>
          </section>
        ) : null}
      </main>

      {selectedIdea && (
        <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-6" onClick={() => setSelectedIdea(null)}>
          <div className="max-w-lg w-full max-h-[85vh] bg-card rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-y-auto max-h-[85vh] p-6">
              <button
                onClick={() => setSelectedIdea(null)}
                className="mb-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {selectedIdea.idea_image_url && (
                <img
                  src={selectedIdea.idea_image_url}
                  alt={selectedIdea.idea_title}
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
              )}

              <h2 className="font-sans font-bold text-2xl mb-2">
                {selectedIdea.idea_title}
              </h2>

              <p className="text-sm text-muted-foreground mb-6">
                from {selectedIdea.book_title}
              </p>

              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedIdea.idea_explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
