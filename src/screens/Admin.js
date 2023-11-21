import React, { useEffect } from 'react';
import OrderCard from '../components/Order_Card'; // Adjust the path accordingly
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { useState } from 'react';

export default function App() {
  
    const [food_data, setfood_data] = useState([]);
    useEffect(() => {
        // Using useEffect to load data when the component mounts
        loadFoodItems();
      },); // The empty dependency array ensures the effect runs only once on mount
    
    const loadFoodItems = async () => {
        let response = await fetch("https://kanteen.onrender.com/get_all_orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setfood_data(response.data);
        console.log(food_data)
    }
  return (
    <div>
      
     
      {food_data.map((orderDetails) => (
        <  OrderCard key={orderDetails.__id} email={orderDetails.email} order_data={orderDetails.order_data} orderId={orderDetails._id} />
      ))}
    </div>
  );

}