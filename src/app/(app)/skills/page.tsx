import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

const popularSkills = [
  "React",
  "Python",
  "Machine Learning",
  "Data Science",
  "Next.js",
  "TypeScript",
  "Graphic Design",
  "Project Management",
  "Public Speaking",
  "Creative Writing",
  "Sourdough Baking",
  "Kubernetes"
];

export default function SkillsPage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
            Explore Skills
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse our catalog of skills and find your next learning adventure.
          </p>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for a skill..."
            className="pl-10 text-base h-12"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularSkills.map((skill) => (
            <Link href={`/skills/${encodeURIComponent(skill)}`} key={skill}>
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 h-full">
                <CardHeader>
                  <CardTitle>{skill}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Start your journey to master {skill} today.
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
