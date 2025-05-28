import React, { useState } from 'react';

const DetailedTestimonialCard = ({ name, location, imageSrc, quote, model, duration, date, rating }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starFilled = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star fill-yellow-400 w-4 h-4">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
    );

    const starHalfFilled = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star-half fill-yellow-400 w-4 h-4">
        <path d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2" />
      </svg>
    );

    const starEmpty = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-4 h-4 text-gray-300">
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
      </svg>
    );

    for (let i = 0; i < fullStars; i++) {
      stars.push(<React.Fragment key={`full-${i}`}>{starFilled}</React.Fragment>);
    }

    if (hasHalfStar) {
      stars.push(<React.Fragment key="half">{starHalfFilled}</React.Fragment>);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<React.Fragment key={`empty-${i}`}>{starEmpty}</React.Fragment>);
    }

    return stars;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="rounded-lg border border-slate-300 bg-white text-card-foreground shadow-sm overflow-hidden h-full">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <img src={imageSrc} alt={name} className="w-12 h-12 rounded-full object-cover mr-3" />
            <div>
              <h4 className="font-semibold">{name}</h4>
              <p className="text-xs text-gray-500">{location}</p>
            </div>
          </div>
          <div className="flex text-yellow-400">{renderRatingStars()}</div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            {isExpanded ? quote : `${quote.substring(0, 100)}...`}
          </p>
          {quote.length > 100 && (
            <button onClick={toggleExpand} className="text-sm text-[#2B3A8C] mt-2 hover:underline">
              {isExpanded ? 'View less' : 'Read more'}
            </button>
          )}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div>
            <span className={`bg-blue-50 text-[#2B3A8C] px-2 py-1 rounded-full`}>{model}</span>
            <span className="ml-2">{duration}</span>
          </div>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedTestimonialCard;