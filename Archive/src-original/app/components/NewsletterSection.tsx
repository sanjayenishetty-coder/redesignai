// import backgroundPattern from "figma:asset/154465906a86e9abb2111c1fddf397d04d59de3e.png";
import { useState, FormEvent } from 'react';

export const NewsletterSection = () => {
  const [formData, setFormData] = useState<any>({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev:any) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev:any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dynamicKey = 'source'
    formData[dynamicKey] = 'Newsletter'
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
        `https://api.simpo.ai/ecommerce/ecommerce/config/registered/newsletter?email=${formData.email}&businessId=1f0ffff7-c282-624f-9d23-03d83203e77f&bName=Scaleme`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!res.ok) {
        throw new Error("API failed");
      }
      
      const result = await res.json();
      formData.email = ''
      // Navigate to thank you page on successful submission
      // onNavigate('thank-you');
    } catch (err: any) {
      alert("Submission failed. Please try again.");
    }
  };
  return (
    <section className="w-full bg-[#4DB6AC] py-16 md:py-20 px-4 md:px-8"
      style={{
          backgroundImage: `url(assets/154465906a86e9abb2111c1fddf397d04d59de3e.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      
      >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Heading */}
          <div>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-none mb-3"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              Join Our Network
            </h2>
            <p 
              className="text-[20px] md:text-[16px] text-white font-regular uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Subscribe to our newsletter
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              {/* <div className="flex gap-3">
                <input
                  type="name"
                  placeholder="Enter Your Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="flex-1 px-6 py-4 rounded-lg text-gray-700 bg-[#ffffff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F15A2B]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                <input
                  type="mobile"
                  placeholder="Enter Your Mobile"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="flex-1 px-6 py-4 rounded-lg text-gray-700 bg-[#ffffff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F15A2B]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div> */}
              <input 
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 px-6 py-4 rounded-lg text-gray-700 bg-[#ffffff] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F15A2B]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              <button 
              onClick={handleSubmit}
                className="bg-[#F15A2B] hover:bg-[#d94f24] text-white font-bold uppercase px-8 py-4 rounded-lg transition-all duration-300 whitespace-nowrap"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Subscribe
              </button>
            </div>
            <p 
              className="text-sm text-white/90 text-center sm:text-left"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              By subscribing, you agree to our privacy policy
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
