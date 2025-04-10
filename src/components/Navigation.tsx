
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (isOpen) setIsOpen(false);
    navigate('/logout');
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/90 backdrop-blur-md py-3 shadow-lg rounded-b-lg" 
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/7dc661bf-08e1-4e89-a204-b8db3ed738a2.png" 
              alt="AI László Logo" 
              className="h-10 w-auto"
            />
            <div className="flex flex-col">
              <Link to="/" className="text-xl font-medium">
                <span className={scrolled ? "gradient-nav-animation" : "text-white"}>AI László</span>
              </Link>
              <span className="text-xs text-white/70 mt-1">Web Development & Marketing in One</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/services" className="text-sm text-white/80 hover:text-white transition-colors">
              Services
            </Link>
            <Link to="/portfolio" className="text-sm text-white/80 hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/blog" className="text-sm text-white/80 hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-sm text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              className="bg-white text-black hover:bg-black hover:text-white border-white transition-all duration-300"
            >
              Kérek egy ingyenes konzultációt <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden h-screen w-full bg-background animate-fade-in">
          <div className="flex flex-col p-8 space-y-6">
            <Link to="/services" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link to="/portfolio" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
            <Link to="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/blog" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link to="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            
            <div className="pt-6">
              <Button 
                variant="outline" 
                className="w-full bg-white text-black hover:bg-black hover:text-white border-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                Kérek egy ingyenes konzultációt <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-xs text-white/60 mt-2 text-center">
                48 órán belül személyesen felveszem Önnel a kapcsolatot.
              </p>
            </div>
            
            {user && (
              <div className="pt-6 flex flex-col space-y-4">
                <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Account
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
