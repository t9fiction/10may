import React, { useState } from 'react'
import { GlobalStore } from '../context/GlobalState';

export const AcceptApp = () => {
    const { acceptApplication, setAppNumber, appNumber } = GlobalStore();
    
    const handleSubmit = () => {
        try {
          // console.log("Appnumber ",appNumber);
          // console.log("To Account ",toAccount);
          acceptApplication();
          console.log('accept Application');
        } catch (error) {
          console.log("error accept app", error);
        }
      }
  return (
    <div>
        <br/>
        <button className="meta-btn" onSubmit={handleSubmit()}>Accept Application</button>
    </div>
  )
}
