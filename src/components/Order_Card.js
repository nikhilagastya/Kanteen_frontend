import React, { useState } from 'react';

export default function OrderCard({ email, order_data, orderId }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const cardStyle = {
    border: '2px solid #ccc',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: 'black',
    display: isCompleted ? 'none' : 'block', // Hide the card when order is completed
  };

  const orderItemStyle = {
    marginBottom: '8px',
  };

  const completeOrderButtonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  const orderItems = order_data.map((item) => (
    <div key={item.id} style={orderItemStyle}>
      <p>{item.name} - {item.qty} x {item.size}</p>
      <p>Price: {item.price}</p>
    </div>
  ));

  const handleCompleteOrder = async () => {
    try {
      // Make a fetch request to your server's delete route
      await fetch(`https://kanteen.onrender.com/delete_order/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
      });

      // Set the state to indicate that the order is completed
      setIsCompleted(true);
    } catch (error) {
      console.error('Error completing order:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div style={cardStyle}>
      <h2>{email}</h2>
      <p><strong>Order ID:</strong> {orderId}</p>
      <div><strong>Order Items:</strong>{orderItems}</div>
      <button style={completeOrderButtonStyle} onClick={handleCompleteOrder}>Complete Order</button>
    </div>
  );
}
