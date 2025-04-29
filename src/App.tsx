import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllEpisodes from "./pages/AllEpisodes";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster"; // Use your Toaster

const App = () => (
  <>
    {/* Scrolls to top on every page navigation */}
    <ScrollToTop />

    {/* Global notification system */}
    <Toaster />

    {/* Your app routes */}
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/episodes" element={<AllEpisodes />} />
      {/* This will automatically use the [id].tsx page */}
      <Route path="/episodes/:id" element={<AllEpisodes />} />
      {/* Catches all unknown URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
