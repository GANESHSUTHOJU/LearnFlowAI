import SkillView from "@/components/skills/skill-view";

export default function SkillPage({ params }: { params: { skill: string } }) {
    return (
      <main className="container mx-auto p-4 md:p-8">
        <SkillView skillId={decodeURIComponent(params.skill)} />
      </main>
    );
  }
  
