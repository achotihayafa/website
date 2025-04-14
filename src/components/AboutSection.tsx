
import React from 'react';
import { Heart, Mic, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const hosts = [
    {
      name: "אלכס מורגן",
      role: "מנחה ומפיק/ה",
      bio: "אלכס הוא/היא כותב/ת, מרצה ופעיל/ה עם למעלה מ-10 שנות ניסיון בתקשורת להטב\"קית. התשוקה שלו/ה לסיפור סיפורים מניעה שיחות משמעותיות על זהות ורגשות.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "ג'יימי לי",
      role: "מנחה משנה ומומחה/ית לבריאות נפשית",
      bio: "ג'יימי הוא/היא מטפל/ת מוסמך/ת המתמחה בבריאות נפשית להטב\"קית. הוא/היא מביא/ה מומחיות קלינית וחמלה לדיונים על רווחה רגשית וריפוי.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mx-auto mb-4">
            <Heart className="text-podcast-darkgray" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">אודות הפודקאסט שלנו</h2>
          <p className="text-lg text-white/80">
            הפודקאסט Feel Good חוקר את המורכבות היפה של הרגשות דרך עדשה להטב"קית. 
            כל פרק מציע מרחב בטוח לשיחות אותנטיות על זהות, בריאות נפשית, מערכות יחסים, 
            והמסעות הרגשיים הייחודיים שאנו חווים.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-podcast-yellow/10 to-podcast-yellow/5 border-podcast-yellow/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-podcast-yellow flex items-center justify-center mx-auto mb-4">
                <Mic className="text-podcast-darkgray" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">סיפורים אותנטיים</h3>
              <p className="text-white/80">
                אנו משתפים חוויות אמיתיות מקולות מגוונים בקהילה הלהטב"קית, חוגגים את המסעות הרגשיים הייחודיים שלנו.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                <Heart className="text-podcast-magenta" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">רווחה נפשית</h3>
              <p className="text-white/80">
                אנו חוקרים נושאי בריאות רגשית עם תובנות מומחים, כלים מעשיים ופרספקטיבות אמפתיות.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-podcast-yellow/10 to-white/10 border-podcast-yellow/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-podcast-yellow to-white flex items-center justify-center mx-auto mb-4">
                <Star className="text-podcast-magenta" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">בניית קהילה</h3>
              <p className="text-white/80">
                אנו יוצרים קשרים מעבר לפודקאסט, מטפחים מרחבים תומכים להבנה משותפת.
              </p>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">הכירו את המנחים שלנו</h3>
        
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
                <p className="text-podcast-yellow font-medium mb-3">{host.role}</p>
                <p className="text-white/80">{host.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
