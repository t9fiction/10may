import React from 'react'
import whatWeDoImage from "../assets/logo.png";

export const WhatWeDo = () => {
    return (
        <div className='whatwedo'>
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <h2 className="graph-title">What We Do</h2>
                        <p>On this website, I would like to introduce you to myself and my new project.<br/>This is only interesting for entrepreneurs with a running business. My goal is to generate benefit for all members and to help future entrepreneurs to avoid all the mistakes and failures we painfully had to learn from. This project brings strong people together. At first, I would like to introduce myself to you.
</p>
                    </div>
                    <div className="col-md-5">
                        <img src={whatWeDoImage} alt="whatWeDoImage" className="side-image"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
