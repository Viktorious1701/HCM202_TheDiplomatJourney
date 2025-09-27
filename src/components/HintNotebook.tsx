import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { Hint } from "@/types";

interface HintNotebookProps {
  hint: Hint;
}

export const HintNotebook = ({ hint }: HintNotebookProps) => {
  return (
    // Changed the default text color from 'foreground' (black) to a distinct sepia brown.
    <Card className="mt-4 bg-accent/10 text-[#5a412e] border-accent/50">
      <CardHeader>
        {/* The title now uses a darker brown for better contrast and emphasis. */}
        <CardTitle className="flex items-center text-lg text-[#443122]">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
          {hint.tieuDe}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* The main hint text also uses the new sepia brown color, removing the muted style. */}
        <p className="text-[#5a412e]">{hint.vanBan}</p>
      </CardContent>
    </Card>
  );
};
