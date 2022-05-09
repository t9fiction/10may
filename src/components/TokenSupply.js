import React from 'react';
import { GlobalStore } from '../context/GlobalState';

export const TokenSupply = () => {
    const { loaded, tokenSupply } = GlobalStore();
    // console.log("Total Supply", getTotalSupply())
  return <div>
    {loaded ? <h3 className="title">Available BUSD : {tokenSupply}</h3> : <h3>State Loading...</h3>}
  </div>;
};
