import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";

interface AppCardProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  type?: "card" | "accordion";
}

const AppCard = ({ title = '', type = 'card', content = '' }: AppCardProps) => {
  return (
    <Card>
      {type === "card" ? (
        <>
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>{content}</CardContent>
        </>
      ) : (
        <CardContent className="pb-0">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
    </Card>
  );
};

export default AppCard;
