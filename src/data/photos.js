
const ASSETS_BASE_URL = 'https://360-virtual-estate.s3.eu-north-1.amazonaws.com'

export const PROPERTY_2D = {
    1: {
        title: 'Two-bedroom apartment',
        summary: '2 bed · 1 bath · 68 m²',
        items: [
            { src: `${ASSETS_BASE_URL}/2d-rendered/livingroom_1.jpg`, kind: 'photo', room: 'Living Room', alt: 'Living room looking toward the television wall' },
            { src: `${ASSETS_BASE_URL}/2d-rendered/livingroom_2.jpg`, kind: 'photo', room: 'Living Room', alt: 'Living room looking toward the kitchen' },
            { src: `${ASSETS_BASE_URL}/2d-rendered/livingroom_3.jpg`, kind: 'photo', room: 'Living Room',     alt: 'Kitchen counter and appliances' },
            { src: `${ASSETS_BASE_URL}/2d-rendered/bedroom1.jpg`, kind: 'photo', room: 'Bedroom 1',   alt: 'Main bedroom from the doorway' },
            { src: `${ASSETS_BASE_URL}/2d-rendered/bedroom2.jpg`, kind: 'photo', room: 'Bedroom 2',   alt: 'Second bedroom from the doorway' },
            { src: `${ASSETS_BASE_URL}/2d-rendered/bedroom2_2.jpg`, kind: 'photo', room: 'Bedroom 2',   alt: 'Second bedroom storage wall' },
            { src: `${ASSETS_BASE_URL}/2d-rendered/bathroom.jpg`, kind:'photo', room: 'Bathroom',    alt: 'Bathroom with bath and basin' },
            { src: `${ASSETS_BASE_URL}/2d-rendered/floor_plan.jpg`, kind: 'plan',  room: 'Floor plan',  alt: 'Floor plan showing room layout and dimensions' },
        ],
    },
};

export function totalPhotos(property) {
    return property.rooms.reduce((n, r) => n + r.photos.length, 0);
}