var checkSucces = function (id) {
	player.succes[0] = 1;
	if (player.caps >= 1) { player.succes[1] = 1; }
	if (player.caps >= 10) { player.succes[2] = 1; }
	if (player.caps >= 100) { player.succes[3] = 1; }
	if (player.caps >= 1000) { player.succes[4] = 1; }
	if (player.caps >= 10000) { player.succes[5] = 1; }
	if (player.caps >= 100000) { player.succes[6] = 1; }
	if (player.caps >= 1000000) { player.succes[7] = 1; }
	if (player.caps >= 10000000) { player.succes[8] = 1; }
	if (player.caps >= 1000000000) { player.succes[9] = 1; }
	if (player.prestige >= 2) { player.succes[10] = 1; } else { player.succes[10] = 0; }
	if (player.prestige >= 3) { player.succes[11] = 1; } else { player.succes[11] = 0; }
	if (player.prestige >= 4) { player.succes[12] = 1; } else { player.succes[12] = 0; }
	if (player.prestige >= 5) { player.succes[13] = 1; } else { player.succes[13] = 0; }
	if (player.prestige >= 6) { player.succes[14] = 1; } else { player.succes[14] = 0; }
	if (player.rank > 29) { player.succes[15] = 1; }
	if (player.rank > 199) { player.succes[16] = 1; }
	if (player.rank > 499) { player.succes[17] = 1; }
	if (player.rank > 799) { player.succes[18] = 1; }
	if (player.rank > 1099) { player.succes[19] = 1; }
	if (player.rank > 2199) { player.succes[20] = 1; }
	if (player.caps >= 1000000000000) { player.succes[21] = 1; }
	if (player.caps >= 1000000000000000) { player.succes[22] = 1; }
	if (player.prestige >= 7) { player.succes[23] = 1; } else { player.succes[23] = 0; }
	if (player.productions[0] >= 100) { player.succes[24] = 1; }
	if (player.productions[1] >= 100) { player.succes[25] = 1; }
	if (player.productions[2] >= 100) { player.succes[26] = 1; }
	if (player.productions[3] >= 100) { player.succes[27] = 1; }
	if (player.productions[4] >= 100) { player.succes[28] = 1; }
	if (player.productions[5] >= 100) { player.succes[29] = 1; }
	if (player.productions[6] >= 100) { player.succes[30] = 1; }
	if (player.productions[7] >= 100) { player.succes[31] = 1; }
	if (player.productions[8] >= 100) { player.succes[32] = 1; }
	if (player.productions[9] >= 100) { player.succes[33] = 1; }
	if (player.productions[10] >= 100) { player.succes[34] = 1; }
	if (player.productions[11] >= 100) { player.succes[35] = 1; }
	if (player.productions[12] >= 100) { player.succes[36] = 1; }
	if (player.buyedveh1 == 7) { player.succes[37] = 1; } else { player.succes[37] = 0; }
	if (player.buyedveh2 == 47) { player.succes[38] = 1; } else { player.succes[38] = 0; }
	if (player.buyedveh3 == 33) { player.succes[39] = 1; } else { player.succes[39] = 0; }
	if (player.buyedveh4 == 0) { player.succes[40] = 1; } else { player.succes[40] = 0; }
	if (player.buyedveh5 == 0) { player.succes[41] = 1; } else { player.succes[41] = 0; }
	if (player.buyedveh6 == 0) { player.succes[42] = 1; } else { player.succes[42] = 0; }
	if (player.buyedveh7 == 0) { player.succes[43] = 1; } else { player.succes[43] = 0; }
	if (player.buyedveh8 == 0) { player.succes[44] = 1; } else { player.succes[44] = 0; }
	if (player.buyedveh9 == 0) { player.succes[45] = 1; } else { player.succes[45] = 0; }
	if (player.buyedveh10 == 0) { player.succes[46] = 1; } else { player.succes[46] = 0; }
	if (player.buyedveh11 == 0) { player.succes[47] = 1; } else { player.succes[47] = 0; }
	if (player.buyedveh12 == 0) { player.succes[48] = 1; } else { player.succes[48] = 0; }
	if (player.buyedveh13 == 0) { player.succes[49] = 1; } else { player.succes[49] = 0; }
	if (player.buyedveh14 == 0) { player.succes[50] = 1; } else { player.succes[50] = 0; }
	if (player.buyedveh15 == 0) { player.succes[51] = 1; } else { player.succes[51] = 0; }
	if (player.buyedveh16 == 0) { player.succes[52] = 1; } else { player.succes[52] = 0; }
	var successlevel = 0;
	for (var succes = 0; succes < 53; succes++) {
		if (player.succes[succes] > 0) { successlevel++; $("#s" + succes).html("<div class='vert droite'>&check;</div>"); }
	}
	$("#successcount").html(successlevel + "/53 success obtained.");
};

var getSuccesReq = function (id) {
	var owned = 0;
	if (player.succes[id] != null) {
		owned = player.succes[id];
	}
	var cost = succes[id].require;
	return cost;
};