import React from 'react'
import { GlobalStore } from '../context/GlobalState';
import headLogo from "../assets/logo.png"

export const Header = () => {
    const { connectWallet, getEtherContract, getDAIContract, setLoaded, currentAccount } = GlobalStore();
  return (
    <header className="App-header">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <img src={headLogo} className="App-logo1" alt="headLogo"/>
                    <div className="nav-bar">
                        <a href="/">Home</a>
                        <a href="#project">Project</a>
                        <a href="#about">AboutMe</a>
                        {!currentAccount ?
                        <button onClick={async() => {
                        await getEtherContract();
                        await getDAIContract();
                        setLoaded(true);
                        connectWallet()
                        }} className="meta-btn">Connect Wallet</button> : <button className="meta-btn">Connected</button>
                    }
                    </div>
                </div>
            </div>
        </div>
      </header>
  )
}
