import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Hva kan jeg snakke med helsesykepleier om?",
    answer: "Du kan snakke med oss om alt som har med din helse å gjøre. Dette inkluderer psykisk helse (stress, angst, depresjon), fysisk helse, seksualitet, prevensjon, testing for kjønnssykdommer, søvnproblemer, spiseutfordringer, eller andre ting som opptar deg.",
  },
  {
    question: "Er samtalen med helsesykepleier konfidensiell?",
    answer: "Ja, alt du forteller oss er konfidensielt. Vi har taushetsplikt, og det du forteller oss blir ikke delt med andre uten ditt samtykke. Unntaket er hvis vi er bekymret for din sikkerhet eller andre lovpålagte unntak.",
  },
  {
    question: "Hvordan bestiller jeg time?",
    answer: "Du kan bestille time ved å sende en SMS med navn og fødselsdato til en av helsesykepleierne. Marianne Buvik: 902 69 665, Hanne Krøtøy: 912 48 594. Du kan også bruke booking-funksjonen på denne nettsiden.",
  },
  {
    question: "Koster det noe å snakke med helsesykepleier?",
    answer: "Nei, det er helt gratis å bruke skolehelsetjenesten. Dette er en tjeneste som tilbys alle elever ved Hamar katedralskole.",
  },
  {
    question: "Må foreldrene mine vite at jeg har vært hos dere?",
    answer: "Nei, du kan komme til oss uten at foreldrene dine trenger å vite det. Som elev har du rett til å snakke med oss konfidensielt. Vi oppfordrer likevel til åpenhet hjemme dersom det er mulig.",
  },
  {
    question: "Kan jeg teste meg for kjønnssykdommer hos dere?",
    answer: "Ja, vi tilbyr testing for kjønnssykdommer. Du kan bestille time for testing, og alt foregår diskret og konfidensielt.",
  },
  {
    question: "Hvor finner jeg skolehelsetjenesten?",
    answer: "Du finner oss i 3. etasje i fløy 1 ved Elevtjenesten. Bare kom innom i åpningstidene eller bestill time på forhånd.",
  },
  {
    question: "Hva gjør jeg hvis jeg trenger hjelp utenom åpningstidene?",
    answer: "Hvis du trenger akutt hjelp, ring 113 (medisinsk nødhjelp) eller 116 123 (Mental Helses hjelpetelefon). Du kan også kontakte legevakten i Hamar.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ofte stilte spørsmål
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Her finner du svar på de vanligste spørsmålene om skolehelsetjenesten.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-4 bg-card"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-foreground font-medium pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
