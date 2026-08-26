
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
                            Every listing on Parallax comes with a 360° virtual tour, a full 3D walkthrough and AR visualisation — so you can search like any portal, then find out what the photographs left out before you spend a Saturday on a viewing..
                        </p>
                        <SearchCard />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
