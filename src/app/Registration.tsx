// import backgroundPattern from "figma:asset/154465906a86e9abb2111c1fddf397d04d59de3e.png";
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface RegistrationProps {
  onNavigate: (page: 'home' | 'team' | 'agenda' | 'registration' | 'thank-you') => void;
}

export default function Registration() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'agenda' | 'registration' | 'thank-you'>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    companyLegalName: '',
    designation: '',
    linkedinProfile: '',
    city: '',
    website: '',
    industrySector: '',
    companyCIN: '',
    annualRevenue: '',
    pressingNeeds: [] as string[],
    howDidYouHear: '',
    decisionMaker: false,
    verificationConsent: false,
    marketingCommunication: [] as string[],
  });

  const [otherNeed, setOtherNeed] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle Scroll Event for Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const designationOptions = [
    'Founder/Owner/Promotor',
    'Managing Director',
    'Designated Partner',
    'Professional CEO',
    'Other',
  ];

  const industrySectorOptions = [
    'Manufacturing (Auto, Engineering, Industrial Goods)',
    'Manufacturing (FMCG, Consumer Goods)',
    'Retail & D2C E-commerce',
    'Healthcare & Pharmaceuticals',
    'Food & Beverage',
    'Beauty, Wellness & Personal Care',
    'Information Technology Services',
    'Software as a Service (SaaS)',
    'Real Estate & Construction',
    'B2B Professional Services',
    'Logistics & Supply Chain',
    'Textiles & Apparel',
    'Agri-Processing & Food Tech',
    'Clean Technology & EV',
    'Education & EdTech',
    'Fintech & Financial Services',
    'Other',
  ];

  const annualRevenueOptions = [
    '₹10cr - ₹25cr  (Waitlist - Priority given to ₹25Cr+)',
    '₹25cr - ₹50cr',
    '₹50cr - ₹100cr',
    '₹100cr - ₹200cr',
    '₹200cr above',
  ];

  const howDidYouHearOptions = [
    'ISB Network / Alumni',
    'Referral by Friend / Colleague',
    'Social Media channels',
    'WhatsApp Groups',
  ];

  const pressingNeedsOptions = [
    { id: 'gtm', label: 'Go-to-Market Strategy (entering new markets, channels, customer segments)' },
    { id: 'capital', label: 'Capital (debt, equity, or growth funding)' },
    { id: 'connections', label: 'Connections (introductions to potential customers, partners, or talent)' },
    { id: 'advisory', label: 'Advisory (strategic guidance from experienced operators or experts)' },
    { id: 'ai', label: 'AI & Digital Transformation (automation, tech upgrades, data systems)' },
    { id: 'other', label: 'Other' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePressingNeedsChange = (needId: string) => {
    setFormData(prev => {
      const currentNeeds = prev.pressingNeeds;

      if (currentNeeds.includes(needId)) {
        return { ...prev, pressingNeeds: currentNeeds.filter(id => id !== needId) };
      } else {
        if (currentNeeds.length >= 2) {
          return prev;
        }
        return { ...prev, pressingNeeds: [...currentNeeds, needId] };
      }
    });
  };

  const handleMarketingCommunicationChange = (value: string) => {
    setFormData(prev => {
      const current = prev.marketingCommunication;

      if (current.includes(value)) {
        return { ...prev, marketingCommunication: current.filter(item => item !== value) };
      } else {
        return { ...prev, marketingCommunication: [...current, value] };
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.decisionMaker || !formData.verificationConsent) {
      alert('Please confirm both required declarations.');
      return;
    }

    if (formData.pressingNeeds.length === 0) {
      alert('Please select at least one pressing need.');
      return;
    }

    setIsLoading(true);

    const data: any = {
      businessId: "1f0ffff7-c282-624f-9d23-03d83203e77f",
      name: formData.firstName + ' ' + formData.lastName,
      mobileNo: formData.contactNumber,
      email: formData.email,
      message: '',
      moreInfo: formData
    };
    try {
      const res = await fetch(
        "https://api.simpo.ai/business/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("API failed");
      }

      const result = await res.json();
      // Navigate to thank you page on successful submission
      setIsLoading(false);
      navigate('/thank-you');
    } catch (err: any) {
      setIsLoading(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]"
      style={{
        backgroundImage: `url(assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>

      {/* Simple Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <img
            src="https://d2z9497xp8xb12.cloudfront.net/prod-images/789549c1770378555007logo_scrolled.png"
            alt="Logo"
            className="h-8 md:h-10"
          />
        </div>
      </div>

      {/* Registration Page Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="mb-8 inline-flex items-center gap-2 text-[#007787] hover:text-[#1DB2AB] transition-colors font-semibold"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1
              className="text-[48px] md:text-[64px] lg:text-[72px] uppercase leading-[0.95] text-[#007787] mb-4"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Get Your Invite
            </h1>
            <p
              className="text-lg md:text-xl text-[#2a2a2a] uppercase font-medium"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Register for ScaleME Summit '26
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl uppercase text-[#007787] font-bold mb-6"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      First Name <span className="text-[#F15A2B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Last Name <span className="text-[#F15A2B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Email id <span className="text-[#F15A2B]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Contact Number <span className="text-[#F15A2B]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Your Designation <span className="text-[#F15A2B]">*</span>
                    </label>
                    <select
                      name="designation"
                      required
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <option value="">Select Designation</option>
                      {designationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* LinkedIn Profile */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      LinkedIn Profile link
                    </label>
                    <input
                      type="url"
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    City <span className="text-[#F15A2B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Company Information Section */}
              <div className="space-y-6 pt-8 border-t border-gray-200">
                <h2
                  className="text-2xl md:text-3xl uppercase text-[#007787] font-bold mb-6"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  Company Information
                </h2>

                {/* Company Legal Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Company Legal Name <span className="text-[#F15A2B]">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyLegalName"
                    required
                    value={formData.companyLegalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Website */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>

                  {/* Industry Sector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Industry Sector <span className="text-[#F15A2B]">*</span>
                    </label>
                    <select
                      name="industrySector"
                      required
                      value={formData.industrySector}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <option value="">Select Industry Sector</option>
                      {industrySectorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company CIN */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Company CIN Number
                    </label>
                    <input
                      type="text"
                      name="companyCIN"
                      value={formData.companyCIN}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>

                  {/* Annual Revenue */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Annual Revenue (₹ crores) <span className="text-[#F15A2B]">*</span>
                    </label>
                    <select
                      name="annualRevenue"
                      required
                      value={formData.annualRevenue}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <option value="">Select Annual Revenue</option>
                      {annualRevenueOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pressing Needs Section */}
              <div className="space-y-6 pt-8 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    What are the two most pressing needs for your company's growth right now? (Select up to 2) <span className="text-[#F15A2B]">*</span>
                  </label>
                  <div className="space-y-3">
                    {pressingNeedsOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.pressingNeeds.includes(option.id)
                            ? 'border-[#007787] bg-[#007787]/5'
                            : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.pressingNeeds.includes(option.id)}
                          onChange={() => handlePressingNeedsChange(option.id)}
                          disabled={!formData.pressingNeeds.includes(option.id) && formData.pressingNeeds.length >= 2}
                          className="mt-1 w-4 h-4 text-[#007787] focus:ring-[#007787] border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {formData.pressingNeeds.includes('other') && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={otherNeed}
                        onChange={(e) => setOtherNeed(e.target.value)}
                        placeholder="Please specify..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      />
                    </div>
                  )}
                </div>

                {/* How did you hear */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    How did you hear about ScaleME Summit'26 <span className="text-[#F15A2B]">*</span>
                  </label>
                  <select
                    name="howDidYouHear"
                    required
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007787] focus:border-transparent transition-all"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <option value="">Select Option</option>
                    {howDidYouHearOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Confirmations Section */}
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <h2
                  className="text-2xl md:text-3xl uppercase text-[#007787] font-bold mb-6"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  Confirmations
                </h2>

                <label className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all">
                  <input
                    type="checkbox"
                    name="decisionMaker"
                    required
                    checked={formData.decisionMaker}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-[#007787] focus:ring-[#007787] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    I confirm that I am the decision-making authority in my company <span className="text-[#F15A2B]">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-all">
                  <input
                    type="checkbox"
                    name="verificationConsent"
                    required
                    checked={formData.verificationConsent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-[#007787] focus:ring-[#007787] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    I understand that my application will be verified (revenue, role, company CIN). <span className="text-[#F15A2B]">*</span>
                  </span>
                </label>
              </div>

              {/* Marketing Communication Section */}
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <h2
                  className="text-2xl md:text-3xl uppercase text-[#007787] font-bold mb-6"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  Marketing Communication
                </h2>

                <div className="space-y-3">
                  <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.marketingCommunication.includes('future-events')
                      ? 'border-[#007787] bg-[#007787]/5'
                      : 'border-gray-300 hover:border-gray-400'
                    }`}>
                    <input
                      type="checkbox"
                      checked={formData.marketingCommunication.includes('future-events')}
                      onChange={() => handleMarketingCommunicationChange('future-events')}
                      className="mt-1 w-4 h-4 text-[#007787] focus:ring-[#007787] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Inform me about future ScaleME events
                    </span>
                  </label>

                  <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.marketingCommunication.includes('newsletters')
                      ? 'border-[#007787] bg-[#007787]/5'
                      : 'border-gray-300 hover:border-gray-400'
                    }`}>
                    <input
                      type="checkbox"
                      checked={formData.marketingCommunication.includes('newsletters')}
                      onChange={() => handleMarketingCommunicationChange('newsletters')}
                      className="mt-1 w-4 h-4 text-[#007787] focus:ring-[#007787] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Send me Newsletters
                    </span>
                  </label>

                  <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.marketingCommunication.includes('whatsapp')
                      ? 'border-[#007787] bg-[#007787]/5'
                      : 'border-gray-300 hover:border-gray-400'
                    }`}>
                    <input
                      type="checkbox"
                      checked={formData.marketingCommunication.includes('whatsapp')}
                      onChange={() => handleMarketingCommunicationChange('whatsapp')}
                      className="mt-1 w-4 h-4 text-[#007787] focus:ring-[#007787] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Add me to Whatsapp Group
                    </span>
                  </label>

                  <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${formData.marketingCommunication.includes('not-interested')
                      ? 'border-[#007787] bg-[#007787]/5'
                      : 'border-gray-300 hover:border-gray-400'
                    }`}>
                    <input
                      type="checkbox"
                      checked={formData.marketingCommunication.includes('not-interested')}
                      onChange={() => handleMarketingCommunicationChange('not-interested')}
                      className="mt-1 w-4 h-4 text-[#007787] focus:ring-[#007787] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Not Interested
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                {
                  isLoading ? 
                  <button
                  type="button"
                  className="w-full bg-[#F15A2B] text-white py-4 rounded-lg hover:bg-[#d94f24] transition-colors font-bold uppercase
                  flex justify-center items-center gap-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                </button>
                  :
                      <button
                  type = "submit"
                  className = "w-full bg-[#F15A2B] text-white py-4 rounded-lg hover:bg-[#d94f24] transition-colors font-bold uppercase"
                  style = {{ fontFamily: 'Montserrat, sans-serif' }}
                >
                Submit Registration
              </button>
                }
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
