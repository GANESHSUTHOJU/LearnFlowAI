import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Code, Database, Bot, PenTool, BarChart, Server } from "lucide-react";

const skillCategories = [
  {
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript, React, and Node.js.",
    icon: Code,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10"
  },
  {
    title: "Data Science",
    description: "Learn Python, Pandas, and machine learning algorithms.",
    icon: BarChart,
    color: "text-green-400",
    bgColor: "bg-green-400/10"
  },
  {
    title: "AI & Machine Learning",
    description: "Dive into neural networks, NLP, and computer vision.",
    icon: Bot,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    title: "Database Management",
    description: "Explore SQL, NoSQL, and database design principles.",
    icon: Database,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10"
  },
  {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences.",
    icon: PenTool,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10"
  },
  {
    title: "Backend Systems",
    description: "Build robust server-side applications and APIs.",
    icon: Server,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10"
  },
];

export default function SkillsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Skill Catalog</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive list of skills and learning resources.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <GlassCard key={category.title} className="hover:border-accent transition-colors duration-300 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{category.description}</CardDescription>
            </CardContent>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
