import ARModelGrid from "../components/ar/ARMOdelGrid";
import HeroAR from "../components/ar/HeroAR";

export default function ARPage() {
  return (
    <main className="ar-page">

      <HeroAR/>

      <ARModelGrid filter="Housing" allowResize />

    </main>
  );
}