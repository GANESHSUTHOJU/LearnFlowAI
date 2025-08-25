
"use client";

import { useState, useEffect } from "react";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Code, Database, Bot, PenTool, BarChart, Server, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSkillBanner } from "@/ai/flows/generate-skill-banner";

const skillCategories = [
  {
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript, React, and Node.js.",
    icon: Code,
    slug: "web-development"
  },
  {
    title: "Data Science",
    description: "Learn Python, Pandas, and machine learning algorithms.",
    icon: BarChart,
    slug: "data-science"
  },
  {
    title: "AI & Machine Learning",
    description: "Dive into neural networks, NLP, and computer vision.",
    icon: Bot,
    slug: "ai-machine-learning"
  },
  {
    title: "Database Management",
    description: "Explore SQL, NoSQL, and database design principles.",
    icon: Database,
    slug: "database-management"
  },
  {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences.",
    icon: PenTool,
    slug: "ui-ux-design"
  },
  {
    title: "Backend Systems",
    description: "Build robust server-side applications and APIs.",
    icon: Server,
    slug: "backend-systems"
  },
];

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bannerImages, setBannerImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      setIsLoading(true);
      const imagePromises = skillCategories.map(category => 
        generateSkillBanner({ skillTitle: category.title })
          .then(result => ({ slug: category.slug, url: result.imageDataUri }))
          .catch(() => ({ slug: category.slug, url: 'https://placehold.co/600x200.png' })) // Fallback
      );
      
      const results = await Promise.all(imagePromises);
      const imageMap = results.reduce((acc, result) => {
        acc[result.slug] = result.url;
        return acc;
      }, {} as Record<string, string>);

      setBannerImages(imageMap);
      setIsLoading(false);
    };

    fetchBanners();
  }, []);

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
                className="h-full hover:border-accent transition-all duration-300 cursor-pointer flex flex-col"
              >
                <CardContent className="p-0">
                  {isLoading ? (
                    <Skeleton className="h-40 w-full rounded-t-lg" />
                  ) : (
                    <Image
                      src={bannerImages[category.slug] || "https://placehold.co/600x200.png"}
                      alt={`${category.title} banner`}
                      width={600}
                      height={200}
                      className="rounded-t-lg object-cover w-full h-40"
                    />
                  )}
                </CardContent>
                <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
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
