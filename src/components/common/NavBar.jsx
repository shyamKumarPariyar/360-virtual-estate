import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ARNavButton from './ARButton';

const NavBar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
            <div className="wrap nav-row">
            {/* <a className="brand" href="#home">360 VirtualEstate</a> */}
            <Link to='/' className='brand' >360 VirtualEstate</Link>
            <ul className={`nav-links ${navOpen ? "nav-links--open" : ""}`}>
                <li>
                    {/* <a href="#properties" onClick={() => setNavOpen(false)}>Properties</a> */}
                <Link to='/properties' onClick={() => setNavOpen(false)} >Properties</Link>
                </li>
                {/* <li>
                    <a href="#modules" onClick={() => setNavOpen(false)}>About Us</a>
                <Link to='/about-us' >About Us</Link>
                </li> */}
                <li><a href="/property/1" onClick={() => setNavOpen(false)}>Start a Tour</a></li>
                <li onClick={() => setNavOpen(false)}><ARNavButton /></li>
            </ul>
            <button
                className={`nav-toggle ${navOpen ? "nav-toggle--open" : ""}`}
                onClick={() => setNavOpen(!navOpen)}
                aria-label="Toggle menu"
                aria-expanded={navOpen}
            >
                <span className="nav-toggle-bar" />
                <span className="nav-toggle-bar" />
                <span className="nav-toggle-bar" />
            </button>
            </div>
        </nav>
    )
}

export default NavBar
