import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { Hint } from "@/types";

interface HintNotebookProps {
  hint: Hint;
}

export const HintNotebook = ({ hint }: HintNotebookProps) => {
  return (
    // The hint card is now styled with a semi-transparent dark background to match the visual novel aesthetic.
    <Card className="mt-4 bg-black/70 backdrop-blur-md text-white border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-yellow-400">
          <Lightbulb className="mr-2 h-5 w-5" />
          {hint.tieuDe}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/90">{hint.vanBan}</p>
      </CardContent>
    </Card>
  );
};
