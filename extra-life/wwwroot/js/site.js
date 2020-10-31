const app = new PIXI.Application({
	autoResize: true,
	resolution: devicePixelRatio
});
document.getElementById("canvas-container").appendChild(app.view);

//To change the background color
app.renderer.backgroundColor = 0x3086D2;

//load an image and run the `setup` function when it's done
PIXI.Loader
	.shared
	.add("Content/extra-life-Logo.jpg")
	.add("Content/Frigate_cartoonized.png")
	.add("Content/twitch.png")
	.load(setup);

let ship;
let donate;
let twitch;

function setup() {
	addTitles()

	ship = new PIXI.Sprite(PIXI.loader.resources["Content/Frigate_cartoonized.png"].texture);
	ship.width = 800;
	ship.height = 640;
	ship.x = 200;
	ship.y = 450;
	ship.anchor.x = 0.5;
	ship.anchor.y = 0.5;
	app.stage.addChild(ship);

	// Create to show something that can be position to the bottom-right corner
	twitch = new PIXI.Sprite(PIXI.loader.resources["Content/twitch.png"].texture);
	twitch.width = 100;
	twitch.height = 100;
	twitch.on('mousedown', handleTwitchClick);
	twitch.on('touchend', handleTwitchClick);
	twitch.interactive = true;
	app.stage.addChild(twitch);

	donate = new PIXI.Sprite(PIXI.loader.resources["Content/extra-life-Logo.jpg"].texture);
	donate.width = 100;
	donate.height = 100;
	donate.on('mousedown', handleDonateClick);
	donate.on('touchend', handleDonateClick);
	donate.interactive = true;
	app.stage.addChild(donate);

	window.addEventListener('resize', resize);
	app.stage.interactive = true;
	app.stage.on("pointermove", movePointer);
	app.ticker.add(delta => gameLoop(delta));

	// Resize function window
	function resize() {
		// Resize the renderer
		app.renderer.resize(window.innerWidth, window.innerHeight);

		// You can use the 'screen' property as the renderer visible
		// area, this is more useful than view.width/height because
		// it handles resolution
		twitch.position.set(app.screen.width - 100, app.screen.height - 120);
		donate.position.set(app.screen.width - 220, app.screen.height - 120);
	}

	resize();
}

function addTitles() {
	let titleStyle = new PIXI.TextStyle({
		fontFamily: "Arial",
		fontSize: 46,
		fill: "white",
		stroke: '#ff3300',
		strokeThickness: 4,
		dropShadow: true,
		dropShadowColor: "#000000",
		dropShadowBlur: 4,
		dropShadowAngle: Math.PI / 6,
		dropShadowDistance: 6,
	});

	let styledTitle = new PIXI.Text("Satan's Gay Bakery", titleStyle);

	//Position it and add it to the stage
	styledTitle.position.set(54, 20);
	app.stage.addChild(styledTitle);

	let subTitleStyle = new PIXI.TextStyle({
		fontFamily: "Arial",
		fontSize: 32,
		fill: "white",
		stroke: '#ff3300',
		strokeThickness: 4,
		dropShadow: true,
		dropShadowColor: "#000000",
		dropShadowBlur: 4,
		dropShadowAngle: Math.PI / 6,
		dropShadowDistance: 6,
	});

	let styledSubtitle = new PIXI.Text("Extra life ♥", subTitleStyle);

	//Position it and add it to the stage
	styledSubtitle.position.set(184, 80);
	app.stage.addChild(styledSubtitle);
}

let totalTicks = 0;
function gameLoop(delta) {
	totalTicks += Math.round(delta);
	const rotateProg = totalTicks % 84;
	if (rotateProg <= 8) ship.rotation = 0;
	else if (rotateProg <= 20) ship.rotation = 0.1;
	else if (rotateProg <= 32) ship.rotation = 0.2;
	else if (rotateProg <= 44) ship.rotation = 0.1;
	else if (rotateProg <= 56) ship.rotation = 0;
	else if (rotateProg <= 68) ship.rotation = -0.1;
	else if (rotateProg <= 80) ship.rotation = 0;
	ship.x += 1;
}

function movePointer(e) {
	console.log("mousemove wee");
}

function handleTwitchClick(e) {
	window.open("https://www.twitch.tv/videos/503386472", "_self");
}

function handleDonateClick(e) {
	window.open(" https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=435146", "_self");
}

/// Expects 2 objects each with an X and a Y coordinate and a width & height.
function hasBeenClickedOn(obj1, mouseX, mouseY) {
	if (!obj1 || !mouseX || !mouseY) return false;

	if (obj1.x <= mouseX && obj1.x + width >= mouseX) {
		// match on X-axis
		if (obj1.y <= mouseY && obj1.y + obj1.height >= mouseY) { 
			return true;
		}
    }
	return false;
}