import React from 'react'
import { GlobalStore } from '../context/GlobalState';
import { InfoForm } from './InfoForm';
import { Project } from './Project';
import { TokenSupply } from './TokenSupply';

export const ConnectWallet = () => {
  const { currentAccount, connectWallet } = GlobalStore();
  return <div className='container'>
    {currentAccount &&
        <div className="account-action">
          <TokenSupply />
          <InfoForm />
        </div>
    }
      </div>;
}
