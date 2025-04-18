
import { useState, useRef, useEffect } from "react";
import { User, Message } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { Send } from "lucide-react";

interface ConversationProps {
  messages: Message[];
  currentUser: User;
  otherUser: User;
  onSendMessage: (content: string) => void;
}

const Conversation = ({
  messages,
  currentUser,
  otherUser,
  onSendMessage,
}: ConversationProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Format the timestamp
  const formatMessageTime = (timestamp: string) => {
    return format(new Date(timestamp), "h:mm a");
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Handle pressing Enter to send a message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  
  messages.forEach((message) => {
    const messageDate = format(new Date(message.timestamp), "MMMM d, yyyy");
    const existingGroup = groupedMessages.find((group) => group.date === messageDate);
    
    if (existingGroup) {
      existingGroup.messages.push(message);
    } else {
      groupedMessages.push({
        date: messageDate,
        messages: [message],
      });
    }
  });

  return (
    <div className="flex flex-col h-full">
      {/* Conversation header */}
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
          <AvatarFallback>{getInitials(otherUser.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{otherUser.name}</h2>
          <p className="text-sm text-muted-foreground">{otherUser.location}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {groupedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="mb-4 p-4 bg-muted rounded-full">
              <Avatar className="h-16 w-16">
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback className="text-2xl">
                  {getInitials(otherUser.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h3 className="text-lg font-medium mb-1">{otherUser.name}</h3>
            <p className="text-muted-foreground mb-4">
              Start a conversation with {otherUser.name.split(" ")[0]} about a hackathon collaboration.
            </p>
          </div>
        ) : (
          groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">
                    {group.date}
                  </span>
                </div>
              </div>

              {group.messages.map((message) => {
                const isCurrentUser = message.senderId === currentUser.id;
                const user = isCurrentUser ? currentUser : otherUser;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[75%] ${
                        isCurrentUser ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          isCurrentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            isCurrentUser
                              ? "text-primary-foreground/70 text-right"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder={`Message ${otherUser.name.split(" ")[0]}...`}
            className="resize-none min-h-[60px]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="h-auto self-end"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
