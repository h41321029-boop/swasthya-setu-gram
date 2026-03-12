import { useState } from "react";
import { Heart, MessageCircle, Play, Phone, ArrowLeft, ThumbsUp, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { forumPosts, recoveryVideos, videoCategories } from "@/data/recoveryResources";

export default function AddictionRecovery() {
  const navigate = useNavigate();
  const [videoCategory, setVideoCategory] = useState("All");
  const [newPost, setNewPost] = useState("");
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const filteredVideos = recoveryVideos.filter((v) => videoCategory === "All" || v.category === videoCategory);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" /></Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold">Addiction Recovery</h1>
          <p className="text-muted-foreground">A safe space for healing</p>
        </div>
      </div>

      {/* Expert Chat CTA */}
      <Card className="bg-asha/5 border-asha/20">
        <CardContent className="p-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Need professional support?</h3>
            <p className="text-sm text-muted-foreground">Talk to a certified counselor confidentially</p>
          </div>
          <Button className="gap-2 shrink-0 bg-asha hover:bg-asha/90 text-asha-foreground">
            <Phone className="h-4 w-4" /> Expert Chat
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="community" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="community" className="gap-1"><MessageCircle className="h-4 w-4" /> Community</TabsTrigger>
          <TabsTrigger value="videos" className="gap-1"><Play className="h-4 w-4" /> Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="community" className="space-y-4">
          {/* Compose */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input placeholder="Share your story or ask for support..." value={newPost} onChange={(e) => setNewPost(e.target.value)} className="flex-1" />
                <Button size="icon" disabled={!newPost.trim()}><Send className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {forumPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-asha/10 flex items-center justify-center text-sm font-medium text-asha">
                    {post.anonymous ? "?" : post.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 ${likes[post.id] ? "text-asha" : ""}`}
                    onClick={() => setLikes((l) => ({ ...l, [post.id]: !l[post.id] }))}
                  >
                    <ThumbsUp className="h-4 w-4" /> {post.likes + (likes[post.id] ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="h-4 w-4" /> {post.comments}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {videoCategories.map((c) => (
              <Button key={c} variant={videoCategory === c ? "default" : "outline"} size="sm" onClick={() => setVideoCategory(c)} className="whitespace-nowrap">{c}</Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="h-32 bg-asha/10 flex items-center justify-center text-4xl rounded-t-lg">
                    {video.thumbnail}
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-sm">{video.title}</h3>
                    <p className="text-xs text-muted-foreground">{video.description}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <Badge variant="secondary" className="text-xs">{video.category}</Badge>
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
