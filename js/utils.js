function fix(x, type) {
	if (type == 0) return numeral(x).format("0");
	if (type == 1)
		if (x == 0.5) {
			return "0.5";
		} else return numeral(x).format("0.0a");
	if (type == 2) return numeral(x).format("0.00a");



	if (type == 3) return numeral(x).format("0,0");
	if (type == 4) return numeral(x).format("0a");

	if (type == 5) {
		if (x < 1000) return numeral(x).format("0a");
		else
			return numeral(x).format("0.0a");
	}
	if (type == 6) {
		if (x <= 1000) return numeral(x).format("0a");
		if (x > 1000) return numeral(x).format("0.0a");
		if (x > 10000) return numeral(x).format("0.00a");
	}
	if (type == 7) return numeral(x).format("0.0a");
	if (type == 8) return numeral(x).format("0.00%");
	if (type == 9) return numeral(x).format("0%");
	if (type == 10) return numeral(x).format("0.0%");
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
		localStorage.setItem("idleFive4", JSON.stringify(p));
	}
};

var load = function () {
	var savegame = JSON.parse(localStorage.getItem("idleFive4"));

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
			localStorage.setItem("idleFive4", decoded);
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