import { process } from '../data/homeConstant'

const Process = () => {
    return (
        <section id="process" className="section" style={{ background: "#efece2" }}>
            <div className="wrap">
            <p className="section-eyebrow">FROM SCAN TO SIGNATURE</p>
            <h2 className="h2">How a walkthrough becomes a decision</h2>
            <div className="process-grid">
                {process.map((p) => (
                <div className="discover-col" key={p.step}>
                    <span className="step-num">{p.step}</span>
                    <h3 className="step-label">{p.label}</h3>
                    <p className="discover-note">{p.body}</p>
                </div>
                ))}
            </div>
            </div>
        </section>
    )
}

export default Process
