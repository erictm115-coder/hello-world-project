import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Sparkles } from "lucide-react";

const Create = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaContent, setIdeaContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartWriting = () => {
    if (!user) {
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!user) return;

    if (!ideaTitle.trim() || !ideaContent.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('user_ideas' as any)
        .insert({
          user_id: user.id,
          idea_title: ideaTitle,
          idea_content: ideaContent,
          status: 'approved'
        });

      if (error) throw error;

      setIdeaTitle("");
      setIdeaContent("");
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting idea:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen pb-20 md:pb-8 px-6 md:px-4 pt-8 md:pt-6">
        <div className="max-w-md w-full mx-auto">
          <Button
            variant="ghost"
            onClick={() => setShowForm(false)}
            className="mb-6"
          >
            ← Back
          </Button>

          <h1 className="font-serif font-bold text-3xl mb-2">
            Share Your Idea
          </h1>

          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6 flex gap-3">
            <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Your idea will be instantly shared with the community in the Explore tab!
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Idea Title *
              </label>
              <Input
                placeholder="e.g., The Power of Morning Routines"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                className="h-12"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {ideaTitle.length}/100 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Your Idea *
              </label>
              <Textarea
                placeholder="Share your insight, lesson learned, or wisdom..."
                value={ideaContent}
                onChange={(e) => setIdeaContent(e.target.value)}
                className="min-h-[200px] resize-none"
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {ideaContent.length}/1000 characters
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !ideaTitle.trim() || !ideaContent.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Idea"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8 flex items-center justify-center px-6 md:px-4">
      <div className="max-w-md w-full text-center animate-scale-pop">
        <h1 className="font-sans font-bold text-3xl mb-6 whitespace-nowrap">
          Create Your Own Ideas
        </h1>

        <p className="text-muted-foreground mb-6 text-lg">
          Don't just read to remember — share your insights
        </p>

        <div className="space-y-3">
          <Button
            onClick={handleStartWriting}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 font-semibold"
          >
            Start Writing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
