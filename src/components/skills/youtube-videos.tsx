import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import Image from "next/image";

interface YouTubeVideosProps {
  skillName: string;
}

// Placeholder data - in a real app, you'd fetch this from the YouTube API
const getPlaceholderVideos = (skillName: string) => [
  {
    id: "1",
    title: `Ultimate Beginner's Guide to ${skillName}`,
    thumbnail: "https://picsum.photos/400/225?random=1",
    dataAiHint: "tech tutorial",
    url: "https://www.youtube.com",
    channel: "Learn Everything Fast",
  },
  {
    id: "2",
    title: `10 Advanced ${skillName} Tricks You Should Know`,
    thumbnail: "https://picsum.photos/400/225?random=2",
    dataAiHint: "abstract concept",
    url: "https://www.youtube.com",
    channel: "Pro Coder",
  },
  {
    id: "3",
    title: `Full ${skillName} Project Tutorial (Build a Real App)`,
    thumbnail: "https://picsum.photos/400/225?random=3",
    dataAiHint: "code screen",
    url: "https://www.youtube.com",
    channel: "DevSimplified",
  },
   {
    id: "4",
    title: `A Day in the Life of a ${skillName} Engineer`,
    thumbnail: "https://picsum.photos/400/225?random=4",
    dataAiHint: "person thinking",
    url: "https://www.youtube.com",
    channel: "TechLead",
  },
];

const YouTubeVideos = ({ skillName }: YouTubeVideosProps) => {
  const videos = getPlaceholderVideos(skillName);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="h-6 w-6 text-red-600" />
          <span>Recommended YouTube Videos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <a href={video.url} target="_blank" rel="noopener noreferrer" key={video.id} className="group">
              <Card className="overflow-hidden h-full transition-shadow duration-200 group-hover:shadow-lg">
                <div className="aspect-video relative">
                    <Image 
                        src={video.thumbnail} 
                        alt={video.title} 
                        fill
                        data-ai-hint={video.dataAiHint}
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                </div>
                <div className="p-4">
                  <p className="font-semibold leading-tight group-hover:text-primary">{video.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{video.channel}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeVideos;
