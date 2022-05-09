import './App.css';
import { ConnectWallet } from './components/ConnectWallet';
import {Header} from './components/Header';
import {Footer} from "./components/Footer";
import {Project} from './components/Project';
import {HeaderText} from './components/HeaderText';
import { AboutMe } from './components/AboutMe';
import { WhatWeDo } from './components/WhatWeDo';
import { Instruction } from './components/Instruction';


function App() {
  return (
    <>
    <div className="App">
      <Header />
      <HeaderText />
      <ConnectWallet />
      <WhatWeDo />
      <AboutMe />
      <Project />
      <Instruction />
      <Footer/>
    </div>
    </>
  );
}

export default App;
