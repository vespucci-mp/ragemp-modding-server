// These are the last clothing ids from gta 5.

const lastClothesIds = {
    "male": {
        "tops": 412,
        "torsos": 197,
        "undershirts": 191,
        "pants": 147,
        "shoes": 108,
        "hats": 172,
        "glasses": 41,
        "masks": 208,
        "accessories": 153,
        "earings": 42,
        "watches": 44,
        "bracelets": 9,
        "backpacks": 99
    },
    "female": {
        "tops": 439,
        "torsos": 242,
        "undershirts": 235,
        "pants": 155,
        "shoes": 112,
        "hats": 171,
        "glasses": 43,
        "masks": 208,
        "accessories": 122,
        "earings": 22,
        "watches": 34,
        "bracelets": 16,
        "backpacks": 99
    }
}

const arrayClothing = [
    {
        key: 'torso',
        pluralKey: 'torsos',
        componentId: 3
    },
    {
        key: 'top',
        pluralKey: 'tops',
        componentId: 11
    },
    {
        key: 'pants',
        pluralKey: 'pants',
        componentId: 4
    },
    {
        key: 'shoes',
        pluralKey: 'shoes',
        componentId: 6
    },
    {
        key: 'mask',
        pluralKey: 'masks',
        componentId: 1
    },
    {
        key: 'backpack',
        pluralKey: 'backpacks',
        componentId: 5
    },
    {
        key: 'undershirt',
        pluralKey: 'undershirts',
        componentId: 8
    },
    {
        key: 'accessory',
        pluralKey: 'accessories',
        componentId: 7
    },
    {
        key: 'hat',
        pluralKey: 'hats',
        componentId: 0,
        isProp: true
    },
    {
        key: 'glasses',
        pluralKey: 'glasses',
        componentId: 1,
        isProp: true
    },
    {
        key: 'earings',
        pluralKey: 'earings',
        componentId: 2,
        isProp: true
    },
    {
        key: 'watches',
        pluralKey: 'watches',
        componentId: 6,
        isProp: true
    },
    {
        key: 'bracelets',
        pluralKey: 'bracelets',
        componentId: 7,
        isProp: true
    }
];


module.exports = {
    lastClothesIds, arrayClothing
}