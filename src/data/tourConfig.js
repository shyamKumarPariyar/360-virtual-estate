export const TOUR_CONFIG = {
    1: {
        default: {
            firstScene: "livingRoom",
        },
        scenes: {
            livingRoom: {
                title: "Living Room",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/Living_1.jpg",
                hotSpots: [
                    {
                        pitch: -22,
                        yaw: 28,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 115
                    },
                    // {
                    //     pitch: -3,
                    //     yaw: -60,
                    //     type: "scene",
                    //     text: "Go to Bedroom 1",
                    //     sceneId: "bedroom1",
                    //     targetYaw: -41,
                    //     targetPitch: -2.2,
                    //     targetHfov: 115
                    // },
                    // {
                    //     pitch: -4,
                    //     yaw: -70,
                    //     type: "scene",
                    //     text: "Go to Bedroom 2",
                    //     sceneId: "bedroom2",
                    //     targetYaw: -3,
                    //     targetPitch: -6,
                    //     targetHfov: 115
                    // },
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
                        yaw: 150,
                        type: "info",
                        text: "Kitchen Area",
                    },
                ],
            },
            bedroom1: {
                title: "Bedroom 1",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/Bedroom1_1.jpg",
                hotSpots: [
                    {
                        pitch: -2,
                        yaw: -90,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 115
                    },
                    {
                        pitch: -32,
                        yaw: 140,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 115
                    },
                    {
                        pitch: -2,
                        yaw: 90,
                        type: "scene",
                        text: "Go to Bedroom 2",
                        sceneId: "bedroom2",
                        targetYaw: -1,
                        targetPitch:4,
                        targetHfov: 115
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
                hfov: 115,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/Bedroom2_1.jpg",
                hotSpots: [
                    {
                        pitch: 10,
                        yaw: 27,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 115
                    },
                    {
                        pitch: -62,
                        yaw: 155,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 115
                    },
                    {
                        pitch: -3,
                        yaw: -60,
                        type: "scene",
                        text: "Go to Bedroom 1",
                        sceneId: "bedroom1",
                        targetYaw: -41,
                        targetPitch: -2.2,
                        targetHfov: 115
                    },
                ],
            },
            passage: {
                title: "Passage",
                hfov: 120,
                pitch: -2,
                yaw: -35,
                type: "equirectangular",
                panorama: "/rendered/Passage_1.jpg",
                hotSpots: [
                    {
                        pitch: -2,
                        yaw: 120,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 115
                    },
                    {
                        pitch: -3,
                        yaw: -15,
                        type: "scene",
                        text: "Go to Bedroom 1",
                        sceneId: "bedroom1",
                        targetYaw: -41,
                        targetPitch: -2.2,
                        targetHfov: 115
                    },
                    {
                        pitch: -4,
                        yaw: 3,
                        type: "scene",
                        text: "Go to Bedroom 2",
                        sceneId: "bedroom2",
                        targetYaw: -1,
                        targetPitch:4,
                        targetHfov: 115
                    },

                    {
                        pitch: -3,
                        yaw: -44,
                        type: "scene",
                        text: "Toilet",
                        sceneId: "toilet",
                        targetYaw: 102,
                        targetPitch: -1.8,
                        targetHfov: 115
                    },
                    {
                        pitch: -5,
                        yaw: -145,
                        type: "scene",
                        text: "Bathroom",
                        sceneId: "bathroom",
                        targetYaw: 36,
                        targetPitch: -5,
                        targetHfov: 115
                    },
                ],
            },
            toilet: {
                title: "Toilet",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/Toilet.jpg",
                hotSpots: [
                    {
                        pitch: 10,
                        yaw: 29,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 115
                    },
                    {
                        pitch: -41,
                        yaw: -60,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 115
                    },
                ],
            },
            bathroom: {
                title: "Bathroom",
                hfov: 100,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/Bathroom.jpg",
                hotSpots: [
                    {
                        pitch: 10,
                        yaw: 29,
                        type: "scene",
                        text: "Back to Living Room",
                        sceneId: "livingRoom",
                        targetYaw: 16,
                        targetPitch: 1.1,
                        targetHfov: 115
                    },
                    {
                        pitch: -31,
                        yaw: -35,
                        type: "scene",
                        text: "Go to Passage",
                        sceneId: "passage",
                        targetYaw: -34,
                        targetPitch: -2,
                        targetHfov: 115
                    },
                ],
            },
        },
    },
    2: {
        default: {
            firstScene: "livingRoom",
        },
        scenes: {
            livingRoom: {
                title: "Living Room",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/corporate_apartment.jpg",
                hotSpots: [
                    {
                        pitch: 3,
                        yaw: 50,
                        type: "info",
                        text: "Spaced Corporate Appartement",
                    },
                ],
            }
        }
    },
    3: {
        default: {
            firstScene: "livingRoom",
        },
        scenes: {
            livingRoom: {
                title: "Living Room",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/modern_apartment.jpg",
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
            firstScene: "livingRoom",
        },
        scenes: {
            livingRoom: {
                title: "Living Room",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "/rendered/tiny_apartement.jpg",
                hotSpots: [
                    {
                        pitch: 3,
                        yaw: 50,
                        type: "info",
                        text: "Tiny and cozy Appartement",
                    },
                ],
            }
        }
    },
    5: {
        default: {
            firstScene: "livingRoom",
        },
        scenes: {
            livingRoom: {
                title: "Living Room",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/wooden_lounge.jpg",
                hotSpots: [
                    {
                        pitch: -3,
                        yaw: 150,
                        type: "info",
                        text: "Snooker",
                    },
                ],
            }
        }
    },
    6: {
        default: {
            firstScene: "livingRoom",
        },
        scenes: {
            livingRoom: {
                title: "Living Room",
                hfov: 120,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                panorama: "https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/glasshouse_interior.jpg",
                hotSpots: [
                    {
                        pitch: -3,
                        yaw: 150,
                        type: "info",
                        text: "Kitchen Area",
                    },
                ],
            }
        }
    }
    
};