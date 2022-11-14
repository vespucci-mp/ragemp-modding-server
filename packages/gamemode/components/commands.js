const { SPAWN_SERVER, SPAWN_SERVER_VEHICLE } = require('../data/definitions');
const vehicles = require('../data/vehicles');

mp.events.addCommand('help', (player) => {
	player.sendClientMessage(`Commands: /savepos /spawn /veh /fv /(d)espawn(v)eh /plate /heal /mod`);
	player.sendClientMessage(`Commands: /despawnvehicles /vehcolor /vehcolorhex`);
	player.sendClientMessage(`Commands: /skin /pedm /pedf /setclothes /setprops /sethaircolor`);
});

mp.events.addCommand('savepos', (player, fullText, weapon, ammo) => {
	console.log('Player position', {
		pos: player.position,
		heading: player.heading
	});

	player.sendClientMessage(`Your position has been logged to your server console.`);
});

mp.events.addCommand('veh', (player, model) => {
	if (!model) return player.sendClientMessage(`Args: /veh [model] `);
	const modelMatch = vehicles.find((v) => v.model === model || v.displayName.toLowerCase() === model.toString().toLowerCase());

	// Spawn it.
	const entity = mp.vehicles.new(modelMatch ? modelMatch.hash : mp.joaat(model), player.position);
	entity.vars = {
		spawnPosition: player.position,
		modelHash: modelMatch ? modelMatch.hash : mp.joaat(model)
	};

	player.putIntoVehicle(entity, 0);
	player.sendClientMessage(`You spawned a ${modelMatch ? modelMatch.displayName : model}. ${modelMatch ? `!{#ABE591}(CUSTOM)` : `!{#f44336}(UNDEFINED OR VANILLA)`}`);
});

mp.events.addCommand('spawn', (player) => {
	if (player.vehicle) {
		player.vehicle.position = new mp.Vector3(SPAWN_SERVER_VEHICLE.x, SPAWN_SERVER_VEHICLE.y, SPAWN_SERVER_VEHICLE.z);
	} else {
		player.position = new mp.Vector3(SPAWN_SERVER.x, SPAWN_SERVER.y, SPAWN_SERVER.z);
	}
	player.sendClientMessage('You have been teleported to the spawn.');
});

mp.events.addCommand('plate', (player, fullText, plate) => {
	if (!plate) return player.sendClientMessage(`Args: /plate [text]`);
	if (!player.vehicle) return player.sendClientMessage('You are not in a vehicle.');
	player.vehicle.numberPlate = plate;
	player.sendClientMessage(`Updated vehicle number plate to !{#f1c232}"${plate}"`);
});

mp.events.addCommand('fv', (player) => {
	if (!player.vehicle) return player.sendClientMessage('You are not in a vehicle.');
	player.vehicle.repair();
	player.sendClientMessage(`You repaired your vehicle.`);
});

const despawnVeh = (player) => {
	if (!player.vehicle) return player.sendClientMessage('You are not in a vehicle.');
	player.removeFromVehicle();
	player.vehicle.destroy();
	player.sendClientMessage(`You despawned your vehicle.`);
};

mp.events.addCommand('dv', despawnVeh);
mp.events.addCommand('despawnveh', despawnVeh);

mp.events.addCommand('despawnvehicles', (player) => {
	mp.vehicles.forEach((vehicle) => {
		vehicle.destroy();
	});
	player.sendClientMessage(`You despawned all vehicles`);
});
mp.events.addCommand('heal', (player) => {
	if (!player.vehicle) return player.sendClientMessage('You are not in a vehicle.');
	player.health = 100;
	player.sendClientMessage(`You healed.`);
});

mp.events.addCommand('mod', (player, _, modType, modIndex) => {
	if (!player.vehicle) return player.outputChatBox('You need to be in a vehicle to use this command.');
	if (!modType || !modIndex) return player.sendClientMessage(`Args: [type] [index]`);
	player.vehicle.setMod(parseInt(modType), parseInt(modIndex));
	player.sendClientMessage(`Mod Type ${modType} with Mod Index ${modIndex} applied.`);
});

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

mp.events.addCommand('vehcolor', (player, fullText, color1, color2) => {
	if (!player.vehicle) return player.outputChatBox('You need to be in a vehicle to use this command.');

	if (!color1) {
		player.sendClientMessage(`Args: /vcolor2 [gta color 1] [optional gta color 2]`);
		player.sendClientMessage(`Get the colors codes from gta wiki (check discord)`);
		return false;
	}

	player.vehicle.setColor(parseInt(color1), parseInt(color2 ? color2 : color1));

	player.notify(`Vehicle color changed to primary color ${color1} ${color2 ? ` and secondary color: ${color2}` : ''}`);
});

mp.events.addCommand('vehcolorhex', (player, fullText, color1, color2) => {
	if (!player.vehicle) return player.outputChatBox('You need to be in a vehicle to use this command.');

	if (!color1) {
		player.sendClientMessage(`Args: /vcolor1 [hex color1] [optional hex color 2]`);
		player.sendClientMessage(`Example: /vcolor1  #ffffff`);
		player.sendClientMessage(`Get the hex colors codes from www.color-hex.com`);
		return false;
	}

	const rgb1 = hexToRgb(color1);
	const rgb2 = color2 ? hexToRgb(color2) : rgb1;

	if (color1 && rgb1 === null) return player.sendClientMessage(`Color1 is not a valid hex color.`);
	if (color2 && rgb2 === null) return player.sendClientMessage(`Color1 is not a valid hex color.`);

	player.vehicle.setColorRGB(rgb1[0], rgb1[1], rgb1[2], rgb2[0], rgb2[1], rgb2[2]);

	player.notify(`Vehicle color changed to rgb color ${rgb1.join(',')} ${color2 ? ` and secondary rgb color: ${rgb2.join(',')}` : ''}`);
});

mp.events.addCommand('skin', (player, fullText) => {
	if (!fullText) return player.sendClientMessage(`Args: /skin [model]`);

	player.model = mp.joaat(fullText);

	player.sendClientMessage(`Skin changed to ${fullText}`);
});

mp.events.addCommand('pedm', (player, fullText) => {
	player.model = mp.joaat('mp_m_freemode_01');
	player.sendClientMessage(`You're a boy now.`);

	const c = { motherShape: 0, fatherShape: 8, shapeResemblance: 0.43, skinResemblance: 0.5 };
	player.setHeadBlend(c.motherShape, c.fatherShape, 0, c.motherShape, c.fatherShape, 0, c.shapeResemblance, c.skinResemblance, 0);
});

mp.events.addCommand('pedf', (player, fullText) => {
	player.model = mp.joaat('mp_f_freemode_01');
	player.sendClientMessage(`You're a girl now.`);

	const c = { motherShape: 8, fatherShape: 25, shapeResemblance: 1, skinResemblance: 0.71 };
	player.setHeadBlend(c.motherShape, c.fatherShape, 0, c.motherShape, c.fatherShape, 0, c.shapeResemblance, c.skinResemblance, 0);
});

mp.events.addCommand('setclothes', (player, fullText, type, drawable, texture) => {
	if (!fullText) return player.sendClientMessage(`Args: /setclothes [type] [drawable] [texture]`);

	player.setClothes(parseInt(type), parseInt(drawable), parseInt(texture), 0);

	player.sendClientMessage(`Clothes applied: type ${type}, drawable id ${drawable}, texture id ${texture}`);
});

mp.events.addCommand('sethaircolor', (player, fullText, color1, color2) => {
	if (!fullText) return player.sendClientMessage(`Args: /sethaircolor [color1] [color2?]`);

	player.setHairColor(parseInt(color1), parseInt(color2 ? color2 : color1));

	player.sendClientMessage(`Hair color applied: color 1 ${color1}, color 2 : ${color2 ? color2 : 'N/A'}`);
});

mp.events.addCommand('setprops', (player, fullText, type, drawable, texture) => {
	if (!fullText) return player.sendClientMessage(`Args: /setclothes [type] [drawable] [texture]`);

	player.setProp(parseInt(type), parseInt(drawable), parseInt(texture));

	player.sendClientMessage(`Props applied: type ${type}, drawable id ${drawable}, texture id ${texture}`);
});

mp.events.addCommand('tod', (player, fullText, hour) => {
	if (!fullText) return player.sendClientMessage(`Args: /tod [hour]`);

	mp.world.time.set(parseInt(hour), 0, 0);

	player.sendClientMessage(`Time is now: ${hour}:00`);
});

mp.events.addCommand('mark', (player, fullText, name) => {
	if (!fullText) return player.sendClientMessage(`Args: /mark [name]`);

	if (player.marks[name]) return player.sendClientMessage(`"${name}" already exists`);

	player.marks[name] = player.position;

	player.sendClientMessage(`"${name}" saved`);
});

mp.events.addCommand('gotomark', (player, fullText, name) => {
	if (!fullText) return player.sendClientMessage(`Args: /gotomark [name]`);

	if (!player.marks[name]) return player.sendClientMessage(`"${name}" does not exist`);

	player.position = player.marks[name];

	player.sendClientMessage(`Teleported to "${name}"`);
});
