import React, { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Smile, Paperclip, Send } from 'lucide-react';
import Layout from "./Layout.tsx";
import SearchInput from "../components/layouts/SearchInput.tsx";

interface Message {
    id: number;
    sender: 'user' | 'other';
    content: string;
    timestamp: string;
    avatar?: string;
}

interface Conversation {
    id: number;
    name: string;
    role: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
    online: boolean;
}

const Messages: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeConversation, setActiveConversation] = useState<number>(1);
    const [messageText, setMessageText] = useState('');

    const conversations: Conversation[] = [
        {
            id: 1,
            name: 'John Doe',
            role: 'Mentor',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            lastMessage: 'Hello there! How are you progressing with the learning materials I sent you last week?',
            timestamp: '10:15 AM',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'Mentor',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            lastMessage: 'Let me know if you have any questions about the assignment.',
            timestamp: 'Yesterday',
            unread: 0,
            online: false
        },
        {
            id: 3,
            name: 'Mike Johnson',
            role: 'Mentor',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            lastMessage: 'Great progress on your project!',
            timestamp: 'Monday',
            unread: 0,
            online: false
        }
    ];

    const messages: Message[] = [
        {
            id: 1,
            sender: 'other',
            content: 'Hello there! How are you progressing with the learning materials I sent you last week?',
            timestamp: '10:15 AM',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            id: 2,
            sender: 'other',
            content: 'Hello there! How are you progressing with the learning materials I sent you last week?',
            timestamp: '10:15 AM',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },

    ];

    const filteredConversations = conversations.filter(conversation =>
        conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = () => {
        if (messageText.trim() === '') return;
        // In a real app, you would send the message to your backend
        console.log('Sending message:', messageText);
        setMessageText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-150px)] flex">
                    {/* Conversations List */}
                    <div className="w-full md:w-1/3 border-r border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400"/>
                                </div>
                                <SearchInput placeholder={"Search messages..."} value={searchTerm} onSearchChange={setSearchTerm}/>
                            </div>
                        </div>

                        <div className="overflow-y-auto h-[calc(100%-70px)]">
                            <h2 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">MESSAGES</h2>
                            {filteredConversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${activeConversation === conversation.id ? 'bg-gray-100' : ''}`}
                                    onClick={() => setActiveConversation(conversation.id)}
                                >
                                    <div className="flex items-center">
                                        <div className="relative">
                                            <img
                                                src={conversation.avatar || "/placeholder.svg"}
                                                alt={conversation.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            {conversation.online && (
                                                <div
                                                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex justify-between">
                                                <div
                                                    className="text-sm font-medium text-gray-900">{conversation.name}</div>
                                                <div className="text-xs text-gray-500">{conversation.timestamp}</div>
                                            </div>
                                            <div className="text-xs text-gray-500">{conversation.role}</div>
                                            <div
                                                className="text-sm text-gray-600 truncate">{conversation.lastMessage}</div>
                                        </div>
                                        {conversation.unread > 0 && (
                                            <div
                                                className="ml-2 bg-[#ff6b35] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {conversation.unread}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="hidden md:flex md:flex-col md:w-2/3">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <div className="flex items-center">
                                <img
                                    src={conversations.find(c => c.id === activeConversation)?.avatar || "/placeholder.svg"}
                                    alt="Contact"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="ml-3">
                                    <div
                                        className="text-sm font-medium text-gray-900">{conversations.find(c => c.id === activeConversation)?.name}</div>
                                    <div
                                        className="text-xs text-gray-500">{conversations.find(c => c.id === activeConversation)?.online ? 'Online' : 'Offline'}</div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <Phone className="h-5 w-5 text-gray-600"/>
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <Video className="h-5 w-5 text-gray-600"/>
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <MoreVertical className="h-5 w-5 text-gray-600"/>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.sender === 'other' && (
                                        <img
                                            src={message.avatar || "/placeholder.svg"}
                                            alt="Avatar"
                                            className="h-8 w-8 rounded-full object-cover mr-2 mt-1"
                                        />
                                    )}
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                        message.sender === 'user' ? 'bg-[#ff6b35] text-white' : 'bg-gray-200 text-gray-800'
                                    }`}>
                                        <p>{message.content}</p>
                                        <div
                                            className={`text-xs mt-1 ${message.sender === 'user' ? 'text-orange-200' : 'text-gray-500'}`}>
                                            {message.timestamp}
                                        </div>
                                    </div>
                                    {message.sender === 'user' && (
                                        <img
                                            src="/placeholder.svg?height=32&width=32"
                                            alt="Your Avatar"
                                            className="h-8 w-8 rounded-full object-cover ml-2 mt-1"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex items-center">
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                    <Smile className="h-5 w-5"/>
                                </button>
                                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                    <Paperclip className="h-5 w-5"/>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 mx-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    className={`p-2 rounded-full ${messageText.trim() ? 'bg-[#ff6b35] text-white' : 'bg-gray-200 text-gray-400'}`}
                                    onClick={handleSendMessage}
                                    disabled={!messageText.trim()}
                                >
                                    <Send className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Messages;