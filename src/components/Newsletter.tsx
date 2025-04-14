
import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (email.includes('@')) {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
          icon: <CheckCircle className="h-4 w-4" />,
        });
        setEmail('');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a valid email address.",
          icon: <AlertCircle className="h-4 w-4" />,
        });
      }
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-podcast-yellow/10 to-podcast-magenta/10">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-podcast-yellow to-podcast-magenta flex items-center justify-center mx-auto mb-6">
            <Mail className="text-white" size={24} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in Touch
          </h2>
          
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to our newsletter for episode updates, exclusive content, and community events.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="md:flex-1"
              required
            />
            <Button 
              type="submit" 
              className="bg-podcast-magenta hover:bg-podcast-magenta/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
