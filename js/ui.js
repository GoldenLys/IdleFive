var UpdateUI = function () {
	ClicCashText = fix((player.ArmePower * player.GunMult) * (player.bonuscash + player.bonuspoints), 2);
	CashPSText = fix(player.cashps * player.bonuscash, 2);
	BonusCashText = fix(player.bonuscash, 2);
	CashText = fix(player.cash, 2);
	prestigeText = "";
	if (player.prestigeprice <= player.rank) { if (player.prestigeprice2 <= player.cash) { prestigeText = "<br>A new character slot is available."; } }
	points = "";
	if (player.points > 0) { points = "You have <font class='jaune'> " + player.points + " CP</font>."; }
	$("#prestigepoints").html(player.points + "(+" + player.prestige + ")");
	$("#valeurclic").html("You have <strong><font class='vert'>$" + CashText + "</font></strong> (+<font class='vert'>$" + CashPSText + "</font>/s)");
	$("#cashcount").html("Dollars <font class='desc vert'> $" + CashText + "</font>");
	$("#time").html("You started the " + player.DateStarted + "<br>And played since <font class='jaune'>" + toHHMMSS(player.playTime) + "</font>");
	$("#cashpscount").html("Dollars per second <font class='desc vert'> $" + CashPSText + "</font>");
	$("#buyedV1").html("Bikes bought <font class='desc'>" + player.buyedveh1 + "/7</font>");
	$("#buyedV2").html("Motorcycles bought <font class='desc'>" + player.buyedveh2 + "/47</font>");
	$("#buyedV3").html("Sports Classics Cars bought <font class='desc'>" + player.buyedveh3 + "/33</font>");
	$("#addcashcount").html("Dollars per clicks <font class='desc vert'> $" + ClicCashText + "</font>");
	$("#quality").html("Weapon | <strong>" + player.GunPower + player.Arme + "</strong> - <strong>" + player.Rarity + "<br><font class='blanc'></strong>Damage |<strong> </font>" + ClicCashText + "</strong></font><br>" + points + prestigeText);
	$("#bonuscashcount").html(BonusCashText + "(+0.25)");
	$("#rank").html("Rank | <strong>" + getRank() + "</strong>");
	$("#prestigecount").html(player.prestige);
	$("#prestigepricecount").html(getPrestigeLevel());
	$("#prestigepricecount2").html("$" + fix(player.prestigeprice2, 2));
	$("#version").html("Current version " + version);
	$('#imagecash').css("background-image", "url(images/" + player.WeaponID + ".png)");
	document.title = "IdleFive " + version;
	ClickEvents();
	WeaponList();
	MissionList();
	VehicleList();
};

//GENERATE MISSIONS TAB

var MissionList = function () {
	$('#productions').html('');

	var missions = $("<div class='garage-div' />");
	$('#productions').append(missions);

	for (var i in productions) {
		var production = productions[i];

		var owned = 0;
		if (player.productions[i] != null)
			owned = player.productions[i];
		var cost = GetMissionPrice(i, 1);
		var cost2 = GetMissionPrice(i, 10);

		var canBuy = cost > player.cash ? ' disabled' : '';
		var canBuy2 = cost2 > player.cash ? ' disabled' : '';
		var canSell = owned < 1 ? ' disabled' : '';
		var canSell2 = owned < 10 ? ' disabled' : '';
		var colorTitle = owned < 1 ? 'gris' : 'vert';

		var MissionDIV = $(

			"<p class='title " + colorTitle + "'>" + productions[i].name + "</p><br>" +
			"<p class='level'>Level " + owned + "<br>" +
			"<p class='valeur2'>Value:&nbsp;<font class='valeur vert'> $" + fix(cost, 2) + "</font></p><br>" +
			"<p class='production-desc'><font class='vert'>$" + fix(player.bonuscash * productions[i].value * owned, 3) + "</font> per second" + "</p><br><br>" +
			"<a href='#' class='btn-buy" + canBuy + " gauche' onClick='BuyM(" + i + ", 1);''>BUY</a>" +
			"<a href='#' class='btn-buy2" + canBuy2 + " gauche' onClick='BuyM(" + i + ", 10);'>BUY 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10), 3) + "</font></a>" +
			"<a href='#' class='btn-sell" + canSell + " droite' onClick='SellM(" + i + ", 1);'>SELL</a>" +
			"<a href='#' class='btn-sell2" + canSell2 + " droite' onClick='SellM(" + i + ", 10);'>SELL 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10) / 2, 3) + "</font></a><br><br>" +
			"<div class='bar'></div>"
		);
		missions.append(MissionDIV);
	}
};

//GENERATE WEAPONS TAB

