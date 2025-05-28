import React, { useState } from "react";
import FeaturedTestimonialCard from "./FeaturedTestimonialCard";
import DetailedTestimonialCard from "./DetailedTestimonialCard";
import CustomerSatisfactionSection from "./CustomerSatisfactionSection";
import { useNavigate } from "react-router";

const TestimonialsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  // Sample data for featured testimonials (using the simpler card)
  const featuredTestimonials = [
    {
      name: "Rajiv Sharma",
      location: "Mumbai, Maharashtra",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      quote:
        "The SMG Voyager has transformed my daily commute. The acceleration is impressive and the range is more than enough for my needs. I'm saving a lot on fuel costs compared to my previous petrol scooter.",
      model: "SMG Voyager",
      duration: "6 months",
      rating: 5,
    },
    {
      name: "Arjun Nair",
      location: "Kochi, Kerala",
      imageSrc:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
      quote:
        "The build quality of the SMG Velocity is exceptional. After owning it for over a year, I've had zero issues with performance or reliability. The premium features like hill hold assist and reverse mode are game-changers.",
      model: "SMG Velocity",
      duration: "14 months",
      rating: 5,
    },
  ];

  // Sample data for more detailed testimonials
  const detailedTestimonials = [
    {
      name: "Rajiv Sharma",
      location: "Mumbai, Maharashtra",
      imageSrc:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      quote:
        "The SMG Voyager has transformed my daily commute. The acceleration is impressive and the range is more than enough for my needs. I'm saving a lot on fuel costs compared to my previous petrol scooter.",
      rating: 5,
      model: "SMG Voyager",
      duration: "6 months",
      date: "February 15, 2024",
      videoUrl: null,
    },
    {
      name: "Arjun Nair",
      location: "Kochi, Kerala",
      imageSrc:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
      quote:
        "The build quality of the SMG Velocity is exceptional. After owning it for over a year, I've had zero issues with performance or reliability. The premium features like hill hold assist and reverse mode are game-changers.",
      rating: 5,
      model: "SMG Velocity",
      duration: "14 months",
      date: "August 22, 2023",
      videoUrl: null,
    },
    {
      name: "Priya Patel",
      location: "Bangalore, Karnataka",
      imageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      quote:
        "I was initially skeptical about switching to electric, but the SMG Aero exceeded all my expectations. It's quiet, smooth, and surprisingly powerful. The app connectivity features are also very useful.",
      model: "SMG Aero",
      duration: "1 year",
      date: "December 8, 2023",
      rating: 4.5,
    },
    {
      name: "Ananya Singh",
      location: "Delhi, NCR",
      imageSrc:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
      quote:
        "As a first-time scooter owner, I found the SMG Aero to be perfect for navigating Delhi's busy streets. It's lightweight, easy to handle, and the battery life is sufficient for my weekly needs on a single charge.",
      model: "SMG Aero",
      duration: "3 months",
      date: "March 5, 2024",
      rating: 4,
    },
    {
      name: "Rahul Verma",
      location: "Jaipur, Rajasthan",
      imageSrc:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
      quote:
        "The SMG Aero handles Jaipur's roads surprisingly well. The suspension is comfortable even on rougher patches, and the scooter feels sturdy and well-built. Charging infrastructure was a concern, but the range is good enough that I rarely have anxiety.",
      model: "SMG Aero",
      duration: "5 months",
      date: "October 12, 2023",
      rating: 4,
    },
    {
      name: "Deepa Menon",
      location: "Kolkata, West Bengal",
      imageSrc:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1970&auto=format&fit=crop",
      quote:
        "As someone who was hesitant about electric vehicles, I'm now a convert thanks to the SMG Aero. The transition was smooth, and the lower running costs make a significant difference to my monthly expenses.",
      model: "SMG Aero",
      duration: "6 months",
      date: "December 22, 2023",
      rating: 4,
    },
    {
      name: "Vikram Mehta",
      location: "Pune, Maharashtra",
      imageSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      quote:
        "The SMG Velocity is a head-turner! I get compliments everywhere I go. But it's not just about looks - the performance is stellar, and the after-sales service has been excellent.",
      model: "SMG Velocity",
      duration: "8 months",
      date: "January 15, 2024",
      rating: 5,
    },
    {
      name: "Sarika Joshi",
      location: "Ahmedabad, Gujarat",
      imageSrc:
        "https://images.unsplash.com/photo-1532170579297-281918c8ae72?q=80&w=1984&auto=format&fit=crop",
      quote:
        "I bought the SMG Velocity primarily for its premium features and haven't been disappointed. The touchscreen display is responsive and intuitive, and the connected app makes tracking my rides and battery status very convenient.",
      rating: 5,
      model: "SMG Velocity",
      duration: "1 month",
      date: "April 3, 2024",
      videoUrl: "video_review_available",
    },
    {
      name: "Kavita Reddy",
      location: "Hyderabad, Telangana",
      imageSrc:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
      quote:
        "I've been commuting on my SMG Voyager for almost a year now. The best part is how little maintenance it requires compared to my previous petrol scooter. The cost savings are substantial!",
      rating: 4.5,
      model: "SMG Voyager",
      duration: "11 months",
      date: "January 30, 2024",
      videoUrl: null,
    },
    {
      name: "Neha Kapoor",
      location: "Chandigarh, Punjab",
      imageSrc:
        "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1989&auto=format&fit=crop",
      quote:
        "I use my SMG Voyager for daily commuting and weekend rides around Chandigarh. The balance between performance and comfort is perfect, and I appreciate the attention to detail in the design and functionality.",
      rating: 4.5,
      model: "SMG Voyager",
      duration: "2 months",
      date: "March 18, 2024",
      videoUrl: "video_review_available",
    },
    {
      name: "Manoj Kumar",
      location: "Chennai, Tamil Nadu",
      imageSrc:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
      quote:
        "The SMG Voyager's performance in Chennai's hot climate has been impressive. No battery degradation issues even in peak summer. The cooling system works efficiently, and the range remains consistent throughout the year.",
      rating: 4.5,
      model: "SMG Voyager",
      duration: "4 months",
      date: "February 28, 2024",
      videoUrl: null,
    },

    {
      name: "Sanjay Trivedi",
      location: "Lucknow, Uttar Pradesh",
      imageSrc:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1980&auto=format&fit=crop",
      quote:
        "The SMG Velocity is worth every rupee for the premium experience it delivers. From the moment I test rode it, I knew this was a cut above other electric scooters on the market. The performance and features justify the price.",
      rating: 5,
      model: "SMG Velocity",
      duration: "3 months",
      date: "January 15, 2024",
      videoUrl: null,
    },
  ];

  const CustomerSatisfaction = {
    satisfactionRate: 96,
    averageRating: "4.8",
    verifiedReviews: 5000,
    recommendationRate: 92,
  };

  const filteredDetailedTestimonials =
    activeFilter === "all"
      ? detailedTestimonials
      : detailedTestimonials.filter(
          (testimonial) => testimonial.model === activeFilter
        );

  const handleFilterClick = (model) => {
    setActiveFilter(model);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="flex-grow pt-20 pb-16 px-2">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-700 mb-4">
              <span className="text-blue-900">Customer</span> Testimonials
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied customers about their experiences with our
              electric scooters
            </p>
          </div>

          {featuredTestimonials.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">Featured Stories</h2>
              <div className="relative overflow-hidden bg-white rounded-xl shadow-sm">
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6">
                  {featuredTestimonials.map((testimonial, index) => (
                    <FeaturedTestimonialCard key={index} {...testimonial} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            {filteredDetailedTestimonials.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">More Reviews</h2>
               /// navbar
              <nav className="h-10 items-center rounded-md bg-gray-100 p-1 text-gray-500 w-full flex justify-start overflow-x-auto mb-8">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === "all"}
                  aria-controls="content-all"
                  data-state={activeFilter === "all" ? "active" : "inactive"}
                  id="trigger-all"
                  className={`inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    activeFilter === "all"
                      ? "bg-white text-gray-900 shadow-sm"
                      : ""
                  }`}
                  aria-label="All Reviews"
                  onClick={() => handleFilterClick("all")}
                >
                  All Reviews
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === "SMG Aero"}
                  aria-controls="content-Aero"
                  data-state={
                    activeFilter === "SMG Aero" ? "active" : "inactive"
                  }
                  id="trigger-Aero"
                  className={`inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    activeFilter === "SMG Aero"
                      ? "bg-white text-gray-900 shadow-sm"
                      : ""
                  }`}
                  aria-label="SMG Aero Reviews"
                  onClick={() => handleFilterClick("SMG Aero")}
                >
                  SMG Aero
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === "SMG Voyager"}
                  aria-controls="content-Voyager"
                  data-state={
                    activeFilter === "SMG Voyager" ? "active" : "inactive"
                  }
                  id="trigger-Voyager"
                  className={`inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    activeFilter === "SMG Voyager"
                      ? "bg-white text-gray-900 shadow-sm"
                      : ""
                  }`}
                  aria-label="SMG Voyager Reviews"
                  onClick={() => handleFilterClick("SMG Voyager")}
                >
                  SMG Voyager
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === "SMG Velocity"}
                  aria-controls="content-Velocity"
                  data-state={
                    activeFilter === "SMG Velocity" ? "active" : "inactive"
                  }
                  id="trigger-Velocity"
                  className={`inline-flex items-center justify-center cursor-pointer whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    activeFilter === "SMG Velocity"
                      ? "bg-white text-gray-900 shadow-sm"
                      : ""
                  }`}
                  aria-label="SMG Velocity Reviews"
                  onClick={() => handleFilterClick("SMG Velocity")}
                >
                  SMG Velocity
                </button>
              </nav>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDetailedTestimonials.map((testimonial, index) => (
                  <DetailedTestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>
          )}
          {filteredDetailedTestimonials.length === 0 &&
            activeFilter !== "all" && (
              <p className="text-gray-500 text-center">
                No reviews found for {activeFilter}.
              </p>
            )} 
          
          
          */}

            

        </div>
      </main>

      {/* Share your experience */}
      <div className="bg-[#2B3A8C]/5 rounded-xl p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Share Your Experience
            </h2>
            <p className="text-gray-600 mb-6">
              Are you an SMG scooter owner? We'd love to hear about your
              experience with our products. Your feedback helps us improve and
              assists other customers in making informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center text-white justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer h-10 px-4 py-2 bg-[#2B3A8C]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-messages-square w-4 h-4 mr-2"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
                Submit Your Review
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border bg-background hover:bg-accent cursor-pointer hover:text-accent-foreground h-10 px-4 py-2 text-[#2B3A8C] border-[#2B3A8C]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user w-4 h-4 mr-2"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Join Community
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=1470&auto=format&fit=crop"
              alt="Community"
              className="rounded-lg w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B3A8C]/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Customer Satisfaction Section */}
      <CustomerSatisfactionSection satisfactionData={CustomerSatisfaction} />

      {/* Ready to experience the future of mobility */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Experience the Future of Mobility?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who've made the switch to
          electric mobility with SMG scooters. Book a test ride today and see
          the difference for yourself.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-white font-medium cursor-pointer h-10 px-4 py-2 bg-[#2B3A8C]">
            Book a Test Ride
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 cursor-pointer px-4 py-2 text-[#2B3A8C] border border-[#2B3A8C]"
            onClick={() => navigate("/buy")}
          >
            Explore Models
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2 w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
