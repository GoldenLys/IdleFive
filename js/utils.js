var prefixes = ["M","B","t","q","Q","s","S","O","N",
	"D","UD","DD","TD","qD","QD","sD","SD","OD","ND",
	"V","UV","DV","TV","qV","QV","sV","SV","OV","NV",
	"T","UT","DT","TT","qT","QT","sT","ST","OT","NT",
	"~q","Uq","Dq","Tq","qq","Qq","sq","Sq","Oq","Nq"];
function beautify(x, n) {
	if (x >= 1e6) {
		var z = Math.floor(logFloor(x)/3);
		var s = beautify(x/Math.pow(10,3*z),n);
		return s+""+prefixes[z-2];
	} else {
		return numberWithCommas(x.toFixed(n));
	}
}

function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}
function logFloor(x) {
	var count = 0;
	while (x >= 10) {
		count++;
		x /= 10;
	}
	return count;
}
function fix(x, type) {
	if (type == 0)
		return beautify(x, 0);
	
	if (type == 1)
		if (x >= 1000000)
			return beautify(x, 1);
		else
			return beautify(x, 2);

	if (type == 2)
		if (x >= 1000000)
			return beautify(x, 2);
		else
			return beautify(x, 1);

	if (type == 3)
		if (x >= 1000000)
			return beautify(x, 3);
		else
			return beautify(x, 0);
}

function getDate() {
var today = new Date();
var date = today.toLocaleDateString();
var time = today.toLocaleTimeString();
CurrentDate = date + ' at ' + time;
return CurrentDate;
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHHMMSS(id) {
    var sec_num = parseInt(id, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	var secondstext = 0;
	var minutestext = 0;
	var hourstext = 0;
	if (hours > 0) {hourstext = hours + " hours ";} else {hourstext = "";}
	if (minutes > 0) {minutestext = minutes + " minutes ";} else {minutestext = "";}
	if (seconds > 0) {secondstext = seconds + " seconds ";} else {secondstext = "0 seconds";}
	if (hours == 1) {hourstext = hours + " hour ";}
	if (minutes == 1) {minutestext = minutes + " minute ";}
	if (seconds == 1) {secondstext = seconds + " second ";}
	var time = hourstext + minutestext + secondstext;
    return time;
}

// Save and load functions
var canSave = 1;

// Sauvegarde le jeu au format JSON dans le localStorage
var save = function(){
	var date = new Date();
	if(canSave){
		localStorage.setItem("IdleFive", JSON.stringify(p));
	}
	var tmp = new Date().getTime();
};

var load = function(){
	var savegame = JSON.parse(localStorage.getItem("IdleFive"));

	for (var property in savegame) {
		if (typeof savegame[property] !== 'undefined') p[property] = savegame[property];
	}

	var date = new Date();
	updateprogression();
};

var exportSave = function(){
	var saveData = btoa(JSON.stringify(p));
	window.getSelection().removeAllRanges();
	alert("Save copied in your clipboard.");
	$("#exportBody").html("<textarea id='saveCode'>"+saveData+"</textarea>");
	var textField = document.getElementById("saveCode");
	textField.select();
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
	$("#exportBody").html("");
};

var importSave = function(){
    var save = prompt("Paste the code previously obtained here");
    console.log(save);
    if(save) {
		restoreSave(save);
	}
};

var restoreSave = function(save){
	try {
		var decoded = atob(save);
		JSON.parse(decoded);
		if (decoded) {
			localStorage.setItem("IdleFive", decoded);
			canSave = 0;
			location.reload();
		} else {
			$("#debugtext").html("ERROR: Invalid Save Data");
		}
	} catch(err){
		$("#debugtext").html("ERROR: Invalid Save Data");
	}
};

var confirmReset = function() {
	var r = confirm("Do you really want to reset all of your stats ?");
	if (r == true) {
        canSave = 0;
        localStorage.clear();
        location.reload();
    }
};