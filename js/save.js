// Save and load functions
var canSave = 1;

// Sauvegarde le jeu au format JSON dans le localStorage
var save = function(){
	var date = new Date();
	if(canSave){
		localStorage.setItem("IdleFive", JSON.stringify(player));
	}
	var tmp = new Date().getTime();
}

var load = function(){
	var savegame = JSON.parse(localStorage.getItem("IdleFive"));

	for (var property in savegame) {
		if (typeof savegame[property] !== 'undefined') player[property] = savegame[property];
	}

	var date = new Date();
	updateprogression();
}

var exportSave = function(){
	var saveData = btoa(JSON.stringify(player));
	if(document.queryCommandSupported("copy")){
		$("#copyToClipboard").css({"visibility":"visible"});
	}
    $("#exportBody").html("<p class='copytext'>Copy this code</p><textarea id='saveCode' class='savetext' style='width:100%; height:200px'>"+saveData+"</textarea><button id='copyToClipboard' class='btn btn-rouge' onclick='saveDataToClipboard()'>Copy all text</button>");
}

var saveDataToClipboard = function(){
	var textField = document.getElementById("saveCode");
	textField.select();
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
}

var importSave = function(){
    var save = prompt("Paste the code previously obtained here");
    console.log(save);
    if(save) {
		restoreSave(save)
	}
}

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
}

var confirmReset = function() {
    var input = prompt("To confirm, please write 6", "");
    if (input == 6) {
        canSave = 0;
        localStorage.clear();
        location.reload();
    }
}