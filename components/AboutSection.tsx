import React from 'react';
import { Info, User, Users, BookOpen, HeartHandshake, Globe, Headphones, Mic2, Heart, Play } from 'lucide-react';

const AboutSection = () => {
  const hosts = [
    {
      name: "צחי כהן",
      pronouns: "(הוא/אתה)",
      bio: "צחי הוא מומחה לשיווק בעזרת יוצרי תוכן. הוא עבד בעבר בחברות כמו Google ו-Humanz. כיום הוא מרצה ומייעץ לחברות בנושאים שונים. יש לו תואר שני בפסיכולוגיה מהאוניברסיטה העברית בירושלים.",
      image: "/tzachi.jpg",
      social: {
        instagram: "https://www.instagram.com/tzachicohen",
        linkedin: "https://www.linkedin.com/in/tzachi-cohen-74992b182/"
      }
    },
    {
      name: "יהונתן כהן",
      pronouns: "(היא/הוא)",
      bio: "יהונתן היא מנהלת פרויקטים המתמחה בהובלת מוצרים דיגיטליים מורכבים. יש לו תואר ראשון בקוגניציה ובפסיכולוגיה מהאוניברסיטה העברית בירושלים.",
      image: "/yehonatan.jpg",
      social: {
        instagram: "https://www.instagram.com/yehonatanc",
        linkedin: "https://www.linkedin.com/in/yehonatan-cohen-pmo/"
      }
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient and margin icons */}
      <div className="absolute inset-0 -z-10 pointer-events-none w-full h-full overflow-hidden">
        {/* Subtle icons only in margins, fully inside the section */}
        <Headphones className="absolute top-10 left-4 w-24 h-24 text-white/20 pointer-events-none z-0" />
        <Mic2 className="absolute bottom-10 left-4 w-24 h-24 text-white/15 pointer-events-none z-0" />
        <Heart className="absolute top-[60%] right-4 w-32 h-32 sm:w-20 sm:h-20 text-podcast-magenta/20 pointer-events-none z-0" />
        <Play className="absolute top-[50%] left-4 w-20 h-20 text-podcast-yellow/20 pointer-events-none z-0" />
      </div>
      <div className="container px-6">

        {/* Intro Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-podcast-magenta flex items-center justify-center mx-auto mb-4">
            <Info className="text-black" size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-podcast-magenta">מי אנחנו</h2>
          <p className="text-lg text-white/80 mb-4">
            “אחותי היפה" הוא פודקאסט המגיש שיחות עומק על רגשות, זהות וחוויות להטב"קיות. בכל פרק אנחנו – צחי ויהונתן כהן, אחים כבר יותר משלושים שנה – בוחרים רגש מתוך הספר “Atlas of the Heart” של ברנה בראון וממשיכים למסע אינטימי בין זיכרונות וסיפורים, בניסיון לפתוח את הלב ולהבין מה אנחנו באמת מרגישים.
            בין סיפורי הילדות, טיולים ברחבי העולם ודייטים כושלים, “אחותי היפה” מדבר אל הלב ומציע נקודת מבט ייחודית על פגיעות, שייכות, וגאווה.
          </p>
          <p className="text-lg text-white/80">
          “אחותי היפה” עומד בגאווה לצד פודקאסטים להט"בים אחרים בעברית כמו "המניפה", "יוצאות", "זן נדיר", ו"תולדות המיניות" – כולם מייצרים מרחב לשיחות חשובות על הקהילה הגאה בישראל.
          </p>
        </div>

        {/* Hosts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {hosts.map((host, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 items-center bg-white/5 rounded-lg p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-podcast-magenta">
                <img
                  src={host.image}
                  alt={`תמונה של ${host.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-extrabold mb-1 inline-flex items-center gap-1">
                  {host.name}
                  <span className="font-normal text-white/80 text-base ml-2">{host.pronouns}</span>
                </h4>
                <p className="text-white/70 mb-4">{host.bio}</p>
                <div className="flex gap-3">
                  <a
                    href={host.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-podcast-magenta transition-colors"
                    title="Instagram"
                  >
                    <svg width="25" height="25" fill="none" viewBox="0 0 24 24">
                      <path d="M8.666 4h6.668A4.67 4.67 0 0 1 20 8.666v6.668A4.67 4.67 0 0 1 15.334 20H8.666A4.67 4.67 0 0 1 4 15.334V8.666A4.67 4.67 0 0 1 8.666 4ZM12 8.667a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666Zm4-1.334a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={host.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-podcast-magenta transition-colors"
                    title="LinkedIn"
                  >
                    <svg width="25" height="25" fill="none" viewBox="0 0 24 24">
                      <path d="M17.333 8.667a4 4 0 0 1 4 4v5.333h-4v-5.334a.667.667 0 0 0-1.334 0v5.334h-4v-5.334a4 4 0 0 1 4-4Zm-10 10.666h4V10.667h-4v8.666Zm2-9.333a2 2 0 1 0-.001-4.001A2 2 0 0 0 9.333 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brené Brown Section */}
        <h2 className="text-3xl md:text-4xl mb-4 text-white text-center">ברנה בראון</h2>
        <p className="text-lg text-white/80 text-center max-w-3xl mx-auto">
          ברנה בראון (Brené Brown) היא חוקרת אמריקאית פורצת דרך בתחומי הפגיעות, הבושה והאמפתיה, והיא מקור ההשראה לפודקאסט שלנו.
          הספר שלה, “אטלס של הלב”, מיפה עשרות רגשות שונים, והוא עוזר לנו לתאר את מה שקורה לנו בלב ובראש.  
          דרכה, אנחנו לומדים להבחין בין אושר לשמחה, בין בדידות לכאב, ומזמינים אתכן להקשיב ולהרגיש יחד איתנו.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
