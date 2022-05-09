import React, { useState } from 'react'
import { GlobalStore } from '../context/GlobalState';

export const RejectApp = () => {
    const { rejectApplication, setAppNumber, appNumber } = GlobalStore();
    
    const handleSubmit = async () => {
        try {
          // console.log("Appnumber ",appNumber);
          // console.log("To Account ",toAccount);
          rejectApplication();
        } catch (error) {
          console.log("error", error);
        }
      }
  return (
    <div>
        <br/>
        <button className="meta-btn" onSubmit={handleSubmit}>Reject Application</button>
    </div>
  )
}
