import React from 'react'
import Secene from '../components/common/Secene'
import SearchCard from '../components/common/SearchCard'

const Header = () => {
    return (
        <header id="home" className="hero">
            <div className="hero-bg" />
            <div className="hero-particles">
                {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="hero-particle" style={{ left: `${(i * 7 + 4) % 100}%`, animationDelay: `${i * 0.6}s` }} />
                ))}
            </div>
            
            <div className="hero-inner">
                <div className="hero-content">
                    <div className="wrap">
                        <p className="eyebrow">FIND A HOME, THEN STEP INSIDE IT</p>
                        <h1 className="h1">Search the market. Walk through the shortlist.</h1>
                        <p className="lead">
                            Every listing on Parallax comes with a 360° tour, AR customization
                            and a full VR walkthrough — so you can search like any portal,
                            but decide with far more confidence.
                        </p>
                        <SearchCard />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
