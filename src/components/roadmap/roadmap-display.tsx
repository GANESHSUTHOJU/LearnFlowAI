"use client";

import { motion } from "framer-motion";
import { marked } from "marked";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import type { Roadmap } from "@/ai/flows/generate-personalized-roadmap";

interface RoadmapDisplayProps {
  roadmap: Roadmap;
  onTakeQuiz: (topic: string) => void;
  onStartProject: (topic: string) => void;
}

export function RoadmapDisplay({
  roadmap,
  onTakeQuiz,
  onStartProject,
}: RoadmapDisplayProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Your Roadmap to Mastering {roadmap.title}
        </h1>
        <div
          className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: marked(roadmap.introduction) }}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Accordion type="single" collapsible defaultValue="item-0">
          {roadmap.steps.map((step, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <span>{step.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: marked(step.description),
                  }}
                />
                <div className="mt-4">
                  <h4 className="font-semibold text-md mb-2">
                    Key Concepts:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {step.keyConcepts.map((concept, i) => (
                      <Badge key={i} variant="secondary">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-md mb-3">
                    Recommended Resources:
                  </h4>
                  <div className="space-y-3">
                    {step.resources.map((resource, rIndex) => (
                      <a
                        key={rIndex}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-secondary/50 rounded-md transition-colors hover:bg-secondary"
                      >
                        <div className="flex-grow">
                          <p className="font-medium text-primary">
                            {resource.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="p-6 bg-secondary rounded-lg text-center"
      >
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold">You've got a plan!</h3>
        <div
          className="mt-2 max-w-2xl mx-auto text-muted-foreground prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: marked(roadmap.conclusion) }}
        />
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onTakeQuiz(roadmap.title)}>
                Test Your Knowledge
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onStartProject(roadmap.title)}>
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
