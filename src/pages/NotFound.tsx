import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500); // redirect after 1.5s

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-2xl md:text-4xl text-center">
        הדף לא נמצא. מיד נעבור לדף הבית...
      </h1>
    </div>
  );
};

export default NotFound;
