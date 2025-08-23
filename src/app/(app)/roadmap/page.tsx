import GeneratorForm from "@/components/roadmap/generator-form";
import RoadmapDisplay from "@/components/roadmap/roadmap-display";
import { generatePersonalizedRoadmap } from "@/ai/flows/generate-personalized-roadmap";

export default async function RoadmapPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const goal = typeof searchParams.goal === "string" ? searchParams.goal : undefined;
  const skillLevel = typeof searchParams.skillLevel === "string" ? searchParams.skillLevel : "beginner";

  let roadmapData = null;
  if (goal) {
    try {
      const response = await generatePersonalizedRoadmap({
        goal: goal,
        currentSkillLevel: skillLevel,
        skillOntology: "Web Development: HTML, CSS, JavaScript, React, Node.js, Databases",
      });
      roadmapData = response.roadmap;
    } catch (error) {
      console.error(error);
      roadmapData = "Could not generate roadmap. Please try again.";
    }
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Roadmap Generator</h1>
        <p className="text-muted-foreground">
          Generate a personalized learning roadmap based on your goals.
        </p>
      </div>

      <GeneratorForm />

      {roadmapData && <RoadmapDisplay roadmap={roadmapData} />}
    </div>
  );
}
