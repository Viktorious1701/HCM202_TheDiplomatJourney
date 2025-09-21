import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { Hint } from "@/types";

interface HintNotebookProps {
  hint: Hint;
}

export const HintNotebook = ({ hint }: HintNotebookProps) => {
  return (
    <Card className="mt-6 bg-accent/20 border-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-accent">
          <Lightbulb className="mr-2 h-5 w-5" />
          {hint.tieuDe}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{hint.vanBan}</p>
      </CardContent>
    </Card>
  );
};