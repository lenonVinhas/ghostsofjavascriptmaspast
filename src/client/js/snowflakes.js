
// snowflakes objects collection
var snowflakes = [],
	snowflakesDefaultCount = 1000,
				// snowflakes sprites
	snowflakeSprites = [],
	spritesCount = 9,
	spriteWidth = 20,
	spriteHeight = 20,
				// canvas bounds used for snowflake animation
	bounds = { width: $(window).width(), height: $(window).height() },
				// snowflake movement parameters:
				// we'll advance each snowflake vertically at least or most by these amounts
				// (think gravity and resistance)
	minVerticalVelocity = 1,
	maxVerticalVelocity = 4,
				// we'll shift each snowflake horizontally at least or most by these amounts
				// (think wind and resistance)
	minHorizontalVelocity = -1,
	maxHorizontalVelocity = 3,
				// each snowflake sprite will be scaled by these settings
	minScale = 0.2,
	maxScale = 1.25,
				// each snowflake also "bobs" on horizontal axis
				// (think volumetric resistance) at least or most by these amounts
	minHorizontalDelta = 2,
	maxHorizontalDelta = 3,
				// each snowflakes opacity is set at least or most by these
	minOpacity = 0.2,
	maxOpacity = 0.9,
				// change opacity by at max 1/maxOpacityIncrement
	maxOpacityIncrement = 50,
				// dynamic speed:
				// start without any speed correction
	speedFactor = .5;

// create number of snowflakes adding if required (or regenerate from scratch)
function generate(number, add) {
	var ii = 0,
		// Unicode snowflakes
		sfShapes = ['\u2745', '\u2744', '\u2745', '\u2745', '\u2745', '\u2745', '\u2745', '\u2746', '\u2745'];

	// initialize sprite
	for (ii = 0; ii < spritesCount; ii++) {
		var sprite = $('<canvas/>', {
			width: spriteWidth,
			height: spriteHeight
		}).get(0),
			context = sprite.getContext('2d');

		context.fillStyle = 'white';
		context.font = 'normal 27px sans-serif';
		context.textBaseline = 'bottom';
		context.fillText(sfShapes[ii], -2, 24);
		snowflakeSprites.push(sprite);
	}

	if (number) {
		snowflakesDefaultCount = number;
	}
	if (!add) {
		snowflakes = [];
	}
	for (ii = 0; ii < snowflakesDefaultCount; ii++) {
		snowflakes.push(generateSnowflake());
	}
}

function generateSnowflake() {
	var scale = Math.random() * (maxScale - minScale) + minScale;
	return {
		// x position
		x: Math.random() * bounds.width,
		// y position
		y: Math.random() * bounds.height,
		// vertical velocity
		vv: Math.random() * (maxVerticalVelocity - minVerticalVelocity) + minVerticalVelocity,
		// horizontal velocity
		hv: Math.random() * (maxHorizontalVelocity - minHorizontalVelocity) + minHorizontalVelocity,
		// scaled sprite width
		sw: scale * spriteWidth,
		// scaled sprite width
		sh: scale * spriteHeight,
		// maximum horizontal delta
		mhd: Math.random() * (maxHorizontalDelta - minHorizontalDelta) + minHorizontalDelta,
		// horizontal delta
		hd: 0,
		// horizontal delta increment
		hdi: Math.random() / (maxHorizontalVelocity * minHorizontalDelta),
		// opacity
		o: Math.random() * (maxOpacity - minOpacity) + minOpacity,
		// opacity increment
		oi: Math.random() / maxOpacityIncrement,
		// sprite index
		si: Math.ceil(Math.random() * (spritesCount - 1))
	}
}

// help snowflakes fall
function advanceSnowFlakes() {
	var ii = 0, sfCount = snowflakes.length;
	for (ii = 0; ii < sfCount; ii++) {
		var sf = snowflakes[ii];
		// we obey gravity, 'cause it's the law
		sf.y += sf.vv * speedFactor;
		// while we're obeying gravity, we do it with style
		sf.x += (sf.hd + sf.hv) * speedFactor;
		// advance horizontal axis "bobbing"                
		sf.hd += sf.hdi;
		// inverse "bobbing" direction if we get to maximum delta limit
		if (sf.hd < -sf.mhd || sf.hd > sf.mhd) {
			sf.hdi = -sf.hdi;
		};

		// increment opacity and check opacity value bounds
		sf.o += sf.oi;
		if (sf.o > maxOpacity || sf.o < minOpacity) { sf.oi = -sf.oi };
		if (sf.o > maxOpacity) sf.o = maxOpacity;
		if (sf.o < minOpacity) sf.o = minOpacity;
		// return within dimensions bounds if we've crossed them
		if (sf.y > bounds.height + spriteHeight / 2) {
			sf.y = 0
		};
		if (sf.y < 0) {
			sf.y = bounds.height
		};
		if (sf.x > bounds.width + spriteWidth / 2) {
			sf.x = 0
		};
		if (sf.x < 0) {
			sf.x = bounds.width
		};
	}
}

function renderFrame(context) {
	var ii = 0, sfCount = snowflakes.length;
	// fall down one iteration            
	advanceSnowFlakes();
	// clear context and draw snowflake sprites
	//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	for (ii = 0; ii < sfCount; ii++) {
		var sf = snowflakes[ii];
		context.globalAlpha = sf.o;
		context.drawImage(
			// image
			snowflakeSprites[sf.si],
		// source x
			0,
		// source y
			0,
		// source width
			spriteWidth,
		// source height
			spriteHeight,
			// target x
			sf.x,
			// target y
			sf.y,
			// target width
			sf.sw,
			// target height
			sf.sh);
	}
}

function updateBounds() {
	bounds.width = $(window).width();
	bounds.height = $(window).height();
}

module.exports = {
	"generate": generate,
	"render": renderFrame,
	"updateBounds": updateBounds
};
