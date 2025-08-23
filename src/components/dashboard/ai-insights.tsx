import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "../ui/badge";

const insights = [
  {
    icon: TrendingUp,
    title: "Performance Prediction",
    description: "You're on track to master React in the next 3 weeks.",
    badge: "Positive",
    color: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  {
    icon: AlertTriangle,
    title: "Difficulty Level",
    description: "Consider reviewing JavaScript Promises before proceeding.",
    badge: "Recommendation",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  },
];

export default function AiInsights() {
  return (
    <GlassCard>
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <Lightbulb className="w-6 h-6" />
            </div>
            <div>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Personalized predictions and tips.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-4">
              <insight.icon className={`w-5 h-5 mt-1 ${insight.badge === 'Positive' ? 'text-green-400' : 'text-yellow-400'}`} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{insight.title}</h4>
                   <Badge variant="outline" className={insight.color}>{insight.badge}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
}
