
import React from 'react';
import { Heart, Mic, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const hosts = [
    {
      name: "Alex Morgan",
      role: "Host & Producer",
      bio: "Alex is a writer, speaker, and advocate with over 10 years of experience in LGBTQ+ media. Their passion for storytelling drives meaningful conversations about identity and emotions.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Jamie Lee",
      role: "Co-host & Mental Health Expert",
      bio: "Jamie is a licensed therapist specializing in LGBTQ+ mental health. They bring clinical expertise and compassion to discussions about emotional wellbeing and healing.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-podcast-magenta flex items-center justify-center mx-auto mb-4">
            <Heart className="text-white" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Our Podcast</h2>
          <p className="text-lg text-gray-700">
            The Feel Good Podcast explores the beautiful complexity of emotions through an LGBTQ+ lens. 
            Each episode offers a safe space for authentic conversations about identity, mental health, relationships, 
            and the unique emotional journeys we experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-podcast-yellow/10 to-podcast-yellow/5 border-podcast-yellow/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mx-auto mb-4">
                <Mic className="text-podcast-darkgray" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Authentic Stories</h3>
              <p className="text-gray-600">
                We share real experiences from diverse voices in the LGBTQ+ community, celebrating our unique emotional journeys.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-podcast-magenta/10 to-podcast-magenta/5 border-podcast-magenta/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-podcast-magenta flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Mental Wellness</h3>
              <p className="text-gray-600">
                We explore emotional health topics with expert insights, practical tools, and compassionate perspectives.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-podcast-yellow/10 to-podcast-magenta/10 border-podcast-yellow/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-podcast-yellow to-podcast-magenta flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Building</h3>
              <p className="text-gray-600">
                We create connections beyond the podcast, fostering supportive spaces for shared understanding.
              </p>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">Meet Your Hosts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hosts.map((host, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-podcast-yellow">
                <img 
                  src={host.image} 
                  alt={host.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">{host.name}</h4>
                <p className="text-podcast-magenta font-medium mb-3">{host.role}</p>
                <p className="text-gray-600">{host.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
