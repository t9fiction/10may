import React from 'react'
import aboutMeImage from "../assets/man.jpg"

export const AboutMe = () => {
    return (
        <div className='about-me' id="about">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <img src={aboutMeImage} alt="aboutMeImage" className="side-image"/>
                    </div>
                    <div className="col-md-8">
                        <h2 className="graph-title">About Me</h2>
                        <p>
                            My name is Noah H., I'm from Germany and 25 years old. I love to ride my motorcycle on warm summer days, and to travel around the world is one of my biggest dreams. I went to school, was running through a job training and currently I do three shifts at an international factory. I always knew I wanted more out of life. Last year I started to learn more about investing money and alongside founded my own liqueur brand.</p>

                        <p>Unfortunately, the corona measures in Germany got worse and the clubs and bars had to stay closed. Additionally, I got some problems with my supplier and he didn't deliver for about four months, what caused the loss of my major customer. In October 2021 I read something about NFTs for the first time. Since then, I started to learn more about that subject and pondered on how to start my own project which has a high value for customers and myself at the same time. In the eyes of most people, value equals money, but I think there are a lot of other valuable things to incorporate in a business. For example, having a network that may help you with some problems that might occur, to save time for more fun activities like time with your friends and family, or even getting to know new people who eventually become friends all over the world.</p>
                            <p>I have a lot of Ideas for other projects, but I'm greatly concerned about this one.
                            It's not a real NFT project, but I think everyone knows how important a good network is in terms of running a business, and how long it takes to build on, especially international.</p>
                            <p>Lastly, it depends on how advantageous and how profitable it is for you in the end.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
