
export interface User {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  bio: string;
  skills: Skill[];
  hackathons: Hackathon[];
  available: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'mobile' | 'ai' | 'blockchain' | 'devops' | 'other';
}

export interface Hackathon {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

export type LocationType = 'online' | 'in-person' | 'hybrid';

export interface SearchFilters {
  skills: string[];
  location: string;
  hackathonInterest: string;
  availabilityFilter: boolean;
}
