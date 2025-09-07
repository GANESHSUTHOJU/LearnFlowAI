// This is a placeholder for a specific skill page.
// You can fetch skill data based on the `params.skill` and display it here.

export default function SkillPage({ params }: { params: { skill: string } }) {
    return (
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold">Skill: {decodeURIComponent(params.skill)}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Detailed information about the skill will be displayed here.
        </p>
      </main>
    );
  }
  
