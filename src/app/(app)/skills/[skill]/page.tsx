import SkillView from "@/components/skills/skill-view";
import YouTubeVideos from "@/components/skills/youtube-videos";

export default function SkillPage({ params }: { params: { skill: string } }) {
    const skillId = decodeURIComponent(params.skill);
    return (
      <main className="container mx-auto p-4 md:p-8 space-y-8">
        <SkillView skillId={skillId} />
        <YouTubeVideos skillName={skillId} />
      </main>
    );
  }
  
