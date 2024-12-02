import React from "react";
import "./Hero.css";
import headerPhoto from "../../../components/image/header.png";

function Hero() {
    return (
        <div className="hero">   
            <img className="hero-photo" src={headerPhoto}/>
            <article>
                <h1>
                    Heading
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa culpa earum expedita totam dolores molestias sed laboriosam ab rerum, consequuntur aspernatur, tempore quos placeat impedit blanditiis officiis natus voluptate quasi exercitationem cupiditate. 
                    Suscipit recusandae perferendis, incidunt mollitia debitis error similique! 
                </p>
            </article>
        </div>
    )
}

export default Hero;