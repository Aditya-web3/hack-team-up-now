
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ConversationList from "@/components/ConversationList";
import Conversation from "@/components/Conversation";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { 
  getConversationsForUser,
  getMessagesForConversation, 
  getUserById,
  conversations as allConversations,
  messages as allMessages
} from "@/data/mockData";
import { Message } from "@/types";

const Messages = () => {
  const { id } = useParams<{ id?: string }>();
  const [conversations, setConversations] = useState(getConversationsForUser("1")); // Assume current user is user 1
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>(id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Current user (hardcoded for demo)
  const currentUser = getUserById("1")!;

  // Get the other user in the conversation
  const otherUser = selectedConversationId 
    ? getUserById(
        allConversations
          .find(c => c.id === selectedConversationId)?.participants
          .find(p => p !== currentUser.id) || ""
      ) 
    : undefined;

  useEffect(() => {
    // If a conversation ID is provided in the URL, select it
    if (id) {
      setSelectedConversationId(id);
    } else if (conversations.length > 0 && !selectedConversationId) {
      // If no conversation is selected, select the first one
      setSelectedConversationId(conversations[0].id);
    }
  }, [id, conversations, selectedConversationId]);

  useEffect(() => {
    // Fetch messages for the selected conversation
    if (selectedConversationId) {
      setLoading(true);
      // Simulate loading delay
      const timer = setTimeout(() => {
        const fetchedMessages = getMessagesForConversation(selectedConversationId);
        setMessages(fetchedMessages);
        setLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [selectedConversationId]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversationId || !otherUser) return;
    
    // Create new message
    const newMessage: Message = {
      id: (allMessages.length + 1).toString(),
      senderId: currentUser.id,
      receiverId: otherUser.id,
      content,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    // Add message to the messages state
    setMessages([...messages, newMessage]);
    
    // Update the conversation with the new message
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === selectedConversationId) {
        return {
          ...conversation,
          lastMessage: newMessage,
          unreadCount: 0,
        };
      }
      return conversation;
    });
    
    setConversations(updatedConversations);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <Card className="overflow-hidden grid md:grid-cols-3 h-[75vh]">
          {/* Conversation List */}
          <div className="md:col-span-1 border-r h-full">
            <ConversationList
              conversations={conversations}
              currentUserId={currentUser.id}
              onSelectConversation={handleSelectConversation}
              selectedConversationId={selectedConversationId}
            />
          </div>
          
          {/* Conversation */}
          <div className="md:col-span-2 h-full">
            {selectedConversationId && otherUser ? (
              <Conversation
                messages={messages}
                currentUser={currentUser}
                otherUser={otherUser}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div className="mb-4 p-6 bg-muted rounded-full">
                  <MessageSquare className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium">Your Messages</h3>
                <p className="text-muted-foreground mt-2 max-w-xs">
                  Connect with potential teammates by sending them a message.
                </p>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Messages;
