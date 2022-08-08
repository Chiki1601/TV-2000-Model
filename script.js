let img;
let r;
let g;
let b;
let on = true;
let wasOn = true;
let currentVolume = 5;
let volumeTimeout;
let currentChannel = 1;
let channelTimeout;

function generateRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function setSquare(x, y, n, r, g, b) {
	for (let i = x; i < x + n; i++) {
		for (let j = y; j < y + n; j++) {
			img.set(i, j, color(r, g, b));
		}
	}
}

function setup() {
	frameRate(6);
	img = createImage(300, 300);
	createCanvas(300, 300);
	img.loadPixels();
	for (let i = 0; i < img.width; i += 4) {
		for (let j = 0; j < img.height; j += 4) {
			r = generateRandom(0, 256);
			g = generateRandom(0, 256);
			b = generateRandom(0, 256);
			setSquare(i, j, 4, r, g, b);
		}
	}
	img.updatePixels();
	image(img, 0, 0);
}

function draw() {
	img.loadPixels();
	for (let i = 0; i < img.width; i += 4) {
		for (let j = 0; j < img.height; j += 4) {
			if (on) {
				r = generateRandom(0, 256);
				g = generateRandom(0, 256);
				b = generateRandom(0, 256);
			} else {
				r = 0;
				g = 0;
				b = 0;
			}
			setSquare(i, j, 4, r, g, b);
		}
	}
	wasOn = on;
	img.updatePixels();
	image(img, 0, 0);
}

$("body").on("click", "#volume-up", function () {
	$("#volume-menu").show();
	if (volumeTimeout) {
		clearTimeout(volumeTimeout);
	}
	volumeTimeout = setTimeout(function () {
		$("#volume-menu").hide();
	}, 3000);
	currentVolume = Math.min(10, currentVolume + 1);
	$($(".volume-dash")[currentVolume - 1]).addClass("active");
});

$("body").on("click", "#volume-down", function () {
	$("#volume-menu").show();
	if (volumeTimeout) {
		clearTimeout(volumeTimeout);
	}
	volumeTimeout = setTimeout(function () {
		$("#volume-menu").hide();
	}, 3000);
	currentVolume = Math.max(0, currentVolume - 1);
	$($(".volume-dash")[currentVolume]).removeClass("active");
});

$("body").on("click", "#power-button", function () {
	on = !on;
});

function formatChannel(channel) {
	return String(currentChannel).padStart(2, "0");
}

$("body").on("click", "#channel-up", function () {
	if (channelTimeout) {
		clearTimeout(channelTimeout);
	}
	$("#channel-menu").css("display", "inline-flex");
	channelTimeout = setTimeout(function () {
		$("#channel-menu").css("display", "none");
	}, 3000);
	if (currentChannel < 15) {
		currentChannel += 1;
	} else {
		currentChannel = 1;
	}
	$("#current-channel").text(formatChannel(currentChannel));
});

$("body").on("click", "#channel-down", function () {
	if (channelTimeout) {
		clearTimeout(channelTimeout);
	}
	$("#channel-menu").css("display", "inline-flex");
	channelTimeout = setTimeout(function () {
		$("#channel-menu").css("display", "none");
	}, 3000);
	if (currentChannel > 1) {
		currentChannel -= 1;
	} else {
		currentChannel = 15;
	}
	$("#current-channel").text(formatChannel(currentChannel));
});