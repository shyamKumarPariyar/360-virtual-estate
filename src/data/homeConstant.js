export const modules = [
    { id: "tour", link: '/property/1', tag: "360°", title: "Virtual Tours", body: "Walk every room at your own pace, before you book a viewing.", cta: "Browse tours" },
    { id: "ar", link: '/ar', tag: "AR", title: "Customization", body: "Swap flooring, paint and furniture, at true scale, in the actual room.", cta: "Try customizing" },
    { id: "vr", link: '/property/1', tag: "VR", title: "Walkthroughs", body: "Step inside with a headset for a full-scale spatial walkthrough.", cta: "Start a walkthrough" },
];

export const discover = [
    { group: "In the city", note: "Live among the hustle and bustle", places: ["London", "Manchester", "Edinburgh", "Cardiff"] },
    { group: "On the coast", note: "Wake up to fresh air and sea views", places: ["Brighton", "Bristol", "Plymouth", "Southampton"] },
    { group: "Rural & countryside", note: "Close to nature, further from the noise", places: ["Cotswolds", "Kent", "Devon", "Cornwall"] },
];

export const process = [
    { step: "01", label: "Capture", body: "The property is scanned into a navigable 360° tour." },
    { step: "02", label: "Customize", body: "The buyer adjusts finishes and furniture in AR." },
    { step: "03", label: "Walk Through", body: "The customized space is explored in VR, full scale." },
    { step: "04", label: "Decide", body: "With a clearer picture, the buyer moves forward with confidence." },
];

export const scenes = [
    { id: "apartment", label: "Living Room", url: "/rendered/livingroom_1.jpg", credit: "\u201cCombination Room\u201d by Sergej Majboroda / Poly Haven \u2014 CC0" },
    { id: "lounge", label: "Spaced Modern Corporate Apartment", url: "/rendered/corporate_apartment.jpg", credit: "\u201cBig Spaced Corporate Apartment\u201d by Greg Zaal" },
    { id: "modern-apartment", label: "Modern Apartment", url: "/rendered/modern_apartment.jpg", credit: "\u201cOpen space modern apartment\u201d by Dario Barresi" },
    { id: "tiny-appartment", label: "Living Room", url: "/rendered/tiny_apartement.jpg", credit: "\u201cCombination Room\u201d by Sergej Majboroda" },
    { id: "lounge", label: "Wooden Lounge", url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/wooden_lounge.jpg", credit: "\u201cWooden Lounge\u201d by Greg Zaal" },
    { id: "glass", label: "Glasshouse", url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/glasshouse_interior.jpg", credit: "\u201cGlasshouse Interior\u201d by Dario Barresi" },
];

export const properties = [
    { id: 1, price: "£450,000", type: "2 bed semi-detached house", place: "Clapham, London", beds: 2, baths: 2, tag: "NEW", floorLevel: 0, cameraFacing: 107, camera: {x: 1.55, y: 1.2, z: 2.35}, scene: 0, ar: true, vr: true, model: '/models/apartment.glb' },
    { id: 2, price: "£895,000", type: "corporate apartment", place: "Chorlton, Manchester", beds: 4, baths: 3, tag: "REDUCED", floorLevel: 0, cameraFacing: 107, camera: {x: 0, y: 25, z: 0}, scene: 1, ar: true, vr: true, model: '/models/corporate_apartment.glb' },
    { id: 3, price: "£310,000", type: "1 bed open space apartment", place: "Leith, Edinburgh", beds: 1, baths: 1, tag: null, floorLevel: 0.05, cameraFacing: 107, camera: {x: 0, y: 1.5, z: 0}, scene: 2, ar: false, vr: true, model: '/models/modern_apartment.glb' },
    { id: 4, price: "£50,000", type: "Loft living room", place: "The Cotswolds", beds: 5, baths: 4, tag: "NEW", floorLevel: 0, cameraFacing: 107, camera: {x: 0, y: 1, z: 0}, scene: 3, ar: true, vr: true, model: '/models/loft_13_living_room_interior.glb' },
    { id: 5, price: "£265,000", type: "1 bed flat", place: "Kemptown, Brighton", beds: 1, baths: 1, tag: "CHAIN FREE", floorLevel: 0, cameraFacing: 107, camera: {x: 0, y: 0, z: 0}, scene: 4, ar: false, vr: false },
    { id: 6, price: "£540,000", type: "3 bed terraced house", place: "Clifton, Bristol", beds: 3, baths: 2, tag: null, floorLevel: 0, cameraFacing: 107, camera: {x: 2, y: 1, z: 2}, scene: 5, ar: true, vr: false },
];

export const filters = ["All", "Houses", "Flats", "New builds"];
