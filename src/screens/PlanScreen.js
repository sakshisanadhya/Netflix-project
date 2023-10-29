import React, { useState } from 'react';
import useRazorpay from 'react-razorpay';
import './Planscreen.css';

const PlanScreen = () => {
  const [Razorpay] = useRazorpay();
  const [order, setOrder] = useState(null);

  const createOrder = async (params) => {
    // Send a request to your server to create an order
    const response = await fetch('http://localhost:8000/api/create_order', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Your response should include an `id` field for the order ID
    } else {
      throw new Error('Failed to create order');
    }
  };

  const handlePayment = async (plan) => {
    const orderData = {
      // Include your order data here
    };

    try {
      const order = await createOrder(orderData);

      const options = {
        key:'rzp_test_LG32v23HNZfzQM',
        key_secret:'cj7ooERKyCuHLHXcFCgb3WgV',
        amount: order.amount,
        currency: order.currency,
        name: 'Netflix Clone',
        description: `Subscription for ${plan} plan`,
        order_id: order.id,
        handler: function (response) {
          alert('Payment successful');
          // You can update the user's plan in Firebase here
        },
        prefill: {
          name: 'Piyush Garg',
          email: 'youremail@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new Razorpay(options);

      rzp.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp.open();
    } catch (error) {
      alert('Error creating order: ' + error.message);
    }
  };

  return (
    <div>
      <div className="plan">
        <h2>Basic </h2>
        <p>720p</p>
        <button className="button"onClick={() => handlePayment('Basic')}>Subscribe</button>

      </div>

      <div className="plan">
        <h2>Standard </h2>
        <p>1080p</p>
        <button className="button" onClick={() => handlePayment('Standard')}>Subscribe</button>

      </div>

      <div className="plan">
        <h2>Premium</h2>
        <p>4K + HDR</p>
        <button  className="button" onClick={() => handlePayment('Premium')}>Subscribe</button>

      </div>
    </div>
  );
};

export default PlanScreen;
