
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Upload } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { skills, hackathons } from "@/data/mockData";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedHackathons, setSelectedHackathons] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);
  
  // Format category name
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  const handleSelectSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };
  
  const handleRemoveSkill = (skillId: string) => {
    setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
  };
  
  const handleSelectHackathon = (hackathonId: string) => {
    if (selectedHackathons.includes(hackathonId)) {
      setSelectedHackathons(selectedHackathons.filter((id) => id !== hackathonId));
    } else {
      setSelectedHackathons([...selectedHackathons, hackathonId]);
    }
  };
  
  const handleRemoveHackathon = (hackathonId: string) => {
    setSelectedHackathons(selectedHackathons.filter((id) => id !== hackathonId));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the profile data to a backend
    // For this demo, we'll just redirect to the profile page
    navigate("/profile/1");
  };
  
  const goToNextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const goToPreviousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
        <p className="text-muted-foreground mb-8">
          Tell us about yourself to help others find you for hackathon collaborations.
        </p>
        
        <div className="mb-8 flex justify-between">
          <div className="flex items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>
              Basic Info
            </span>
          </div>
          <div className="h-px bg-border w-12 mt-4"></div>
          <div className="flex items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>
              Skills
            </span>
          </div>
          <div className="h-px bg-border w-12 mt-4"></div>
          <div className="flex items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>
              Hackathons
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  <p className="text-muted-foreground">
                    Let's start with some basic details about you.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="profile-picture">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Profile preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2">
                          <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Upload</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById("profile-picture")?.click()}
                      >
                        Choose File
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPEG, PNG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country or 'Online'"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your location or "Online" if you prefer remote collaborations.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell potential teammates about yourself, your experience, and what you're looking for..."
                    className="resize-none min-h-[100px]"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="available" 
                      checked={isAvailable}
                      onCheckedChange={(checked) => setIsAvailable(checked as boolean)}
                    />
                    <Label htmlFor="available">
                      I'm available for hackathon collaborations
                    </Label>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="button" onClick={goToNextStep}>
                    Next: Skills
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Step 2: Skills */}
          {step === 2 && (
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <p className="text-muted-foreground">
                    Select the skills you have to help others find you for collaborations.
                  </p>
                </div>
                
                {/* Selected Skills */}
                {selectedSkills.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skillId) => {
                        const skill = skills.find((s) => s.id === skillId);
                        return skill ? (
                          <Badge key={skill.id} variant="secondary" className="pl-2 pr-1 py-1">
                            {skill.name}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                              onClick={() => handleRemoveSkill(skill.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {skill.name}</span>
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {/* Skill Selection */}
                <div className="space-y-4">
                  <Label>Choose Your Skills</Label>
                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                    {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                          {formatCategoryName(category)}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {categorySkills.map((skill) => (
                            <div key={skill.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`skill-${skill.id}`}
                                checked={selectedSkills.includes(skill.id)}
                                onCheckedChange={() => handleSelectSkill(skill.id)}
                              />
                              <Label
                                htmlFor={`skill-${skill.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {skill.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousStep}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextStep}>
                    Next: Hackathons
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Step 3: Hackathons */}
          {step === 3 && (
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Hackathon Interests</h2>
                  <p className="text-muted-foreground">
                    Select the hackathons you're interested in participating in.
                  </p>
                </div>
                
                {/* Selected Hackathons */}
                {selectedHackathons.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Hackathons</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedHackathons.map((hackathonId) => {
                        const hackathon = hackathons.find((h) => h.id === hackathonId);
                        return hackathon ? (
                          <Badge key={hackathon.id} variant="secondary" className="pl-2 pr-1 py-1">
                            {hackathon.name}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                              onClick={() => handleRemoveHackathon(hackathon.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {hackathon.name}</span>
                            </Button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                {/* Hackathon Selection */}
                <div className="space-y-4">
                  <Label>Choose Hackathons</Label>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {hackathons.map((hackathon) => (
                      <div key={hackathon.id} className="flex items-start space-x-2 p-3 border rounded-md">
                        <Checkbox
                          id={`hackathon-${hackathon.id}`}
                          checked={selectedHackathons.includes(hackathon.id)}
                          onCheckedChange={() => handleSelectHackathon(hackathon.id)}
                          className="mt-1"
                        />
                        <div>
                          <Label
                            htmlFor={`hackathon-${hackathon.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {hackathon.name}
                          </Label>
                          <div className="text-sm text-muted-foreground mt-1">
                            <span className="block">
                              {hackathon.location} ({hackathon.isOnline ? "Online" : "In Person"})
                            </span>
                            <span>
                              {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousStep}>
                    Back
                  </Button>
                  <Button type="submit">
                    Create Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </main>
    </div>
  );
};

export default CreateProfile;
