import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BRAND_CLASSES } from "@/lib/colors";
import { fadeInUp, fadeInScale, staggerContainer, defaultTransition, hoverLift } from "@/lib/animations";
import { useScrollAnimation, useReducedMotion } from "@/lib/useAnimations";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Google Books Integration",
    pro: 0,
    description:
      "Automatically fetch book metadata, covers, and descriptions. Search millions of books and add them to your library instantly.",
  },
  {
    title: "Advanced Reading Analytics",
    pro: 1,
    description:
      "Get detailed insights into your reading patterns, speed, and preferences with comprehensive analytics and data visualization.",
  },
  {
    title: "Book Club Features",
    pro: 1,
    description:
      "Create and join reading groups, participate in discussions, and share reading progress with fellow book enthusiasts.",
  },
  {
    title: "Smart Reading Reminders",
    pro: 1,
    description:
      "Set custom reading goals and receive intelligent notifications to help you maintain consistent reading habits.",
  },
];

export const ServicesSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="container py-24 sm:py-32" ref={ref}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={prefersReducedMotion ? { duration: 0 } : defaultTransition}
      >
        <h2
          className={`text-lg ${BRAND_CLASSES.primary.text} text-center mb-2 tracking-wider`}
        >
          Integrations
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Powerful Reading Tools
        </h2>
        <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-16">
          Connect with your favorite book platforms and unlock advanced features
          to enhance your reading journey.
        </h3>
      </motion.div>
      
      <motion.div 
        className="grid lg:grid-cols-2 gap-4 w-full lg:gap-x-20"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {serviceList.map(({ title, description, pro }, index) => (
          <motion.div
            key={title}
            variants={fadeInScale}
            transition={prefersReducedMotion ? { duration: 0 } : { ...defaultTransition, delay: index * 0.1 }}
            whileHover={prefersReducedMotion ? {} : hoverLift}
          >
            <Card
              className="bg-muted/60 dark:bg-card h-full relative"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="mb-2">{title}</CardTitle>
                  {pro === ProService.YES && (
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    >
                      <Badge
                        variant="secondary"
                        className={`${BRAND_CLASSES.primary.bg} text-primary-foreground`}
                      >
                        PRO
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

