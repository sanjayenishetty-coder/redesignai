import { useState, FormEvent } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

export const WaitlistSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    companyLegalName: '',
    annualRevenue: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    try {
      const res = await fetch("/api/submit-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.firstName + ' ' + formData.lastName,
          phone: formData.contactNumber,
          email: formData.email,
          companyName: formData.companyLegalName,
          industry: formData.annualRevenue,
          source: 'waitlist',
        }),
      });

      if (!res.ok) throw new Error("API failed");
      setIsLoading(false);
      setSubmitted(true);
    } catch {
      setIsLoading(false);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <section
      id="waitlist"
      className="w-full bg-[#F5F5F5] py-20 md:py-28 px-4 md:px-8"
      style={{
        backgroundImage: `url(assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block bg-[#F15A2B]/10 text-[#F15A2B] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Future Cohort Waitlist
          </span>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-[#007787] leading-none mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            Be First in Line
          </h2>
          <p
            className="text-base md:text-lg text-gray-600 max-w-xl mx-auto"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            ScaleMe Summit '26 is sold out. Register your interest for the next cohort and get priority access before seats open to the public.
          </p>
        </div>

        {/* Success State */}
        {submitted ? (
          <div className="bg-white rounded-2xl p-10 md:p-14 text-center shadow-sm">
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
              We'll reach out as soon as seats for the next ScaleMe Summit cohort open up. Keep building.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F15A2B] hover:bg-[#d94f24] disabled:opacity-70 text-white font-bold uppercase py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                ) : (
                  'Register for Next Cohort'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