function WeaponList() {
	for (var id = 1; id < 10; id++) { $('#Wtab' + id).html(""); }

	for (var i in weapons) {
		var weapon = weapons[i];
		if (player.GBought[i] == 1) {
			canBuy = weapon.price * 10 > player.cash ? ' rougeb' : ' vert';
			name = "<font class='vert'>" + weapon.name + "</font>";
			cost = "Modification : <font class='" + canBuy + "'>$" + fix(weapon.price * 10, 2) + "</font>";
			damage = "<font class='rougeb'>" + fix(weapon.power, 1) + "</font>";
			buttonText = "Try to modify";
		} else {
			canBuy = weapon.price > player.cash ? ' rougeb' : ' vert';
			name = "<font class='gris'>" + weapon.name + "</font>";
			cost = "Price : <font class='" + canBuy + "'>$" + fix(weapon.price, 2) + "</font>";
			damage = "<font class='gris'>" + fix(weapon.power, 1) + "</font>";
			buttonText = "Buy";
		}

		view = player.GBought[i] > 0 ? '' : ' style="display:none;"';
		view2 = player.GBought[i] > 0 ? 'style="display:none;"' : '';
		canBuy = weapon.price > player.cash ? ' disabled' : '';
		canBuy2 = weapon.price * 10 > player.cash ? ' disabled' : '';
		url = "url('images/" + i + ".png')";

		var weaponsDIV = $(
			"<div class='arme-div arme' id='weap" + i + "'>" +
			"<p class='title blanc'>" + name + "</p><br><br>" +
			"<p class='btexte'>" + cost + "</font></p><br>" +
			"<p class='btexte'>Damage : " + damage + "</font></p><br><br>" +
			"<input type='button' class='btn btn-weapon" + canBuy + "' value='" + buttonText + " this weapon' onClick='buyG(" + i + ");' />" +
			"<input type='button' class='btn btn-weapon" + canBuy2 + "' " + view + " value='Use this weapon' onClick='useW(" + i + ");' />" +
			"<br></div>"
		);
		if (i < 13) { $('#Wtab1').append(weaponsDIV); }
		if (i > 12) { if (i < 28) { $('#Wtab2').append(weaponsDIV); } }
		$('#weap' + i).css('background-image', url);
	}
}

//GENERATE VEHICLES TAB

function VehicleList() {
	for (var id = 1; id < 17; id++) { $('#Vtab' + id).html(""); }

	for (var i in vehicules) {
		var vehicle = vehicules[i];
		if (player.vehicules[i] > 0) {
			bought = 'style="display:none;"';
			canBuy = "";
			name = "<font class='vert'>";
			cost = "<font class='vert'>IN YOUR GARAGE</font>";
			multiplier = "adds <font class='jaune'>" + fix(vehicle.value, 2) + "</font>";
		} else {
			bought = "";
			color = vehicle.price > player.points ? ' rougeb bold' : ' jaune bold';
			name = "<font class='gris'>";
			cost = "Price : <font class='" + color + "'>" + fix(vehicle.price, 3) + " CP</font>";
			multiplier = "adds <font class='gris'>" + fix(vehicle.value, 2) + "</font>";
		}

		url = "url('images/V/" + i + ".png')";
		canBuy = vehicle.price > player.points ? ' disabled' : '';

		var vehiclesDIV = $(
			"<div id='veh" + i + "' class='garage-div vehicleICON' style=" + url + ">" +
			"<p class='title blanc'>" + name + vehicle.name + "</font></p><br><br>" +
			"<p class='btexte'>" + cost + "</font></p><br>" +
			"<p class='btexte'> " + multiplier + "</font> to the damage multiplier</p><br><br>" +
			"<input type='button' class='btn btn-veh" + canBuy + "' " + bought + " value='Purchase' onClick='buyV(" + i + ");' />" +
			"<br></div>"
		);
		if (i < 7) { $('#Vtab1').append(vehiclesDIV); }
		if (i > 6) { if (i < 53) { $('#Vtab2').append(vehiclesDIV); } }
		if (i > 52) { if (i < 87) { $('#Vtab3').append(vehiclesDIV); } }
		$('#veh' + i).css('background-image', url);
	}
}

//UI FUNCTIONS

function showVTab(id) { hideVTabs(); $('#Vtab' + id).show(); $("#V" + id).addClass('active');  }
function hideVTabs() { for (var id = 1; id < 17; id++) { $("#Vtab" + id).hide(); $("#V" + id).removeClass("active"); } }
function btnPrestigeD() { $("#btnPrestige").addClass("disabled"); }
function btnPrestigeE() { $("#btnPrestige").removeClass("disabled"); }
function hideTabs() { for (var id = 1; id < 4; id++) { $("#tab" + id).hide(); $("#t" + id).removeClass("active"); } }
function hideMenus() { for (var id = 1; id < 5; id++) { $("#menu-" + id).hide(); } }
function showWTab(id) { hideWTabs(); $('#Wtab' + id).show(); $("#W" + id).addClass("active"); }
function hideWTabs() { for (var id = 1; id < 10; id++) { $('#Wtab' + id).hide(); $("#W" + id).removeClass('active'); } }

function ClickEvents() {
	$("#game-menu").on("click", "button", function () { var id = $(this).data('id'); hideTabs(); $("#tab" + id).show(); $("#t" + id).addClass("active"); });
	$("#menu").on("click", "button", function () { var id = $(this).data('id'); hideMenus(); $("#menu-" + id).show(); }); 
}

//CHECKING IF THE PLAYER HAS A SUCCESS

var checkSucces = function (id) {
	player.succes[0] = 1;
	if (player.cash >= 1) { player.succes[1] = 1; }
	if (player.cash >= 10) { player.succes[2] = 1; }
	if (player.cash >= 100) { player.succes[3] = 1; }
	if (player.cash >= 1000) { player.succes[4] = 1; }
	if (player.cash >= 10000) { player.succes[5] = 1; }
	if (player.cash >= 100000) { player.succes[6] = 1; }
	if (player.cash >= 1000000) { player.succes[7] = 1; }
	if (player.cash >= 10000000) { player.succes[8] = 1; }
	if (player.cash >= 1000000000) { player.succes[9] = 1; }
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
	if (player.cash >= 1000000000000) { player.succes[21] = 1; }
	if (player.cash >= 1000000000000000) { player.succes[22] = 1; }
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
