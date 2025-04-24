import React from 'react';
import { Info } from 'lucide-react';

const AboutSection = () => {
  const hosts = [
    {
      name: "צחי כהן",
      pronouns: "(הוא/אתה)",
      bio: "צחי הוא מומחה לשיווק בעזרת יוצרי תוכן. הוא עבד בעבר בחברות כמו Google ו-Humanz. כיום הוא מרצה ומייעץ לחברות בנושאים שונים. יש לו תואר שני בפסיכולוגיה מהאוניברסיטה העברית בירושלים.",
      image: `${import.meta.env.BASE_URL}tzachi.jpg`,
      social: {
        instagram: "https://www.instagram.com/tzachicohen",
        linkedin: "https://www.linkedin.com/in/tzachi-cohen-74992b182/"
      }
    },
    {
      name: "יהונתן כהן",
      pronouns: "(היא/הוא)",
      bio: "יהונתן היא מנהלת פרויקטים המתמחה בהובלת מוצרים דיגיטליים מורכבים. יש לו תואר ראשון בקוגניציה ובפסיכולוגיה מהאוניברסיטה העברית בירושלים.",
      image: `${import.meta.env.BASE_URL}yehonatan.jpg`,
      social: {
        instagram: "https://www.instagram.com/yehonatanc",
        linkedin: "https://www.linkedin.com/in/yehonatan-cohen-pmo/"
      }
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container px-6">

        {/* Intro Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="w-12 h-12 rounded-full bg-podcast-magenta flex items-center justify-center mx-auto mb-4">
            <Info className="text-black" size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-podcast-magenta transform scale-x-110">אודות הפודקאסט</h2>
          <p className="text-lg text-white/80">
            “אחותי היפה" הוא פודקאסט המגיש שיחות עומק על רגשות, זהות וחוויות להטב"קיות. הפודקאסט, בהנחיית האחים צחי ויהונתן כהן, עוסק בכל פרק ברגש אחר מתוך “Atlas of the Heart” של ברנה בראון וממשיך למסע אינטימי בין זיכרונות וסיפורים, בניסיון להבין את הרגש ולפתוח את הלב.
            בין סיפורי הילדות, טיולים ברחבי העולם דייטים כושלים, “אחותי היפה” מדבר אל הלב ומציע נקודת מבט ייחודית על פגיעות, שייכות, וגאווה.
          </p>
        </div>

        {/* Hosts Description */}
        <h3 className="text-2xl md:text-3xl mb-4 text-center">המנחים</h3>
        <p className="text-lg text-white/80 text-center mb-6">
          צחי ויהונתן גדלו במשפחה דתית בירושלים, לאבא מורה ולאמא שעוסקת בגיל-הרך. כיום הם מתגוררים בתל-אביב יפו.
        </p>

        {/* Hosts Grid */}
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
                <h4 className="text-2xl font-bold mb-1">
                  {host.name}
                  <span className="text-white/60 text-base ml-2 font-normal">{host.pronouns}</span>
                </h4>
                <p className="text-white/80 mb-4">{host.bio}</p>
                <div className="flex gap-3">
                  <a
                    href={host.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-podcast-yellow transition-colors"
                    title="Instagram"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M8.666 4h6.668A4.67 4.67 0 0 1 20 8.666v6.668A4.67 4.67 0 0 1 15.334 20H8.666A4.67 4.67 0 0 1 4 15.334V8.666A4.67 4.67 0 0 1 8.666 4ZM12 8.667a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666Zm4-1.334a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={host.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-podcast-yellow transition-colors"
                    title="LinkedIn"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M17.333 8.667a4 4 0 0 1 4 4v5.333h-4v-5.334a.667.667 0 0 0-1.334 0v5.334h-4v-5.334a4 4 0 0 1 4-4Zm-10 10.666h4V10.667h-4v8.666Zm2-9.333a2 2 0 1 0-.001-4.001A2 2 0 0 0 9.333 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
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
