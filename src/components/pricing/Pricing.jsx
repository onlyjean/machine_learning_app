import React from 'react';
import PlanCard from './PlanCard';
import './pricing.css';

const Pricing = ({isAuthenticated}) => {
  return (
    <div className="pricing-container section__padding">
      <div className="pricing-header gradient__text">
        <h1 id='pricing'>Pricing</h1>
        <p>
          Subscribe for our premium plan and get access to all our features.
        </p>
      </div>
      
      <div className="pricing-plans">
        <PlanCard
          isAuthenticated={isAuthenticated}
          color="#C264FF"
          name="Premium"
          description="Get more advanced"
          price="10"
          features={['Real-Time Predictions', 'Online Machine Larning Models', 'Unlimited Predictions']}
          buttonText="Start Premium Plan"
        />
      </div>
    </div>
  );
}

export default Pricing
