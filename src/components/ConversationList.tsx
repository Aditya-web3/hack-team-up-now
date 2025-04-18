import { useState } from "react";
import { User, Conversation } from "@/types";
import { getUserById } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  onSelectConversation: (conversationId: string) => void;
  selectedConversationId?: string;
}

const ConversationList = ({
  conversations,
  currentUserId,
  onSelectConversation,
  selectedConversationId,
}: ConversationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conversation) => {
    const otherParticipantId = conversation.participants.find(
      (id) => id !== currentUserId
    );
    if (!otherParticipantId) return false;
    
    const otherUser = getUserById(otherParticipantId);
    if (!otherUser) return false;
    
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get the other participant in the conversation
  const getOtherParticipant = (conversation: Conversation): User | undefined => {
    const otherParticipantId = conversation.participants.find(
      (id) => id !== currentUserId
    );
    if (!otherParticipantId) return undefined;
    return getUserById(otherParticipantId);
  };

  // Format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If the message is from today, show the time
    if (date.toDateString() === now.toDateString()) {
      return format(date, "h:mm a");
    }
    
    // If the message is from this year, show the month and day
    if (date.getFullYear() === now.getFullYear()) {
      return format(date, "MMM d");
    }
    
    // Otherwise, show the month, day, and year
    return format(date, "MMM d, yyyy");
  };

  // Get the preview text for the conversation
  const getPreviewText = (conversation: Conversation) => {
    if (!conversation.lastMessage) return "";
    
    if (conversation.lastMessage.senderId === currentUserId) {
      return `You: ${conversation.lastMessage.content}`;
    }
    
    return conversation.lastMessage.content;
  };

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {searchQuery
              ? "No conversations found"
              : "No conversations yet"}
          </div>
        ) : (
          <ul className="divide-y">
            {filteredConversations.map((conversation) => {
              const otherUser = getOtherParticipant(conversation);
              if (!otherUser) return null;
              
              return (
                <li key={conversation.id}>
                  <Button
                    variant="ghost"
                    className={`w-full text-left p-4 rounded-none justify-start h-auto ${
                      selectedConversationId === conversation.id
                        ? "bg-muted"
                        : ""
                    }`}
                    onClick={() => onSelectConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                        <AvatarFallback>
                          {getInitials(otherUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">
                            {otherUser.name}
                          </span>
                          {conversation.lastMessage && (
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(conversation.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <p className="text-sm text-muted-foreground truncate">
                            {getPreviewText(conversation)}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-auto bg-primary text-primary-foreground">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
