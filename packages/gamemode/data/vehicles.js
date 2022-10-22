const list = [
  {
    model: "audia4", // the model name (only a-z, 1-9)
    displayName: "Audi A4", // the nice name used in interfaces
    manufacturer: "audi", // the lowercase manufacturer without spaces.
    manufacturerDisplayName: "Audi", // the nice name used in interface
    hash: "audia4", // must be same as model
    class: "sedan", // check discord for class
    type: "car", // check discord for types
    wheelsCount: 4, // number of wheels
    windowsCount: 4, // number of windows
    seats: 4, // how many seats
    carTank: 55, // how big the gas tank is
    size: "medium", // can be: small, medium, large
    checks: {
      engine: true, // Has engine?
      trunk: true, // Has a trunk?
      plate: true, // Has a number plate?
    },
  },
];

module.exports = list;
