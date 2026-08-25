const ASSETS_BASE_URL = 'https://360-virtual-estate.s3.eu-north-1.amazonaws.com'
export const TOUR_CONFIG = {
    1: {
        default: {
            firstScene: "livingRoom",
        },
        scenes: {
            livingRoom: {
                title: "Living Room",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/Living_1.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: -20,
                        yaw: 28,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 80
                    },
                    {
                        pitch: -1,
                        yaw: 7,
                        type: "info",
                        text: "Television",
                    },
                    {
                        pitch: 0.8,
                        yaw: -161,
                        type: "info",
                        text: "Woven",
                    },
                    {
                        pitch: -6,
                        yaw: -125,
                        type: "info",
                        text: "Fridge and water dispension",
                    },
                    {
                        pitch: -3,
                        yaw: 180,
                        type: "info",
                        text: "Kitchen Area",
                    },
                ],
            },
            bedroom1: {
                title: "Bedroom 1",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/Bedroom1_1.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: -2,
                        yaw: -80,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 80
                    },
                    {
                        pitch: -32,
                        yaw: 140,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 80
                    },
                    {
                        pitch: -2,
                        yaw: 80,
                        type: "scene",
                        text: "Go to Bedroom 2",
                        sceneId: "bedroom2",
                        targetYaw: -1,
                        targetPitch:4,
                        targetHfov: 80
                    },
                    {
                        pitch: 8,
                        yaw: 10,
                        type: "info",
                        text: "Main Bedroom which is quite and big",
                    },
                ],
            },
            bedroom2: {
                title: "Bedroom 2",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/Bedroom2_1.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: 10,
                        yaw: 27,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 80
                    },
                    {
                        pitch: -62,
                        yaw: 155,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 80
                    },
                    {
                        pitch: -3,
                        yaw: -60,
                        type: "scene",
                        text: "Go to Bedroom 1",
                        sceneId: "bedroom1",
                        targetYaw: -41,
                        targetPitch: -2.2,
                        targetHfov: 80
                    },
                ],
            },
            passage: {
                title: "Passage",
                hfov: 80,
                pitch: -2,
                yaw: -35,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/Passage_1.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: -2,
                        yaw: 120,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 80
                    },
                    {
                        pitch: -3,
                        yaw: -15,
                        type: "scene",
                        text: "Go to Bedroom 1",
                        sceneId: "bedroom1",
                        targetYaw: -41,
                        targetPitch: -2.2,
                        targetHfov: 80
                    },
                    {
                        pitch: -4,
                        yaw: 3,
                        type: "scene",
                        text: "Go to Bedroom 2",
                        sceneId: "bedroom2",
                        targetYaw: -1,
                        targetPitch:4,
                        targetHfov: 80
                    },

                    {
                        pitch: -3,
                        yaw: -44,
                        type: "scene",
                        text: "Toilet",
                        sceneId: "toilet",
                        targetYaw: 102,
                        targetPitch: -1.8,
                        targetHfov: 80
                    },
                    {
                        pitch: -5,
                        yaw: -145,
                        type: "scene",
                        text: "Bathroom",
                        sceneId: "bathroom",
                        targetYaw: 36,
                        targetPitch: -5,
                        targetHfov: 80
                    },
                ],
            },
            toilet: {
                title: "Toilet",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/Toilet.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: 10,
                        yaw: 29,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 80
                    },
                    {
                        pitch: -41,
                        yaw: -60,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 80
                    },
                ],
            },
            bathroom: {
                title: "Bathroom",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/Bathroom.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: 10,
                        yaw: 29,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 80
                    },
                    {
                        pitch: -31,
                        yaw: -35,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 80
                    },
                ],
            },
        },
    },
    2: {
        default: {
            firstScene: "corporate",
        },
        scenes: {
            corporate: {
                title: "Living Room",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/corporate_apartment.jpg?v=${Date.now()}`,
            }
        }
    },
    3: {
        default: {
            firstScene: "modern",
        },
        scenes: {
            modern: {
                title: "Living Room",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/modern_apartment.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: -3,
                        yaw: 120,
                        type: "info",
                        text: "Kitchen Area",
                    },
                ],
            }
        }
    },
    4: {
        default: {
            firstScene: "tinyapartment",
        },
        scenes: {
            tinyapartment: {
                title: "Living Room",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: ASSETS_BASE_URL+`/rendered/tiny_apartement.jpg?v=${Date.now()}`,
                hotSpots: [
                    {
                        pitch: 3,
                        yaw: 80,
                        type: "info",
                        text: "Tiny and cozy Appartement",
                    },
                ],
            }
        }
    },
    5: {
        default: {
            firstScene: "newone",
        },
        scenes: {
            newone: {
                title: "Living Room",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/wooden_lounge.jpg",
                hotSpots: [
                    {
                        pitch: -3,
                        yaw: 180,
                        type: "info",
                        text: "Snooker",
                    },
                ],
            }
        }
    },
    6: {
        default: {
            firstScene: "oldone",
        },
        scenes: {
            oldone: {
                title: "Living Room",
                hfov: 80,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/glasshouse_interior.jpg",
                hotSpots: [
                    {
                        pitch: -3,
                        yaw: 180,
                        type: "info",
                        text: "Kitchen Area",
                    },
                ],
            }
        }
    }
    
};