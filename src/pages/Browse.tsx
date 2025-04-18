
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SearchFilters from "@/components/SearchFilters";
import UserCard from "@/components/UserCard";
import { User, SearchFilters as SearchFiltersType } from "@/types";
import { filterUsers } from "@/data/mockData";
import { Users } from "lucide-react";

const Browse = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFiltersType>({
    skills: [],
    location: "",
    hackathonInterest: "",
    availabilityFilter: false,
  });
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    const timer = setTimeout(() => {
      const result = filterUsers({
        skills: searchFilters.skills,
        location: searchFilters.location,
        hackathonId: searchFilters.hackathonInterest,
        available: searchFilters.availabilityFilter,
      });
      setFilteredUsers(result);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchFilters]);

  const handleFilterChange = (filters: SearchFiltersType) => {
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-7xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Find Teammates</h1>
          <div className="text-muted-foreground">
            Showing {filteredUsers.length} teammate{filteredUsers.length !== 1 ? "s" : ""}
          </div>
        </div>
        
        <div className="mb-8">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-muted rounded-lg h-72"></div>
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">No teammates found</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Try adjusting your search filters or browse all teammates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
