
import { User } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin, MessageSquare, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get categories of skills
  const getSkillCategories = () => {
    const categories = new Set(user.skills.map((skill) => skill.category));
    return Array.from(categories);
  };

  // Format categories to be more readable
  const formatCategory = (category: string) => {
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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <Link 
                to={`/profile/${user.id}`} 
                className="text-xl font-semibold hover:text-primary transition-colors"
              >
                {user.name}
              </Link>
              {user.available ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  Available
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Unavailable
                </Badge>
              )}
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="text-sm">{user.location}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {user.bio}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-1.5">Skill Categories</h4>
            <div className="flex flex-wrap gap-1.5">
              {getSkillCategories().map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className={`font-normal ${getCategoryColor(category)}`}
                >
                  {formatCategory(category)}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <h4 className="text-sm font-medium text-muted-foreground mb-1.5">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {user.skills.slice(0, 4).map((skill) => (
                <Badge key={skill.id} variant="outline" className="font-normal">
                  {skill.name}
                </Badge>
              ))}
              {user.skills.length > 4 && (
                <Badge variant="outline" className="font-normal">
                  +{user.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {user.hackathons.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1.5">
                Interested in Hackathons
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {user.hackathons.map((hackathon) => (
                  <Badge
                    key={hackathon.id}
                    className="font-normal bg-hackathon-100 text-hackathon-800 hover:bg-hackathon-200"
                  >
                    <Calendar className="mr-1 h-3 w-3" />
                    {hackathon.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-4 flex justify-between">
        <Link to={`/profile/${user.id}`}>
          <Button variant="outline" size="sm">
            View Profile
          </Button>
        </Link>
        <Link to={`/messages/new/${user.id}`}>
          <Button size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
