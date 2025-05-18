import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, CalendarDays, Edit3, Shield, LogOut } from "lucide-react";
import Image from 'next/image';

// Placeholder user data
const userProfile = {
  username: "HeartHero23",
  email: "user@example.com",
  joinDate: "2023-05-15T00:00:00Z",
  avatarUrl: "https://placehold.co/128x128.png",
  bio: "Living life to the fullest with my trusty pacemaker! Here to share experiences and learn from others. Passionate about hiking and photography.",
  threadsStarted: 5,
  postsMade: 42,
  lastActivity: "2024-07-28T10:00:00Z",
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden shadow-xl">
        <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
           <Image src="https://placehold.co/800x200.png" alt="Profile banner" layout="fill" objectFit="cover" data-ai-hint="abstract texture" />
          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.username} data-ai-hint="profile avatar" />
              <AvatarFallback className="text-4xl">{userProfile.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardHeader className="pt-20 pb-6"> {/* Adjusted padding due to overlapping avatar */}
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{userProfile.username}</CardTitle>
              <CardDescription className="mt-1">{userProfile.bio}</CardDescription>
            </div>
            <Button variant="outline">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-center">
              <User className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Username: <span className="font-semibold">{userProfile.username}</span></span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Email: <span className="font-semibold">{userProfile.email}</span> (Private)</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Joined: <span className="font-semibold">{new Date(userProfile.joinDate).toLocaleDateString()}</span></span>
            </div>
             <div className="flex items-center">
              <CalendarDays className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Last active: <span className="font-semibold">{new Date(userProfile.lastActivity).toLocaleDateString()}</span></span>
            </div>
          </div>
          
          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Activity Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-secondary/50">
                <CardContent className="p-4">
                  <p className="text-2xl font-bold">{userProfile.threadsStarted}</p>
                  <p className="text-sm text-muted-foreground">Threads Started</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50">
                <CardContent className="p-4">
                  <p className="text-2xl font-bold">{userProfile.postsMade}</p>
                  <p className="text-sm text-muted-foreground">Posts Made</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4"/> Privacy Settings
              </Button>
               <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4"/> Manage Account Details
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4"/> Logout
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Placeholder for recent activity/threads list */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest contributions to the forum.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Recent activity will be displayed here.</p>
          {/* Map over user's recent threads/posts here */}
        </CardContent>
      </Card>
    </div>
  );
}
