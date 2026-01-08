const suffixes = [
	{ value: "1e3", symbol: "K" }, // thousand
	{ value: "1e6", symbol: "M" }, // million
	{ value: "1e9", symbol: "B" }, // billion
	{ value: "1e12", symbol: "T" }, // trillion
	{ value: "1e15", symbol: "Qa" }, // quadrillion
	{ value: "1e18", symbol: "Qi" }, // quintillion
	{ value: "1e21", symbol: "Sx" }, // sextillion
	{ value: "1e24", symbol: "Sp" }, // septillion
	{ value: "1e27", symbol: "o" }, // octillion
	{ value: "1e30", symbol: "n" }, // nonillion
	{ value: "1e33", symbol: "d" }, // decillion
	{ value: "1e36", symbol: "u" }, // undecillion
	{ value: "1e39", symbol: "D" }, // duodecillion
	{ value: "1e42", symbol: "tD" }, // tredecillion
	{ value: "1e45", symbol: "qD" }, // quattuordecillion
	{ value: "1e48", symbol: "Qd" }, // quindecillion
	{ value: "1e51", symbol: "sD" }, // sexdecillion
	{ value: "1e54", symbol: "SD" }, // septendecillion
	{ value: "1e57", symbol: "oD" }, // octodecillion
	{ value: "1e60", symbol: "nD" }, // novemdecillion
	{ value: "1e63", symbol: "V" }, // vigintillion
	{ value: "1e66", symbol: "uV" }, // unvigintillion
	{ value: "1e69", symbol: "DV" }, // duovigintillion
	{ value: "1e72", symbol: "tV" }, // trivigintillion
	{ value: "1e75", symbol: "qV" }, // quattuorvigintillion
	{ value: "1e78", symbol: "QV" }, // quinvigintillion
];

function formatBigNumberAbbrev(raw, decimals = 2) {
	const bn = new BigNumber(raw);

	const match = [...suffixes].reverse().find(s =>
		bn.gte(new BigNumber(s.value))
	);

	if (!match) return bn.toFixed(decimals); // no abbreviation

	const divided = bn.div(new BigNumber(match.value));
	return `${divided.toFixed(decimals)}${match.symbol}`;
}

function fix(number_raw, type) {
	const number = new BigNumber(number_raw);
	const numStr = number.toString();

	if (type == 0) return numeral(numStr).format("0");

	if (type == 1)
		if (number.eq(0.5)) {
			return "0.5";
		} else return formatBigNumberAbbrev(numStr, 2);

	if (type == 2) return formatBigNumberAbbrev(numStr, 2);

	if (type == 3) return numeral(numStr).format("0,0");
	if (type == 4) return formatBigNumberAbbrev(numStr, 0);

	if (type == 5) {
		if (number.lt(1000)) return formatBigNumberAbbrev(numStr, 0);
		else return formatBigNumberAbbrev(numStr, 1);
	}

	if (type == 6) {
		if (number.lte(1000)) return formatBigNumberAbbrev(numStr, 0);
		if (number.gt(10000)) return formatBigNumberAbbrev(numStr, 2);
		return formatBigNumberAbbrev(numStr, 1);
	}

	if (type == 7) return formatBigNumberAbbrev(numStr, 1);
	if (type == 8) return numeral(numStr).format("0.00%");
	if (type == 9) return numeral(numStr).format("0%");
	if (type == 10) return numeral(numStr).format("0.0%");

	if (type == "dynamic") {
		if (number_raw != Math.round(number_raw)) VALUE = numeral(number_raw).format("0,0.0");
        else VALUE = numeral(number_raw).format("0,0");
		return VALUE;
	}
}

function getDate() {
	var today = new Date();
	var date = today.toLocaleDateString();
	var time = today.toLocaleTimeString();
	CurrentDate = date + " at " + time;
	return CurrentDate;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHHMMSS(id) {
	var sec_num = parseInt(id, 10);
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	var seconds = sec_num - hours * 3600 - minutes * 60;
	var secondstext = 0;
	var minutestext = 0;
	var hourstext = 0;
	if (hours > 0) {
		hourstext = hours + " hours ";
	} else {
		hourstext = "";
	}
	if (minutes > 0) {
		minutestext = minutes + " minutes ";
	} else {
		minutestext = "";
	}
	if (seconds > 0) {
		secondstext = seconds + " seconds ";
	} else {
		if (minutes > 0) {
			secondstext = "";
		} else {
			secondstext = "0 seconds";
		}
	}
	if (hours == 1) {
		hourstext = hours + " hour ";
	}
	if (minutes == 1) {
		minutestext = minutes + " minute ";
	}
	if (seconds == 1) {
		secondstext = seconds + " second ";
	}
	var time = hourstext + minutestext + secondstext;
	return time;
}

// Save and load functions
var canSave = 1;

var save = function () {
	if (canSave) {
		localStorage.setItem("idleFive5", JSON.stringify(p));
	}
};

var load = function () {
	var savegame = JSON.parse(localStorage.getItem("idleFive5"));

	for (var property in savegame) {
		if (typeof savegame[property] !== 'undefined') p[property] = savegame[property];
	}
	UpdateUI();
};

function exportSave() {
	$("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(p)) + "</textarea>");
	var copyText = document.getElementById("saveCode");
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
	MESSAGE("Save Exported", "Your save has been copied into you clipboard.");
	$("#exportBody").html("");
}

var importSave = function () {
	var save = prompt("Paste the code previously obtained here");
	if (save) {
		restoreSave(save);
	}
};

var restoreSave = function (save) {
	try {
		var decoded = atob(save);
		JSON.parse(decoded);
		if (decoded) {
			localStorage.setItem("idleFive5", decoded);
			canSave = 0;
			location.reload();
		} else {
			$("#debugtext").html("ERROR: Invalid Save Data");
		}
	} catch (err) {
		$("#debugtext").html("ERROR: Invalid Save Data");
	}
};

var confirmReset = function () {
	var r = confirm("Do you really want to reset all your stats ?");
	if (r == true) {
		canSave = 0;
		localStorage.clear();
		location.reload();
	}
};

function truncate2(num) {
    let s = String(num);

    // If scientific notation, convert to full string
    if (s.includes("e") || s.includes("E")) {
        s = Number(num).toFixed(20); // expand it
    }

    const dot = s.indexOf(".");
    if (dot === -1) return num; // no decimals

    return Number(s.slice(0, dot + 3)); // keep 2 decimals
}