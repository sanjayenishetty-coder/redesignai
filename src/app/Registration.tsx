import { ArrowLeft, Loader2, CheckCircle, Lock } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';

const tiers = [
  {
    name: 'Early Founder Access',
    description: 'Priority seating · Pre-event networking · Summit materials',
  },
  {
    name: 'Summit Access',
    description: 'Full-day access · All sessions · Peer roundtables',
    featured: true,
  },
  {
    name: "Founders' Circle",
    description: 'VIP seating · Exclusive dinner · 1:1 faculty access',
  },
];

export default function Registration() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    companyLegalName: '',
    annualRevenue: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const annualRevenueOptions = [
    '₹10cr - ₹25cr',
    '₹25cr - ₹50cr',
    '₹50cr - ₹100cr',
    '₹100cr - ₹200cr',
    '₹200cr above',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      businessId: "1f0ffff7-c282-624f-9d23-03d83203e77f",
      name: formData.firstName + ' ' + formData.lastName,
      mobileNo: formData.contactNumber,
      email: formData.email,
      message: '',
      moreInfo: { ...formData, source: 'Waitlist - ScaleMe Summit Next Cohort' }
    };

    try {
      const res = await fetch("https://api.simpo.ai/business/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("API failed");
      setIsLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setIsLoading(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F5F5F5]"
      style={{
        backgroundImage: `url(assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <img
            src="https://d2z9497xp8xb12.cloudfront.net/prod-images/789549c1770378555007logo_scrolled.png"
            alt="Logo"
            className="h-8 md:h-10"
          />
        </div>
      </div>

      <div className="pt-28 pb-20 px-6">
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

          {/* Sold Out Hero */}
          <div className="mb-12 text-center">
            <div
              className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-5 border border-red-200"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Lock className="w-4 h-4" />
              All Seats Sold Out
            </div>
            <h1
              className="text-[48px] md:text-[64px] lg:text-[80px] uppercase leading-[0.95] text-[#007787] mb-4"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              ScaleMe Summit '26
            </h1>
            <p
              className="text-lg md:text-xl text-[#2a2a2a] font-medium"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              April 18, 2026 · ISB-CBI, Hyderabad
            </p>
          </div>

          {/* Tier Cards — Sold Out */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl p-6 overflow-hidden ${
                  tier.featured ? 'border-2 border-[#007787] shadow-md' : 'border border-gray-200 shadow-sm'
                }`}
              >
                {tier.featured && (
                  <div
                    className="absolute top-3 right-3 bg-[#007787] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Sold Out Overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-2xl z-10">
                  <div className="bg-red-600 text-white text-base font-black uppercase tracking-widest px-6 py-2 rounded-lg rotate-[-2deg] shadow-lg"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px' }}
                  >
                    Sold Out
                  </div>
                </div>

                <h3
                  className="text-lg font-bold text-[#007787] mb-2"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px' }}
                >
                  {tier.name}
                </h3>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {tier.description}
                </p>
              </div>
            ))}
          </div>

          {/* Divider with message */}
          <div className="text-center mb-10">
            <p
              className="text-gray-500 text-sm uppercase tracking-widest font-semibold"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Missed this cohort? Don't miss the next one.
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-[#007787] mt-2"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Register for the Next Cohort
            </h2>
            <p
              className="text-base text-gray-600 mt-3 max-w-lg mx-auto"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Join the waitlist and get priority access before seats open to the public.
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg p-8 md:p-12">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 bg-[#007787] rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-9 h-9 text-white" strokeWidth={2} />
                </div>
                <h3
                  className="text-4xl font-bold uppercase text-[#007787] mb-3"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  You're on the list!
                </h3>
                <p
                  className="text-gray-600 text-base max-w-sm mx-auto"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  We'll reach out as soon as seats for the next ScaleMe Summit open up. Keep building.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-8 inline-flex items-center gap-2 bg-[#007787] text-white font-bold uppercase px-8 py-3 rounded-lg hover:bg-[#1DB2AB] transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
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
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
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
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Email <span className="text-[#F15A2B]">*</span>
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
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
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

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Company Name <span className="text-[#F15A2B]">*</span>
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

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
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
                    {annualRevenueOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#F15A2B] hover:bg-[#d94f24] disabled:opacity-70 text-white py-4 rounded-lg font-bold uppercase flex items-center justify-center gap-2 transition-colors"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    ) : (
                      'Register for Next Cohort'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
