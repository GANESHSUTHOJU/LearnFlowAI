
"use client";

import { useState } from "react";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Code, Database, Bot, PenTool, BarChart, Server, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const skillCategories = [
  {
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript, React, and Node.js.",
    icon: Code,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    slug: "web-development"
  },
  {
    title: "Data Science",
    description: "Learn Python, Pandas, and machine learning algorithms.",
    icon: BarChart,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    slug: "data-science"
  },
  {
    title: "AI & Machine Learning",
    description: "Dive into neural networks, NLP, and computer vision.",
    icon: Bot,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    slug: "ai-machine-learning"
  },
  {
    title: "Database Management",
    description: "Explore SQL, NoSQL, and database design principles.",
    icon: Database,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    slug: "database-management"
  },
  {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences.",
    icon: PenTool,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    slug: "ui-ux-design"
  },
  {
    title: "Backend Systems",
    description: "Build robust server-side applications and APIs.",
    icon: Server,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    slug: "backend-systems"
  },
];

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = skillCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Skill Catalog</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive list of skills and learning resources.
        </p>
      </div>

       <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for a skill..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((category) => (
            <Link href={`/skills/${category.slug}`} key={category.title} className="group">
              <GlassCard 
                className="h-full hover:border-accent transition-colors duration-300 cursor-pointer"
              >
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
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center col-span-full py-12">
            <p className="text-muted-foreground">No skills found matching your search.</p>
        </div>
      )}
    </div>
  );
}
