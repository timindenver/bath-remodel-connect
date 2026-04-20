import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Do I have to commit to anything?",
    a: "No. Our contractor will provide a free, no-obligation fixed price that is good for one year. This will require a home visit to measure the space, inspect the plumbing, and allow you to touch and feel samples and select the finishes that you like.",
  },
  {
    q: "How fast will someone follow up?",
    a: "Your matched contractor will call or text — usually within 60 minutes during working hours, or first thing the next business day.",
  },
  {
    q: "Do you serve my area?",
    a: "If you're seeing this web page, then yes — we serve your area.",
  },
  {
    q: "Why do you ask for my phone number?",
    a: "We want you to know that we're real people serving local homeowners. Most of our customers appreciate the live human outreach.",
  },
  {
    q: "How does installer matching work?",
    a: "Not just any contractor can install solid surface materials like this. It's a specialized install that requires the proper waterproofing, specialized tools and equipment, as well as certifications that mean they've been trained for this work. As an industry advocate group, we make sure you're connected with pros who do this every day.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground text-balance">
            Quick answers to what homeowners ask us most.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-border rounded-lg mb-3 px-4 sm:px-5 bg-card"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
