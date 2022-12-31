// These are the last clothing ids from gta 5.

const lastClothesIds = {
    "male": {
        "tops": 441,
        "torsos": 209,
        "undershirts": 192,
        "pants": 159,
        "shoes": 125,
        "hats": 186,
        "glasses": 41,
        "masks": 215,
        "accessories": 166,
        "earings": 42,
        "watches": 46,
        "bracelets": 12,
        "backpacks": 99
    },
    "female": {
        "tops": 439,
        "torsos": 243,
        "undershirts": 235,
        "pants": 168,
        "shoes": 129,
        "hats": 185,
        "glasses": 48,
        "masks": 216,
        "accessories": 135,
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