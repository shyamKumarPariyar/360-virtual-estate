const Footer = () => {
    return (
        <footer className="footer">
            <div className="wrap footer-row">
            <div>
                <span className="footer-brand">360 VirtualEstate</span>
                <p className="footer-text">Immersive tours, customization and walkthroughs for real estate decisions.</p>
            </div>
            <div><p className="footer-text">© {new Date().getFullYear()} All rights reserved.</p></div>
            </div>
        </footer>
    )
}

export default Footer
