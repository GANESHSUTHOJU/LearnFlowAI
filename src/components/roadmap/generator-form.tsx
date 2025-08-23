"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlassCard, CardContent } from "@/components/ui/glass-card";
import { Sparkles } from "lucide-react";
import React from "react";

export default function GeneratorForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const goal = formData.get("goal") as string;
        const skillLevel = formData.get("skillLevel") as string;

        const params = new URLSearchParams();
        params.set("goal", goal);
        params.set("skillLevel", skillLevel);
        router.push(`/roadmap?${params.toString()}`);
    };

    return (
        <GlassCard>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="goal">What is your learning goal?</Label>
                        <Input
                            id="goal"
                            name="goal"
                            placeholder="e.g., 'Become a Full-Stack Web Developer'"
                            required
                            defaultValue={searchParams.get("goal") ?? ""}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="skillLevel">What is your current skill level?</Label>
                        <Select name="skillLevel" defaultValue={searchParams.get("skillLevel") ?? "beginner"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your skill level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">
                        <Sparkles className="mr-2 h-4 w-4" /> Generate Roadmap
                    </Button>
                </form>
            </CardContent>
        </GlassCard>
    );
}
