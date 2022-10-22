const { SPAWN_SERVER, SPAWN_SERVER_VEHICLE } = require("../data/definitions");
const vehicles = require("../data/vehicles");

mp.events.addCommand("savepos", (player, fullText, weapon, ammo) => {
  console.log("Player position", {
    pos: player.position,
    heading: player.heading,
  });

  player.sendClientMessage(
    `Your position has been logged to your server console.`
  );
});

mp.events.addCommand("veh", (player, fullText, model) => {
  if (!model) return player.sendClientMessage(`Args: /veh [model]`)
  const modelMatch = vehicles.find((v) => v.model === model || v.displayName.toLowerCase().includes(model));

  // Spawn it.
  const entity = mp.vehicles.new(modelMatch ? modelMatch.hash : mp.joaat(model), player.position);
  entity.vars = {
    spawnPosition: player.position,
    modelHash: modelMatch ? modelMatch.hash : mp.joaat(model)
  }

  player.putIntoVehicle(entity, 0);

  player.sendClientMessage(`You spawned a ${modelMatch ? modelMatch.displayName : model}. ${modelMatch ? `!{#ABE591}(CUSTOM)` : `!{#f44336}(UNDEFINED OR VANILLA)`}`)

});



mp.events.addCommand("spawn", (player) => {
  if (player.vehicle) {
    player.vehicle.position = new mp.Vector3(
      SPAWN_SERVER_VEHICLE.x,
      SPAWN_SERVER_VEHICLE.y,
      SPAWN_SERVER_VEHICLE.z
    );
  } else {
    player.position = new mp.Vector3(
      SPAWN_SERVER.x,
      SPAWN_SERVER.y,
      SPAWN_SERVER.z
    );
  }
  player.sendClientMessage("You have been teleported to the spawn.");
});

mp.events.addCommand("plate", (player, fullText, plate) => {
  if (!plate) return player.sendClientMessage(`Args: /plate [text]`)
  if (!player.vehicle) return player.sendClientMessage("You are not in a vehicle.");
  player.vehicle.numberPlate = plate;
  player.sendClientMessage(`Updated vehicle number plate to !{#f1c232}"${plate}"`)
});

mp.events.addCommand("fv", (player) => {
  if (!player.vehicle) return player.sendClientMessage("You are not in a vehicle.");
  player.vehicle.repair();
  player.sendClientMessage(`You repaired your vehicle.`)
});

const despawnVeh = (player) => {
  if (!player.vehicle) return player.sendClientMessage("You are not in a vehicle.");
  player.removeFromVehicle();
  player.vehicle.destroy();
  player.sendClientMessage(`You despawned your vehicle.`)

}

mp.events.addCommand("dv", despawnVeh);
mp.events.addCommand("despawnveh", despawnVeh);

mp.events.addCommand("heal", (player) => {
  if (!player.vehicle) return player.sendClientMessage("You are not in a vehicle.");
  player.health = 100;
  player.sendClientMessage(`You healed.`)
});

mp.events.addCommand("help", (player) => {
  player.sendClientMessage(`Commands: /spawn /veh /fv /(d)espawn(v)eh /plate /heal`)
});
