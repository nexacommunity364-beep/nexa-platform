import React, { useMemo, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { HelpCircle, MessageSquare, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { Toast } from '../components/Toast';
import { useAppStore } from '../store/appStore';
import { SupportCategory } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I create an account?',
    answer: 'Click Sign Up, fill in your details, and complete the demo email verification state to enter Nexa.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Use Forgot Password on the login page. Nexa shows a realistic confirmation flow with no backend required yet.',
  },
  {
    question: 'How do I report a user?',
    answer: 'Open the Reports page from the sidebar and submit the user, message, or community details for review.',
  },
];

export const SupportCenter: React.FC = () => {
  const { currentUser, supportTickets, addSupportTicket } = useAppStore();
  const [activeTab, setActiveTab] = useState('center');
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCategory, setTicketCategory] = useState<SupportCategory>('account');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const filteredFaqs = useMemo(
    () =>
      faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const myTickets = supportTickets.filter((ticket) => ticket.userId === currentUser?.id);

  const handleSubmitTicket = () => {
    if (!currentUser || !ticketTitle.trim() || !ticketDescription.trim()) {
      return;
    }

    addSupportTicket({
      id: `ticket-${Date.now()}`,
      userId: currentUser.id,
      category: ticketCategory,
      title: ticketTitle,
      description: ticketDescription,
      status: 'open',
      replies: [],
      createdAt: new Date(),
    });

    setTicketTitle('');
    setTicketDescription('');
    setActiveTab('requests');
    Toast.success('Support request submitted.');
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
          <p className="text-gray-400">Find answers, contact support, and track your requests.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="center">Support Center</TabsTrigger>
            <TabsTrigger value="requests">My Support Requests ({myTickets.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="center" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: HelpCircle, label: 'FAQ', desc: 'Browse quick answers' },
                { icon: BookOpen, label: 'Guides', desc: 'Learn the Nexa basics' },
                { icon: MessageSquare, label: 'Submit Ticket', desc: 'Contact our team with context' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-nexa-500 transition text-left"
                  >
                    <Icon size={28} className="text-nexa-400 mb-2" />
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 space-y-4">
              <h2 className="text-xl font-bold text-white">Submit a support request</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InputField
                  label="Ticket title"
                  placeholder="What do you need help with?"
                  value={ticketTitle}
                  onChange={setTicketTitle}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(event) => setTicketCategory(event.target.value as SupportCategory)}
                    className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white focus:outline-none focus:border-nexa-500"
                  >
                    <option value="account">Account</option>
                    <option value="community">Community</option>
                    <option value="billing">Billing</option>
                    <option value="premium">Premium</option>
                    <option value="bug">Bugs</option>
                    <option value="report">Reports</option>
                    <option value="safety">Safety</option>
                    <option value="technical">Technical Problems</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={ticketDescription}
                  onChange={(event) => setTicketDescription(event.target.value)}
                  placeholder="Describe the issue, steps, and what you expected to happen."
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:border-nexa-500 resize-none"
                />
              </div>
              <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
            </div>

            <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
              <div className="p-6 border-b border-dark-700">
                <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <InputField
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              <div>
                {filteredFaqs.map((faq, index) => (
                  <div key={faq.question} className="border-b border-dark-700 last:border-b-0">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full px-6 py-4 text-left hover:bg-dark-700 transition flex items-center justify-between"
                    >
                      <p className="font-medium text-white">{faq.question}</p>
                      <span className={`text-gray-400 transition ${expandedFAQ === index ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-6 py-4 bg-dark-700/50 text-gray-300">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            {myTickets.map((ticket) => (
              <div key={ticket.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-white font-semibold">{ticket.title}</h2>
                    <p className="text-sm text-gray-400">
                      {ticket.category} · opened {ticket.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-nexa-500/10 text-nexa-300 capitalize">
                    {ticket.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{ticket.description}</p>
                <div className="space-y-3">
                  {ticket.replies.map((reply) => (
                    <div key={reply.id} className="rounded-xl bg-dark-700/70 p-4 border border-dark-600">
                      <p className="text-sm text-gray-200">{reply.content}</p>
                      <p className="text-xs text-gray-500 mt-2">{reply.createdAt.toLocaleString()}</p>
                    </div>
                  ))}
                  {ticket.replies.length === 0 && (
                    <p className="text-sm text-gray-500">No replies yet. The Nexa support team will respond here.</p>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};
