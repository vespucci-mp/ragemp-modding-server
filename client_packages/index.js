// Disabling game defaults here.

const player = mp.players.local;

mp.events.add('render', () => {
    player.setConfigFlag(184, true); // Disable Seat Shuffling

    mp.game.ui.hideHudComponentThisFrame(2); // Disalbe ammo text from weapons
    mp.game.ui.hideHudComponentThisFrame(6); // Disable vehicle name
    mp.game.ui.hideHudComponentThisFrame(7); // Disable area name
    mp.game.ui.hideHudComponentThisFrame(8); // Disable vehicle class
    mp.game.ui.hideHudComponentThisFrame(9); // Disable game location bottom right


    // Disable player and in-vehicle afk camera
    mp.game.invoke('0x9E4CFFF989258472'); //
    mp.game.invoke('0xF4F2C0D4EE209E20');
});


mp.events.add('render', () => {

    if (player.vehicle) {
        const speed = (player.vehicle.getSpeed() * 3.6).toFixed(0);

        mp.game.graphics.drawText(`${speed} KM/H`, [0.5, 0.956], {
            font: 4,
            color: [255, 255, 255, 255],
            outline: true,
            scale: [0.6, 0.6]
        });

    }
});

const M_KEY = 0x4d;
let playerBelt = false;

mp.keys.bind(M_KEY, true, () => {
    if (player.vehicle) {
        player.setConfigFlag(32, !playerBelt);
        playerBelt = !playerBelt;
        mp.console.logInfo(`Belt: ${playerBelt ? "ON" : "OFF"}`, true, true);

    }

    return true;
});
