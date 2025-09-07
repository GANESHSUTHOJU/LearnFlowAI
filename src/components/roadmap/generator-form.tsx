"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRoadmap, Roadmap } from "@/ai/flows/roadmap-flow";

interface GeneratorFormProps {
  onRoadmapGenerated: (roadmap: Roadmap) => void;
  onLoadingChange: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

export default function GeneratorForm({
  onRoadmapGenerated,
  onLoadingChange,
  onError,
}: GeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    onLoadingChange(true);
    onError(null);
    try {
      const result = await generateRoadmap(topic);
      onRoadmapGenerated(result);
    } catch (e) {
      console.error("Error generating roadmap:", e);
      onError("Sorry, I had trouble generating that roadmap. Please try again.");
    } finally {
      setLoading(false);
      onLoadingChange(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., 'Learn React Native' or 'Master Sourdough Baking'"
        className="flex-grow text-base"
        disabled={loading}
        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
      />
      <Button onClick={handleGenerate} disabled={loading || !topic} size="lg">
        {loading ? "Generating..." : "Generate Roadmap"}
      </Button>
    </div>
  );
}
