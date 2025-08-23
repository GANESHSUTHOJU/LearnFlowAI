
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, BarChart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Placeholder data - this would eventually come from a database
const courses: { [key: string]: any[] } = {
  "web-development": [
    {
      title: "React for Beginners",
      description: "Learn the fundamentals of React and build your first application.",
      duration: "4h 30m",
      level: "Beginner",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "abstract geometric"
    },
    {
      title: "Advanced CSS and Sass",
      description: "Take your CSS skills to the next level with advanced techniques.",
      duration: "6h 15m",
      level: "Intermediate",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "abstract colorful"
    },
     {
      title: "Full-Stack with Next.js",
      description: "Build a complete full-stack application using the Next.js framework.",
      duration: "12h",
      level: "Advanced",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "abstract dark"
    },
  ],
  "data-science": [
    {
      title: "Introduction to Python for Data Science",
      description: "Get started with Python and the libraries you need for data analysis.",
      duration: "5h",
      level: "Beginner",
       imageUrl: "https://placehold.co/600x400.png",
      imageHint: "python logo"
    },
  ],
  "ai-machine-learning": [
    {
      title: "Neural Networks and Deep Learning",
      description: "An introduction to the foundational concepts of neural networks.",
      duration: "8h",
      level: "Intermediate",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "neural network"
    },
     {
      title: "Natural Language Processing with Transformers",
      description: "Understand and build models that can process and understand human language.",
      duration: "10h",
      level: "Advanced",
      imageUrl: "https://placehold.co/600x400.png",
      imageHint: "natural language"
    },
  ],
  "database-management": [
      {
          title: "SQL for Beginners",
          description: "Learn the basics of SQL for database manipulation.",
          duration: "4h",
          level: "Beginner",
          imageUrl: "https://placehold.co/600x400.png",
          imageHint: "database server"
      },
      {
          title: "NoSQL Databases Explained",
          description: "Explore the world of NoSQL with MongoDB and others.",
          duration: "6h",
          level: "Intermediate",
          imageUrl: "https://placehold.co/600x400.png",
          imageHint: "database cluster"
      }
  ],
  "ui-ux-design": [
      {
          title: "Figma for UI/UX Design",
          description: "Learn how to design and prototype with Figma.",
          duration: "7h",
          level: "Beginner",
          imageUrl: "https://placehold.co/600x400.png",
          imageHint: "design wireframe"
      },
      {
          title: "User Research and Usability Testing",
          description: "Master the techniques for effective user research.",
          duration: "5h",
          level: "Intermediate",
          imageUrl: "https://placehold.co/600x400.png",
          imageHint: "user feedback"
      }
  ],
  "backend-systems": [
      {
          title: "Building RESTful APIs with Node.js and Express",
          description: "Create robust and scalable APIs from scratch.",
          duration: "9h",
          level: "Intermediate",
          imageUrl: "https://placehold.co/600x400.png",
          imageHint: "server code"
      },
      {
          title: "Microservices Architecture",
          description: "Learn how to design and build microservices-based applications.",
          duration: "11h",
          level: "Advanced",
          imageUrl: "https://placehold.co/600x400.png",
          imageHint: "cloud infrastructure"
      }
  ]
};

const skillDetails: { [key: string]: { name: string, description: string } } = {
  "web-development": { name: "Web Development", description: "Courses to help you master HTML, CSS, JavaScript, React, and Node.js." },
  "data-science": { name: "Data Science", description: "Courses to learn Python, Pandas, and machine learning algorithms." },
  "ai-machine-learning": { name: "AI & Machine Learning", description: "Courses to dive into neural networks, NLP, and computer vision." },
  "database-management": { name: "Database Management", description: "Courses to explore SQL, NoSQL, and database design principles." },
  "ui-ux-design": { name: "UI/UX Design", description: "Courses to create stunning user interfaces and experiences." },
  "backend-systems": { name: "Backend Systems", description: "Courses to build robust server-side applications and APIs." },
};

export default async function SkillCoursesPage({ params }: { params: { skill: string } }) {
  const skillInfo = skillDetails[params.skill] || { name: "Courses", description: "Explore the available courses." };
  const courseList = courses[params.skill] || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{skillInfo.name}</h1>
        <p className="text-muted-foreground">{skillInfo.description}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courseList.length > 0 ? (
          courseList.map((course) => (
            <GlassCard key={course.title} className="flex flex-col">
              <CardContent className="p-0">
                <Image 
                  src={course.imageUrl} 
                  alt={course.title}
                  width={600}
                  height={400}
                  className="rounded-t-lg object-cover"
                  data-ai-hint={course.imageHint}
                />
              </CardContent>
              <div className="p-6 flex flex-col flex-1">
                <CardHeader className="p-0">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="pt-2">{course.description}</CardDescription>
                </CardHeader>
                <div className="flex-grow" />
                <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="w-4 h-4" />
                    <span>{course.level}</span>
                  </div>
                </div>
                 <Button className="w-full mt-4 group" asChild>
                  <Link href="#">
                    Start Course <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          ))
        ) : (
          <div className="col-span-full min-h-[40vh] flex flex-col items-center justify-center text-center">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No courses available for this skill yet. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
