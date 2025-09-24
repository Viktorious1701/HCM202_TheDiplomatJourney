import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { Hint } from "@/types";

interface HintNotebookProps {
  hint: Hint;
}

export const HintNotebook = ({ hint }: HintNotebookProps) => {
  return (
    // Styles are updated to fit a non-overlay context, matching the parchment theme.
    <Card className="mt-4 bg-accent/10 text-foreground border-accent/50">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-accent-foreground">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
          {hint.tieuDe}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{hint.vanBan}</p>
      </CardContent>
    </Card>
  );
};
