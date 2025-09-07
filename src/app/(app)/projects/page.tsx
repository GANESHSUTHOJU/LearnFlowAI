import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "React Native Mobile App",
    description: "A cross-platform app for tracking personal habits.",
    tags: ["React Native", "Firebase"],
  },
  {
    title: "Sourdough Baking Mastery",
    description: "A web app to store and scale sourdough recipes.",
    tags: ["Next.js", "AI", "Vercel"],
  },
  {
    title: "Data Visualization Dashboard",
    description: "A dashboard for visualizing sales data with interactive charts.",
    tags: ["React", "D3.js", "TypeScript"],
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            My Projects
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Apply your skills to real-world projects.
          </p>
        </div>
        <Button asChild>
          <Link href="/roadmap">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="flex flex-col hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
          >
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="#">View Project</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
