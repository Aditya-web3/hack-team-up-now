
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { User } from "@/types";
import { getUserById } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Linkedin, 
  Github, 
  Globe, 
  Twitter, 
  User as UserIcon,
  Users
} from "lucide-react";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    const timer = setTimeout(() => {
      if (id) {
        const userData = getUserById(id);
        setUser(userData || null);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Group skills by category
  const getSkillsByCategory = (user: User) => {
    return user.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof user.skills>);
  };

  // Format category name
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get skill category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "backend":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "design":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "mobile":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "ai":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "blockchain":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "devops":
        return "bg-teal-100 text-teal-800 hover:bg-teal-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container max-w-5xl mx-auto py-8 px-4">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="h-40 bg-muted rounded-lg mb-6"></div>
                <div className="h-60 bg-muted rounded-lg"></div>
              </div>
              <div className="md:col-span-2">
                <div className="h-40 bg-muted rounded-lg mb-6"></div>
                <div className="h-60 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container max-w-5xl mx-auto py-16 px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <UserIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">User not found</h2>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto mb-8">
            The user you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/browse">
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Browse Teammates
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const skillsByCategory = getSkillsByCategory(user);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-hackathon-600 to-teammate-600"></div>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row gap-6 -mt-12">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pt-12 md:pt-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Link to={`/messages/new/${user.id}`}>
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </Link>
                  </div>
                </div>
                <p className="text-muted-foreground">{user.bio}</p>
                <div className="mt-4 flex items-center gap-2">
                  {user.available ? (
                    <Badge className="bg-green-100 text-green-800">
                      Available for Hackathons
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Currently Unavailable
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                <div className="space-y-4">
                  {Object.entries(skillsByCategory).map(([category, skills]) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Badge
                          variant="secondary"
                          className={`mr-2 font-normal ${getCategoryColor(category)}`}
                        >
                          {formatCategoryName(category)}
                        </Badge>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill.id} variant="outline">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links (Placeholder) */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Connect</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Portfolio
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Hackathon Interests */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Hackathon Interests</h2>
                {user.hackathons.length === 0 ? (
                  <p className="text-muted-foreground">
                    No hackathon interests listed yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {user.hackathons.map((hackathon) => (
                      <div
                        key={hackathon.id}
                        className="p-4 border rounded-lg flex justify-between items-start"
                      >
                        <div>
                          <h3 className="font-medium">{hackathon.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>
                              {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              hackathon.isOnline
                                ? "bg-green-100 text-green-800"
                                : "bg-hackathon-100 text-hackathon-800"
                            }`}
                          >
                            {hackathon.isOnline ? "Online" : "In Person"}
                          </span>
                          <p className="mt-1 text-sm">{hackathon.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Projects Section (Placeholder) */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Past Projects</h2>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Decentralized Marketplace</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          A blockchain-based marketplace for digital artists to sell their work directly to collectors.
                        </p>
                      </div>
                      <Badge className="bg-hackathon-100 text-hackathon-800">
                        ETHGlobal 2024
                      </Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Solidity</Badge>
                      <Badge variant="outline">IPFS</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">AI Health Coach</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          An AI-powered health coach that provides personalized fitness and nutrition advice.
                        </p>
                      </div>
                      <Badge className="bg-hackathon-100 text-hackathon-800">
                        Devpost AI Hackathon
                      </Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">TensorFlow</Badge>
                      <Badge variant="outline">React Native</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
