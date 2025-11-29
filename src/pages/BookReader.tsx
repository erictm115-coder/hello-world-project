import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { useState } from "react";

const BookReader = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 250;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentPage / totalPages) * 100}%` }}
              />
            </div>
          </div>

          {/* Book Content */}
          <Card className="p-8 min-h-[500px]">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-bold mb-2">
                    Atomic Habits
                  </h1>
                  <p className="text-muted-foreground">James Clear</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="font-serif text-2xl font-bold mb-4">
                  Chapter {Math.ceil(currentPage / 10)}
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  The key to building lasting habits is focusing on creating a new identity first. 
                  Your current behaviors are simply a reflection of your current identity. 
                  What you do now is a mirror image of the type of person you believe that you are.
                </p>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  To change your behavior for good, you need to start believing new things about yourself. 
                  You need to build identity-based habits. The key to building lasting habits is 
                  focusing on creating a new identity first.
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  Imagine two people resisting a cigarette. When offered a smoke, the first person says, 
                  "No thanks. I'm trying to quit." It sounds like a reasonable response, but this person 
                  still believes they are a smoker who is trying to be something else.
                </p>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookReader;
