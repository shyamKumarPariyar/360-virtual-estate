import { discover } from "../data/homeConstant"

const Discover = () => {
    return (
        <section id="discover" className="section" style={{ background: "#efece2" }}>
            <div className="wrap">
                <p className="section-eyebrow">DISCOVER TOWNS AND CITIES</p>
                <h2 className="h2">Wherever you're looking, tour it before you go</h2>
                <div className="discover-grid">
                    {discover.map((d) => (
                    <div className="discover-col" key={d.group}>
                        <h3>{d.group}</h3>
                        <p className="discover-note">{d.note}</p>
                        <div className="discover-pills">
                        {d.places.map((p) => (
                            <a className="discover-pill" href="#" key={p} onClick={(e) => e.preventDefault()}>{p}</a>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Discover
