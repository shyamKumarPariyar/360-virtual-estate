import Reveal from "./Reveal"

const Start = () => {
    return (
        <section id="cta" className="cta">
            <div className="wrap">
                <Reveal as="h2" className="h2 h2--light" style={{ marginBottom: "0.9rem" }}>Ready to walk through your next home?</Reveal>
                <Reveal as="p" className="lead" delay={80} style={{ margin: "0 auto 1.6rem", textAlign: "center" }}>No headset required to start — begin with a 360° tour in your browser.</Reveal>
                <Reveal as="div" delay={160}><a href="/property/1"  className="cta-btn">Start a Virtual Tour</a></Reveal>
            </div>
        </section>
    )
}

export default Start
