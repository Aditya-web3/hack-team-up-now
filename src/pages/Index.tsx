
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Search, MessageSquare, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { skills, users, hackathons } from "@/data/mockData";
import UserCard from "@/components/UserCard";

const Index = () => {
  // Get featured users (first 3)
  const featuredUsers = users.slice(0, 3);
  
  // Get popular skills (first 8)
  const popularSkills = skills.slice(0, 8);
  
  // Get upcoming hackathons (first 3)
  const upcomingHackathons = hackathons.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-hackathon-50 via-teammate-50 to-hackathon-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Find Your Perfect Hackathon Teammates
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with developers, designers, and innovators who share your passion for building amazing projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <Button size="lg" className="bg-gradient-to-r from-hackathon-600 to-teammate-600 text-white">
                    <Search className="mr-2 h-5 w-5" />
                    Find Teammates
                  </Button>
                </Link>
                <Link to="/profile/create">
                  <Button size="lg" variant="outline">
                    Create Your Profile
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -top-6 -left-6 bg-hackathon-100 rounded-lg p-8 shadow-lg transform rotate-6">
                <Users className="h-8 w-8 text-hackathon-600" />
                <p className="mt-2 font-medium">Connect with teammates</p>
              </div>
              <div className="absolute top-1/2 -right-4 bg-teammate-100 rounded-lg p-8 shadow-lg transform -rotate-3">
                <Calendar className="h-8 w-8 text-teammate-600" />
                <p className="mt-2 font-medium">Join hackathons together</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-hackathon-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-hackathon-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Find Teammates</h3>
                    <p className="text-sm text-muted-foreground">Browse profiles by skills & interests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-teammate-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-teammate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Connect Directly</h3>
                    <p className="text-sm text-muted-foreground">Message potential teammates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-hackathon-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-hackathon-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Join Hackathons</h3>
                    <p className="text-sm text-muted-foreground">Participate in events with your team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teammates Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Teammates</h2>
            <Link to="/browse" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills & Upcoming Hackathons */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Popular Skills */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Popular Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {popularSkills.map((skill) => (
                  <Link 
                    key={skill.id} 
                    to={`/browse?skill=${skill.id}`}
                    className="flex items-center p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mr-3 p-2 rounded-full bg-hackathon-100">
                      <div className="w-8 h-8 flex items-center justify-center">
                        <span className="text-hackathon-600 font-medium">
                          {skill.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {skill.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Hackathons */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Hackathons</h2>
              <div className="space-y-4">
                {upcomingHackathons.map((hackathon) => (
                  <div 
                    key={hackathon.id}
                    className="p-4 bg-white rounded-lg border shadow-sm"
                  >
                    <div className="flex justify-between items-start">
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
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          hackathon.isOnline 
                            ? "bg-green-100 text-green-800" 
                            : "bg-hackathon-100 text-hackathon-800"
                        }`}>
                          {hackathon.isOnline ? "Online" : "In Person"}
                        </span>
                        <p className="mt-1 text-sm">{hackathon.location}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Link to={`/browse?hackathon=${hackathon.id}`}>
                        <Button variant="outline" size="sm">
                          <Users className="mr-1 h-4 w-4" />
                          Find Teammates
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How TeamUp Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-hackathon-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-hackathon-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and showcase your skills, interests, and the hackathons you want to participate in.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-teammate-100 flex items-center justify-center">
                  <Search className="h-8 w-8 text-teammate-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Find Teammates</h3>
              <p className="text-muted-foreground">
                Browse and filter profiles to find the perfect teammates with complementary skills.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-hackathon-100 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-hackathon-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">Connect & Collaborate</h3>
              <p className="text-muted-foreground">
                Message potential teammates, form your dream team, and start building amazing projects together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-hackathon-600 to-teammate-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Dream Team?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of hackers, designers, and innovators looking for their perfect hackathon teammates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/browse">
              <Button size="lg" variant="secondary">
                Browse Teammates
              </Button>
            </Link>
            <Link to="/profile/create">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Create Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Users className="h-6 w-6 text-hackathon-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-hackathon-600 to-teammate-600 text-transparent bg-clip-text">
                TeamUp
              </span>
            </div>
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>© 2025 TeamUp. All rights reserved.</p>
              <p>Find your perfect hackathon teammates.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
