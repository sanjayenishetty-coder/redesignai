import { useNavigate } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-[#fffff] py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          
          {/* Left - Logo */}
          <div>
            <a href="/">
              <img 
                src="https://d2z9497xp8xb12.cloudfront.net/prod-images/613423c1770401064880logo_scrolled.png"
                alt="ScaleMe Network Logo"
                className="w-48 h-auto"
              />
            </a>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h3 
              className="text-[#007787] text-lg font-bold uppercase mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  onClick={()=> {navigate('/')}}
                  href="/#about" 
                  className="text-[#007787] hover:text-[#1DB2AB] transition-colors text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  // href="/team" 
                  onClick={()=>{navigate('/team')}}
                  className="text-[#007787] hover:text-[#1DB2AB] transition-colors text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Team
                </a>
              </li>
              <li>
                <a 
                  // href="/#agenda" 
                  onClick={()=>{navigate('/agenda')}}
                  className="text-[#007787] hover:text-[#1DB2AB] transition-colors text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Agenda
                </a>
              </li>
              <li>
                <a 
                  // href="/#agenda" 
                  onClick={()=>{navigate('/privacy-policy')}}
                  className="text-[#007787] hover:text-[#1DB2AB] transition-colors text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  // href="/#agenda" 
                  onClick={()=>{navigate('/terms-of-service')}}
                  className="text-[#007787] hover:text-[#1DB2AB] transition-colors text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Right - Contact */}
          <div>
            <h3 
              className="text-[#007787] text-lg font-bold uppercase mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Contact
            </h3>
            <div className="space-y-2 flex flex-col">
              <div
                className="text-[#007787] text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Email: summit@scaleme.in
              </div>
              <div className="flex gap-3">
                <a className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-105 transition"
                href="https://www.facebook.com/people/ScaleMe/61586901750176/?ref=1" target="_blank">
                  <FaFacebookF className="text-white w-4 h-4" />
                </a>

                <a className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center hover:scale-105 transition"
                href="https://www.linkedin.com/company/scalemenetwork/" target="_blank">
                  <FaLinkedinIn className="text-white w-4 h-4" />
                </a>

                <a className="w-8 h-8 rounded-full bg-[#f024a2] flex items-center justify-center hover:scale-105 transition"
                href="https://www.instagram.com/scalemenetwork" target="_blank">
                  <FaInstagram className="text-white w-4 h-4" />
                </a>

                <a className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:scale-105 transition"
                href="https://x.com/scalemenetwork" target="_blank">
                  <FaXTwitter className="text-white w-4 h-4" />
                </a>

                <a className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center hover:scale-105 transition"
                href="https://x.com/scalemenetwork" target="_blank">
                  <FaYoutube className="text-white w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom - Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p 
            className="text-[#007787] text-sm"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            © 2026 ScaleMe Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
