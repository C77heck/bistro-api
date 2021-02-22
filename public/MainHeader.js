import React from 'react';
import CTAButton from './CTAButton';


const MainHeader = () => {


    return (
        <header className='header'>
                
            <div className='header__name'>
                <h1>
                    <span className='header__name--1'>
                    El poco loco
                    </span>
                    <span className='header__name--2'>
                        Bistro Étterem
                    </span>
                </h1>
            </div>
            <CTAButton />
        </header>
    )
}

export default MainHeader;