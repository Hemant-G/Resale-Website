import React from 'react';

const FeaturedTestimonialCard = ({ name, location, imageSrc, quote, model, duration, rating }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-1/2 snap-center px-4 py-8 md:p-8">
      <div className="flex flex-col h-full bg-white rounded-xl shadow-sm p-6">
        <div className="text-blue-900 mb-4">
          {/* Quote icon */}
          <svg className="w-10 h-10 opacity-20 fill-current" viewBox="0 0 24 24">
            <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
          </svg>
        </div>
        <p className="text-lg italic text-gray-700 mb-6">"{quote}"</p>
        <div className="mt-auto flex items-center">
          <img src={imageSrc} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-500">{location}</p>
            <div className="flex items-center mt-1">
              <div className="flex text-yellow-400">
                {/* Star icons */}
                {[...Array(rating)].map((_, index) => (
                  <svg key={index} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                ))}
                {[...Array(5 - rating)].map((_, index) => (
                  <svg key={`empty-${index}`} className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 24 24">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">{model}</span>
              <span className="text-xs text-gray-500 ml-1">|</span>
              <span className="text-xs text-gray-500 ml-1">{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTestimonialCard;