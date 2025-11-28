import { Input } from "@/components/ui/input";
import { Search, BookOpen, ArrowRight, Loader2, X, Camera, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { retryWithBackoff, isRetryableError, getUserFriendlyErrorMessage } from "@/lib/retry-utils";

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const { data, error } = await retryWithBackoff(
        async () => {
          const response = await supabase.functions.invoke('search-books', {
            body: { query: searchQuery }
          });
          if (response.error) throw response.error;
          return response;
        },
        {
          maxRetries: 3,
          shouldRetry: isRetryableError
        }
      );

      if (error) throw error;

      if (data.books && data.books.length > 0) {
        setSearchResults(data.books);
      } else {
        setSearchResults([]);
        toast.info(`No results found for "${searchQuery}"`);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      const friendlyMessage = getUserFriendlyErrorMessage(error);
      toast.error(friendlyMessage, {
        action: {
          label: "Retry",
          onClick: () => handleSearch()
        }
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-background overflow-x-clip overflow-y-visible">
      <header className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="max-w-lg mx-auto px-6 md:px-4 py-4 md:py-3">
          <h1 className="font-sans font-bold text-3xl md:text-2xl mb-4">Explore</h1>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books, topics..."
                className="pl-10 pr-10 glass-subtle border-white/10 rounded-full h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button
              className="glass-subtle hover:bg-white/15 rounded-full w-11 h-11 p-0 flex items-center justify-center border-white/10"
            >
              <Camera className="h-5 w-5" />
            </Button>
          </div>

          {searchQuery && (
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-11 font-semibold mt-3"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-6 space-y-10 overflow-visible">
        {showResults && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans font-bold text-2xl">Search Results</h2>
              <button
                onClick={clearSearch}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>

            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No books found. Try a different search.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((book) => (
                  <div key={book.googleBooksId} className="relative">
                    <button
                      className="w-full glass-card border-white/10 rounded-2xl p-4 hover:border-primary/30 hover:bg-white/5 transition-all hover:scale-[1.01] flex items-center gap-4"
                    >
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-16 h-24 object-cover rounded-lg shadow-sm flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-24 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}

                      <div className="flex-1 text-left">
                        <h3 className="font-sans font-bold text-base mb-1 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {book.author}
                        </p>
                      </div>

                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Explore;
