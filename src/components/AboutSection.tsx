
import React from 'react';
import { Heart, Mic, Star, Instagram, Linkedin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const hosts = [
    {
      name: "צחי כהן",
      bio: "צחי הוא מומחה לשיווק בעזרת יוצרי תוכן. הוא עבד בעבר בחברות כמו Google ו-Humanz. כיום הוא מרצה ומייעץ לחברות בנושאים שונים. יש לו תואר שני בפסיכולוגיה מהאוניברסיטה העברית בירושלים.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      social: {
        instagram: "https://www.instagram.com/tzachicohen",
        linkedin: "https://www.linkedin.com/in/tzachi-cohen-74992b182/"
      }
    },
    {
      name: "יהונתן כהן",
      bio: "יהונתן היא מנהלת פרויקטים המתמחה בהובלת מוצרים דיגיטליים מורכבים. יש לו תואר ראשון בקוגניציה ובפסיכולוגיה מהאוניברסיטה העברית בירושלים.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      social: {
        instagram: "https://www.instagram.com/yehonatanc",
        linkedin: "https://www.linkedin.com/in/yehonatan-cohen-pmo/"
      }
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-podcast-magenta flex items-center justify-center mx-auto mb-4">
            <Heart className="text-podcast-black" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">אודות הפודקאסט "אחותי היפה"</h2>

          <p className="text-lg text-white/80">
            “אחותי היפה" הוא פודקאסט המגיש שיחות עומק על רגשות, זהות וחוויות להטב"קיות. הפודקאסט, בהנחיית האחים צחי ויהונתן כהן, עוסק בכל פרק ברגש אחר מתוך “Atlas of the Heart” של ברנה בראון וממשיך למסע אינטימי בין זיכרונות וסיפורים, בניסיון להבין את הרגש ולפתוח את הלב.
            בין סיפורי הילדות, טיולים ברחבי העולם דייטים כושלים, “אחותי היפה” מדבר אל הלב ומציע נקודת מבט ייחודית על פגיעות, שייכות, וגאווה.
          </p>
        </div>

        <h3 className="text-2xl md:text-4xl font-bold mb-4 text-center">המנחים</h3>
        <p className="text-lg text-white/80 text-center mb-6">
          צחי ויהונתן גדלו במשפחה דתית בירושלים, לאבא מורה ולאמא שעוסקת בגיל-הרך. כיום הם מתגוררים בתל-אביב יפו.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {hosts.map((host, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-center bg-white/5 rounded-lg p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-podcast-magenta">
                <img 
                  src={host.image} 
                  alt={host.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">{host.name}</h4>
                {/* No role property in host object */}
                <p className="text-white/80 mb-4">{host.bio}</p>
                <div className="flex gap-3">
                  <a 
                    href={host.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-podcast-yellow transition-colors"
                    title="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href={host.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-podcast-yellow transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
