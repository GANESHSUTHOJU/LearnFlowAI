"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const popularSkills = [
  "React",
  "Python for Data Science",
  "Machine Learning",
  "DevOps Engineering",
  "Next.js",
  "TypeScript",
  "C++ Game Development",
  "Graphic Design",
  "Project Management",
  "Public Speaking",
  "Creative Writing",
  "Sourdough Baking",
  "Kubernetes",
  "Filmmaking and Cinematography",
  "Mechanical Engineering Basics",
  "Mobile App Marketing",
  "Financial Modeling",
  "Ethical Hacking",
];

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState(popularSkills);
  const router = useRouter();

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = popularSkills.filter(skill =>
      skill.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredSkills(filtered);
  }, [searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if(searchQuery && filteredSkills.length === 0){
        handleCreateRoadmap();
      }
    }
  };

  const handleCreateRoadmap = () => {
    router.push(`/roadmap?topic=${encodeURIComponent(searchQuery)}`);
  };

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
            placeholder="Search for a skill and press Enter..."
            className="pl-10 text-base h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
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

        {filteredSkills.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No skills found for &quot;{searchQuery}&quot;</h3>
            <p className="mt-2 text-muted-foreground">
              But you can create a personalized learning roadmap for it!
            </p>
            <Button className="mt-4" onClick={handleCreateRoadmap}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Roadmap for {searchQuery}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
