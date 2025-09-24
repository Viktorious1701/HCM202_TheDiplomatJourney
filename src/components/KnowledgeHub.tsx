import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import knowledgeData from '@/data/knowledgeHub.json';

export function KnowledgeHub() {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-2">Notebook: Core Concepts</h3>
      <Accordion type="single" collapsible className="w-full">
        {knowledgeData.map((chapter) => (
          // Apply the themed classes to the Accordion components.
          <AccordionItem value={chapter.id} key={chapter.id} className="themed-accordion-item">
            <AccordionTrigger className="text-left themed-accordion-trigger">{chapter.title}</AccordionTrigger>
            <AccordionContent className="bg-muted/30 p-4 rounded-b-md">
              <p className="text-xs italic text-muted-foreground mb-4">{chapter.summary}</p>
              <div className="space-y-3">
                {chapter.sections.map((section) => (
                  <div key={section.id} className="text-xs">
                    <h5 className="font-semibold text-foreground">{section.title}</h5>
                    <p className="mt-1"><span className="font-medium text-primary/80">Main Idea:</span> {section.mainIdea}</p>
                    <p className="mt-1"><span className="font-medium text-primary/80">Message:</span> {section.message}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
