import { useEffect } from "react";
import { useRouter } from "next/router"; // Use Next.js router

const NotFound = () => {
  const router = useRouter(); // Use Next.js router

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/"); // Redirect to the home page
    }, 1500); // redirect after 1.5s

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-2xl md:text-4xl text-center">
        הדף לא נמצא. מיד נעבור לדף הבית...
      </h1>
    </div>
  );
};

export default NotFound;
