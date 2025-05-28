import React from "react";

const CustomerSatisfactionSection = ({ satisfactionData }) => {
  const { satisfactionRate, averageRating, verifiedReviews, recommendationRate } =
    satisfactionData;

  return (
    <div className="mb-16 px-8">
      <h2 className="text-2xl font-semibold mb-6">Customer Satisfaction</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-lg border border-slate-300 bg-white text-card-foreground shadow-sm">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-[#2B3A8C] mb-2">
              {satisfactionRate}%
            </div>
            <p className="text-gray-600">Customer Satisfaction Rate</p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-300 bg-white text-card-foreground shadow-sm">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-[#2B3A8C] mb-2">
              {averageRating}/5
            </div>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-300 bg-white text-card-foreground shadow-sm">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-[#2B3A8C] mb-2">
              {verifiedReviews}+
            </div>
            <p className="text-gray-600">Verified Reviews</p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-300 bg-white text-card-foreground shadow-sm">
          <div className="p-6 text-center">
            <div className="text-4xl font-bold text-[#2B3A8C] mb-2">
              {recommendationRate}%
            </div>
            <p className="text-gray-600">Would Recommend to Friends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfactionSection;