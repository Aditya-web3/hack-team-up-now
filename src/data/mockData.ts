
import { User, Skill, Hackathon, Conversation, Message } from '@/types';

// Skills
export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'frontend' },
  { id: '2', name: 'TypeScript', category: 'frontend' },
  { id: '3', name: 'Node.js', category: 'backend' },
  { id: '4', name: 'Python', category: 'backend' },
  { id: '5', name: 'UI/UX Design', category: 'design' },
  { id: '6', name: 'Figma', category: 'design' },
  { id: '7', name: 'GraphQL', category: 'backend' },
  { id: '8', name: 'MongoDB', category: 'backend' },
  { id: '9', name: 'AWS', category: 'devops' },
  { id: '10', name: 'Docker', category: 'devops' },
  { id: '11', name: 'React Native', category: 'mobile' },
  { id: '12', name: 'Flutter', category: 'mobile' },
  { id: '13', name: 'Machine Learning', category: 'ai' },
  { id: '14', name: 'TensorFlow', category: 'ai' },
  { id: '15', name: 'Solidity', category: 'blockchain' },
  { id: '16', name: 'Web3.js', category: 'blockchain' },
  { id: '17', name: 'Kubernetes', category: 'devops' },
  { id: '18', name: 'Swift', category: 'mobile' },
  { id: '19', name: 'Kotlin', category: 'mobile' },
  { id: '20', name: 'Vue.js', category: 'frontend' },
  { id: '21', name: 'Angular', category: 'frontend' },
  { id: '22', name: 'Django', category: 'backend' },
  { id: '23', name: 'Flask', category: 'backend' },
  { id: '24', name: 'Firebase', category: 'backend' },
  { id: '25', name: 'Product Management', category: 'other' },
];

// Hackathons
export const hackathons: Hackathon[] = [
  {
    id: '1',
    name: 'ETHGlobal London',
    location: 'London, UK',
    startDate: '2025-05-15',
    endDate: '2025-05-17',
    isOnline: false,
  },
  {
    id: '2',
    name: 'Solana Hacker House',
    location: 'Berlin, Germany',
    startDate: '2025-06-10',
    endDate: '2025-06-12',
    isOnline: false,
  },
  {
    id: '3',
    name: 'HackFS',
    location: 'Online',
    startDate: '2025-07-01',
    endDate: '2025-07-30',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Devpost AI Hackathon',
    location: 'Online',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    isOnline: true,
  },
  {
    id: '5',
    name: 'ETHDenver',
    location: 'Denver, USA',
    startDate: '2026-02-01',
    endDate: '2026-02-05',
    isOnline: false,
  },
  {
    id: '6',
    name: 'Web3 Jam',
    location: 'Paris, France',
    startDate: '2025-09-15',
    endDate: '2025-09-17',
    isOnline: false,
  },
  {
    id: '7',
    name: 'HackTech',
    location: 'San Francisco, USA',
    startDate: '2025-08-10',
    endDate: '2025-08-12',
    isOnline: false,
  }
];

// Users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/avatars/alex.jpg',
    location: 'London, UK',
    bio: 'Full-stack developer with 3+ years of experience. Passionate about blockchain and web3 technologies.',
    skills: [skills[0], skills[1], skills[2], skills[6]],
    hackathons: [hackathons[0], hackathons[2]],
    available: true,
  },
  {
    id: '2',
    name: 'Sofia Rodriguez',
    avatar: '/avatars/sofia.jpg',
    location: 'Berlin, Germany',
    bio: 'UX/UI designer specializing in user research and product design. Looking for frontend and backend teammates.',
    skills: [skills[4], skills[5], skills[0]],
    hackathons: [hackathons[1], hackathons[3]],
    available: true,
  },
  {
    id: '3',
    name: 'Marcus Chen',
    avatar: '/avatars/marcus.jpg',
    location: 'Online',
    bio: 'Backend engineer with expertise in distributed systems. Currently exploring AI integration in web apps.',
    skills: [skills[2], skills[3], skills[7], skills[12]],
    hackathons: [hackathons[2], hackathons[3]],
    available: false,
  },
  {
    id: '4',
    name: 'Jasmine Patel',
    avatar: '/avatars/jasmine.jpg',
    location: 'New York, USA',
    bio: 'Mobile developer focusing on cross-platform solutions. Interested in fintech and health tech hackathons.',
    skills: [skills[10], skills[11], skills[17], skills[18]],
    hackathons: [hackathons[6]],
    available: true,
  },
  {
    id: '5',
    name: 'Liam Wilson',
    avatar: '/avatars/liam.jpg',
    location: 'San Francisco, USA',
    bio: 'AI researcher and developer. Looking for design and frontend teammates for AI hackathons.',
    skills: [skills[12], skills[13], skills[3]],
    hackathons: [hackathons[3], hackathons[6]],
    available: true,
  },
  {
    id: '6',
    name: 'Emma Davis',
    avatar: '/avatars/emma.jpg',
    location: 'Paris, France',
    bio: 'Blockchain developer specializing in smart contracts. Excited about DeFi and NFT projects.',
    skills: [skills[14], skills[15], skills[1]],
    hackathons: [hackathons[0], hackathons[5]],
    available: true,
  },
  {
    id: '7',
    name: 'Raj Patel',
    avatar: '/avatars/raj.jpg',
    location: 'Mumbai, India',
    bio: 'DevOps engineer with cloud expertise. Interested in scaling solutions and infrastructure as code.',
    skills: [skills[8], skills[9], skills[16]],
    hackathons: [hackathons[2], hackathons[3]],
    available: false,
  },
  {
    id: '8',
    name: 'Olivia Brown',
    avatar: '/avatars/olivia.jpg',
    location: 'Toronto, Canada',
    bio: 'Frontend developer with a focus on accessibility and performance. Looking for backend teammates.',
    skills: [skills[0], skills[19], skills[1]],
    hackathons: [hackathons[3], hackathons[6]],
    available: true,
  },
  {
    id: '9',
    name: 'Daniel Kim',
    avatar: '/avatars/daniel.jpg',
    location: 'Seoul, South Korea',
    bio: 'Full-stack developer interested in gaming and AR/VR. Seeking design and mobile teammates.',
    skills: [skills[0], skills[2], skills[20], skills[21]],
    hackathons: [hackathons[4], hackathons[6]],
    available: true,
  },
  {
    id: '10',
    name: 'Nadia Ali',
    avatar: '/avatars/nadia.jpg',
    location: 'Dubai, UAE',
    bio: 'Product manager with technical background. Passionate about fintech and solving real-world problems.',
    skills: [skills[24], skills[4], skills[1]],
    hackathons: [hackathons[0], hackathons[5]],
    available: true,
  },
  {
    id: '11',
    name: 'Carlos Mendoza',
    avatar: '/avatars/carlos.jpg',
    location: 'Mexico City, Mexico',
    bio: 'Backend developer specializing in serverless and microservices. Looking for frontend and design collaborators.',
    skills: [skills[2], skills[22], skills[23], skills[7]],
    hackathons: [hackathons[3], hackathons[6]],
    available: true,
  },
  {
    id: '12',
    name: 'Ava Williams',
    avatar: '/avatars/ava.jpg',
    location: 'Sydney, Australia',
    bio: 'Mobile app developer with iOS expertise. Interested in health tech and sustainability hackathons.',
    skills: [skills[17], skills[10], skills[8], skills[23]],
    hackathons: [hackathons[2], hackathons[3]],
    available: true,
  }
];

// Messages
export const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: "Hi Sofia! I saw you're participating in the ETHGlobal London hackathon. Would you be interested in teaming up?",
    timestamp: '2025-04-15T10:30:00',
    read: true,
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    content: "Hey Alex! Yes, I'm looking for a team. I'm a UX/UI designer and could use a good frontend developer. What's your idea?",
    timestamp: '2025-04-15T10:45:00',
    read: true,
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '2',
    content: "I'm thinking about building a decentralized marketplace for freelancers. I can handle the frontend and smart contracts, but I need help with the UX design.",
    timestamp: '2025-04-15T11:00:00',
    read: true,
  },
  {
    id: '4',
    senderId: '3',
    receiverId: '5',
    content: "Hello Liam, I noticed you're skilled in AI and looking for hackathon teammates. I'm a backend engineer with some AI experience too.",
    timestamp: '2025-04-16T09:15:00',
    read: false,
  },
  {
    id: '5',
    senderId: '7',
    receiverId: '11',
    content: "Hi Carlos, I'm interested in joining your team for the Devpost AI Hackathon. I have experience with cloud infrastructure that could be useful.",
    timestamp: '2025-04-17T14:20:00',
    read: false,
  },
];

// Conversations
export const conversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    lastMessage: messages[2],
    unreadCount: 0,
  },
  {
    id: '2',
    participants: ['3', '5'],
    lastMessage: messages[3],
    unreadCount: 1,
  },
  {
    id: '3',
    participants: ['7', '11'],
    lastMessage: messages[4],
    unreadCount: 1,
  },
];

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Get conversations for a user
export const getConversationsForUser = (userId: string): Conversation[] => {
  return conversations.filter(conversation => 
    conversation.participants.includes(userId)
  );
};

// Get messages for a conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  const conversation = conversations.find(c => c.id === conversationId);
  if (!conversation) return [];
  
  return messages.filter(message => 
    conversation.participants.includes(message.senderId) && 
    conversation.participants.includes(message.receiverId)
  );
};

// Filter users by criteria
export const filterUsers = (filters: Partial<{
  skills: string[];
  location: string;
  hackathonId: string;
  available: boolean;
}>): User[] => {
  return users.filter(user => {
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      const hasMatchingSkill = user.skills.some(skill => 
        filters.skills!.includes(skill.id)
      );
      if (!hasMatchingSkill) return false;
    }
    
    // Filter by location
    if (filters.location && filters.location !== '') {
      if (!user.location.toLowerCase().includes(filters.location.toLowerCase()) && 
          user.location !== 'Online') return false;
    }
    
    // Filter by hackathon
    if (filters.hackathonId && filters.hackathonId !== '') {
      const hasMatchingHackathon = user.hackathons.some(hackathon => 
        hackathon.id === filters.hackathonId
      );
      if (!hasMatchingHackathon) return false;
    }
    
    // Filter by availability
    if (filters.available !== undefined) {
      if (user.available !== filters.available) return false;
    }
    
    return true;
  });
};
