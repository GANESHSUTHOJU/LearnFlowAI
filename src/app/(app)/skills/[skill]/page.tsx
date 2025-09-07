
import SkillView from "@/components/skills/skill-view";
import type { Metadata } from "next";

const skillDetails: { [key: string]: { name: string, description: string } } = {
  "web-development": { name: "Web Development", description: "Courses to help you master HTML, CSS, JavaScript, React, and Node.js." },
  "data-science": { name: "Data Science", description: "Courses to learn Python, Pandas, and machine learning algorithms." },
  "ai-machine-learning": { name: "AI & Machine Learning", description: "Courses to dive into neural networks, NLP, and computer vision." },
  "database-management": { name: "Database Management", description: "Courses to explore SQL, NoSQL, and database design principles." },
  "ui-ux-design": { name: "UI/UX Design", description: "Courses to create stunning user interfaces and experiences." },
  "backend-systems": { name: "Backend Systems", description: "Courses to build robust server-side applications and APIs." },
};

export async function generateMetadata({ params }: { params: { skill: string } }): Promise<Metadata> {
  const skill = params.skill;
  const skillInfo = skillDetails[skill] || { name: "Courses", description: "Explore the available courses." };
  
  return {
    title: `${skillInfo.name} Courses`,
    description: skillInfo.description,
  }
}

export default function SkillPage({ params }: { params: { skill: string } }) {
  const skill = params.skill;
  
  return <SkillView skill={skill} />;
}
