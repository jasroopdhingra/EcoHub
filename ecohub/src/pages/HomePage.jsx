import React from 'react';
import greenBuildings from '../assets/green-buildings.jpeg';
import css from "../styles/HomePage.module.css";
import HomePageNavbar from './HomePageNavbar';


function HomePage() {
    return (
    
    <main className ={css.main}>
        <HomePageNavbar />
        <img src={greenBuildings} alt="Green buildings with plants" class={css.image}/>
        
    </main>
    );
}

export default HomePage;