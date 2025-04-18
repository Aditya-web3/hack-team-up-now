
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { X, Search, Filter, MapPin } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { skills, hackathons } from "@/data/mockData";
import { SearchFilters as SearchFiltersType } from "@/types";

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFiltersType) => void;
}

const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [hackathonInterest, setHackathonInterest] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  const handleApplyFilters = () => {
    onFilterChange({
      skills: selectedSkills,
      location,
      hackathonInterest,
      availabilityFilter: showOnlyAvailable,
    });
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setSelectedSkills([]);
    setLocation("");
    setHackathonInterest("");
    setShowOnlyAvailable(false);
    onFilterChange({
      skills: [],
      location: "",
      hackathonInterest: "",
      availabilityFilter: false,
    });
  };

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

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Search bar and filter toggle */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by skill, location, or hackathon..."
              className="pl-9"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-muted" : ""}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">Toggle filters</span>
          </Button>
          <Button onClick={handleApplyFilters}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Selected filters display */}
        {(selectedSkills.length > 0 || location || hackathonInterest || showOnlyAvailable) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filters:</span>
            
            {selectedSkills.map((skillId) => {
              const skill = skills.find((s) => s.id === skillId);
              return skill ? (
                <Badge key={skillId} variant="secondary" className="pl-2">
                  {skill.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                    onClick={() => handleRemoveSkill(skillId)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skill.name}</span>
                  </Button>
                </Badge>
              ) : null;
            })}
            
            {location && (
              <Badge variant="secondary" className="pl-2">
                <MapPin className="mr-1 h-3 w-3" />
                {location}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                  onClick={() => setLocation("")}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove location</span>
                </Button>
              </Badge>
            )}
            
            {hackathonInterest && (
              <Badge variant="secondary" className="pl-2">
                {hackathons.find((h) => h.id === hackathonInterest)?.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                  onClick={() => setHackathonInterest("")}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove hackathon</span>
                </Button>
              </Badge>
            )}
            
            {showOnlyAvailable && (
              <Badge variant="secondary" className="pl-2">
                Available Only
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent p-0"
                  onClick={() => setShowOnlyAvailable(false)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove availability filter</span>
                </Button>
              </Badge>
            )}
            
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-muted-foreground h-7">
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="p-4 border-t grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Skills filter */}
          <div className="space-y-3">
            <h3 className="font-medium">Skills</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {formatCategoryName(category)}
                  </h4>
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

          {/* Location and Hackathon filters */}
          <div className="space-y-6">
            {/* Location filter */}
            <div className="space-y-3">
              <h3 className="font-medium">Location</h3>
              <Input
                placeholder="City, Country, or Online"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Hackathon filter */}
            <div className="space-y-3">
              <h3 className="font-medium">Hackathon Interest</h3>
              <Select value={hackathonInterest} onValueChange={setHackathonInterest}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a hackathon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Hackathon</SelectItem>
                  {hackathons.map((hackathon) => (
                    <SelectItem key={hackathon.id} value={hackathon.id}>
                      {hackathon.name} {hackathon.isOnline ? "(Online)" : `(${hackathon.location})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional filters */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium">Availability</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={showOnlyAvailable}
                  onCheckedChange={(checked) => setShowOnlyAvailable(checked as boolean)}
                />
                <Label htmlFor="available">Show only available teammates</Label>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto pt-6">
              <Button onClick={handleApplyFilters}>
                Apply Filters
              </Button>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
