const { SPAWN_SERVER } = require('../data/definitions');

mp.events.add('playerChat', (player, text) => {
	mp.players.forEach((target) => target.sendClientMessage(`${player.name} says: ${text}`));
});

mp.events.add('playerReady', (player, text) => {
	//   Setting the positions
	player.position = new mp.Vector3(SPAWN_SERVER.x, SPAWN_SERVER.y, SPAWN_SERVER.z);
	player.heading = SPAWN_SERVER.heading;

	player.health = 100;
	player.armour = 100;

	//   Messages
	player.sendClientMessage(`!{#f195ac}VESPUCCI.MP`);
	player.sendClientMessage(`!{#dddddd}Welcome to our modding server. Use !{#ffffff}/help !{#dddddd} for commands.`);

	//  Data
	player.marks = {};
});

mp.events.add('playerDeath', (player) => {
	player.spawn(new mp.Vector3(SPAWN_SERVER.x, SPAWN_SERVER.y, SPAWN_SERVER.z));

	player.notify('YOU DIED. YOU HAVE BEEN RESPAWNED.');
});

mp.events.add('vehicleDeath', (vehicle) => {
	// Spawn it.
	const entity = mp.vehicles.new(vehicle.vars.modelHash, vehicle.vars.spawnPosition);
	entity.vars = vehicle;

	// Destroy the old one
	vehicle.destroy();
});
