import { modules } from '../data/homeConstant'

const Modules = () => {
    return (
        <section id="modules" className="section">
            <div className="wrap">
            <p className="section-eyebrow">BROWSE BY EXPERIENCE</p>
            <h2 className="h2">Three ways to explore every listing</h2>
            <div className="module-grid">
                {modules.map((m) => (
                <div className="module-card" key={m.id}>
                    <span className="module-tag">{m.tag}</span>
                    <h3 className="module-title">{m.title}</h3>
                    <p className="module-body">{m.body}</p>
                    <a className="module-cta" href={m.link}>{m.cta} →</a>
                </div>
                ))}
            </div>
            </div>
        </section>
    )
}

export default Modules
