import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Idea saved successfully!");
    setTitle("");
    setContent("");
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-bold">Create</h1>
            <p className="text-muted-foreground text-lg">
              Capture your thoughts and ideas
            </p>
          </div>

          {/* Create Form */}
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your idea a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your thoughts here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>

              <Button type="submit" className="w-full">
                Save Idea
              </Button>
            </form>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold mb-2">💡 Tips for capturing ideas</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Write freely - don't worry about perfection</li>
              <li>• Include context and examples</li>
              <li>• Connect ideas from different books</li>
              <li>• Review and refine your ideas regularly</li>
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
