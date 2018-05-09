var UpdateUI = function () {
	ClicCashText = fix((p.ArmePower * p.GunMult) * (p.bonuscash + p.bonuspoints), 2);
	CashPSText = fix(p.cashps * p.bonuscash, 2);
	BonusCashText = fix(p.bonuscash, 2);
	CashText = fix(p.cash, 2);
	prestigeText = "";
	if (p.prestigeprice <= p.rank) { if (p.prestigeprice2 <= p.cash) { prestigeText = "<br>A new character slot is available."; } }
	points = "";
	if (p.points > 0) { points = "You have <font class='jaune'> " + p.points + " CP</font>."; }
	$("#prestigepoints").html(p.points + "(+" + p.prestige + ")");
	$("#valeurclic").html("You have <strong><font class='vert'>$" + CashText + "</font></strong> (+<font class='vert'>$" + CashPSText + "</font>/s)");
	$("#cashcount").html("Dollars <font class='desc vert'> $" + CashText + "</font>");
	$("#time").html("You started the " + p.DateStarted + "<br>And played since <font class='jaune'>" + toHHMMSS(p.playTime) + "</font>");
	$("#cashpscount").html("Dollars per second <font class='desc vert'> $" + CashPSText + "</font>");
	$("#buyedV1").html("Bikes bought <font class='desc'>" + p.VBought[0] + "/7</font>");
	$("#buyedV2").html("Motorcycles bought <font class='desc'>" + p.VBought[1] + "/47</font>");
	$("#buyedV3").html("Sports Classics cars bought <font class='desc'>" + p.VBought[2] + "/33</font>");
	$("#addcashcount").html("Dollars per clicks <font class='desc vert'> $" + ClicCashText + "</font>");
	$("#quality").html("Weapon | <strong>" + p.GunPower + p.Arme + "</strong> - <strong>" + p.Rarity + "<br><font class='blanc'></strong>Damage |<strong> </font>" + ClicCashText + "</strong></font><br>" + points + prestigeText);
	$("#bonuscashcount").html(BonusCashText + "(+0.15)");
	$("#rank").html("Rank | <strong>" + getRank(p.rank) + "</strong>");
	$("#prestigecount").html(p.prestige);
	$("#prestigepricecount").html(getRank(p.prestigeprice));
	$("#prestigepricecount2").html("$" + fix(p.prestigeprice2, 2));
	$("#version").html("Current version " + version);
	$('#imagecash').css("background-image", "url(images/" + p.WeaponID + ".png)");
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
		if (p.productions[i] != null)
			owned = p.productions[i];
		var cost = GetMissionPrice(i, 1);
		var cost2 = GetMissionPrice(i, 10);

		var canBuy = cost > p.cash ? ' disabled' : '';
		var canBuy2 = cost2 > p.cash ? ' disabled' : '';
		var canSell = owned < 1 ? ' disabled' : '';
		var canSell2 = owned < 10 ? ' disabled' : '';
		var colorTitle = owned < 1 ? 'gris' : 'vert';

		var MissionDIV = $(

			"<p class='title " + colorTitle + "'>" + productions[i].name + "</p><br>" +
			"<p class='level'>Level " + owned + "<br>" +
			"<p class='valeur2'>Value:&nbsp;<font class='valeur vert'> $" + fix(cost, 2) + "</font></p><br>" +
			"<p class='production-desc'><font class='vert'>$" + fix(p.bonuscash * productions[i].value * owned, 3) + "</font> per second" + "</p><br><br>" +
			"<a href='#' class='btn-buy" + canBuy + " gauche' onClick='BuyM(" + i + ", 1);''>BUY</a>" +
			"<a href='#' class='btn-buy2" + canBuy2 + " gauche' onClick='BuyM(" + i + ", 10);'>BUY 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10), 3) + "</font></a>" +
			"<a href='#' class='btn-sell" + canSell + " droite' onClick='SellM(" + i + ", 1);'>SELL</a>" +
			"<a href='#' class='btn-sell2" + canSell2 + " droite' onClick='SellM(" + i + ", 10);'>SELL 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10) / 8, 3) + "</font></a><br><br>" +
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
		if (p.GBought[i] == 1) {
			canBuy = weapon.price * 10 > p.cash ? ' rougeb' : ' vert';
			name = "<font class='vert'>" + weapon.name + "</font>";
			cost = "Modification : <font class='" + canBuy + "'>$" + fix(weapon.price * 10, 2) + "</font>";
			damage = "<font class='rougeb'>" + fix(weapon.power, 1) + "</font>";
			buttonText = "Try to modify";
		} else {
			canBuy = weapon.price > p.cash ? ' rougeb' : ' vert';
			name = "<font class='gris'>" + weapon.name + "</font>";
			cost = "Price : <font class='" + canBuy + "'>$" + fix(weapon.price, 2) + "</font>";
			damage = "<font class='gris'>" + fix(weapon.power, 1) + "</font>";
			buttonText = "Buy";
		}

		view = p.GBought[i] > 0 ? '' : ' style="display:none;"';
		view2 = p.GBought[i] > 0 ? 'style="display:none;"' : '';
		canBuy = weapon.price > p.cash ? ' disabled' : '';
		canBuy2 = weapon.price * 10 > p.cash ? ' disabled' : '';
		url = "url('images/" + i + ".png')";

		var weaponsDIV = $(
			"<div class='arme-div arme' id='weap" + i + "'>" +
			"<p class='title blanc'>" + name + "</p><br><br>" +
			"<p class='btexte'>" + cost + "</font></p><br>" +
			"<p class='btexte'>Damage : " + damage + "</font></p><br><br>" +
			"<input type='button' class='btn btn-weapon" + canBuy + "' value='" + buttonText + " this weapon' onClick='buyG(" + i + ");' />" +
			"<input type='button' class='btn btn-weapon2" + canBuy2 + "' " + view + " value='Use this weapon (normal)' onClick='useW(" + i + ");' />" +
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
		if (p.vehicules[i] > 0) {
			bought = 'style="display:none;"';
			canBuy = "";
			name = "<font class='vert'>";
			cost = "<font class='vert'>IN YOUR GARAGE</font>";
			multiplier = "adds <font class='jaune'>" + fix(vehicle.value, 2) + "</font>";
		} else {
			bought = "";
			color = vehicle.price > p.points ? ' rougeb bold' : ' jaune bold';
			name = "<font class='gris'>";
			cost = "Price : <font class='" + color + "'>" + fix(vehicle.price, 3) + " CP</font>";
			multiplier = "adds <font class='gris'>" + fix(vehicle.value, 2) + "</font>";
		}

		url = "url('images/V/" + i + ".png')";
		canBuy = vehicle.price > p.points ? ' disabled' : '';
		type= " <font class='rougeb'>ERROR</font> ";
		if(vehicle.type==0) { type =" <font class='rougeb bold'>damage</font> ";}
		if(vehicle.type==1) { type =" <font class='vert bold'>cash</font> ";}

		var vehiclesDIV = $(
			"<div id='veh" + i + "' class='garage-div vehicleICON' style=" + url + ">" +
			"<p class='title blanc'>" + name + vehicle.name + "</font></p><br><br>" +
			"<p class='btexte'>" + cost + "</font></p><br>" +
			"<p class='btexte'> " + multiplier + "</font> of" + type + "multiplier</p><br><br>" +
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
	p.succes[0] = 1;
	if (p.cash >= 1) { p.succes[1] = 1; }
	if (p.cash >= 10) { p.succes[2] = 1; }
	if (p.cash >= 100) { p.succes[3] = 1; }
	if (p.cash >= 1000) { p.succes[4] = 1; }
	if (p.cash >= 10000) { p.succes[5] = 1; }
	if (p.cash >= 100000) { p.succes[6] = 1; }
	if (p.cash >= 1000000) { p.succes[7] = 1; }
	if (p.cash >= 10000000) { p.succes[8] = 1; }
	if (p.cash >= 1000000000) { p.succes[9] = 1; }
	if (p.prestige >= 2) { p.succes[10] = 1; } else { p.succes[10] = 0; }
	if (p.prestige >= 3) { p.succes[11] = 1; } else { p.succes[11] = 0; }
	if (p.prestige >= 4) { p.succes[12] = 1; } else { p.succes[12] = 0; }
	if (p.prestige >= 5) { p.succes[13] = 1; } else { p.succes[13] = 0; }
	if (p.prestige >= 6) { p.succes[14] = 1; } else { p.succes[14] = 0; }
	if (p.rank > 29) { p.succes[15] = 1; }
	if (p.rank > 199) { p.succes[16] = 1; }
	if (p.rank > 499) { p.succes[17] = 1; }
	if (p.rank > 799) { p.succes[18] = 1; }
	if (p.rank > 1099) { p.succes[19] = 1; }
	if (p.rank > 2199) { p.succes[20] = 1; }
	if (p.cash >= 1000000000000) { p.succes[21] = 1; }
	if (p.cash >= 1000000000000000) { p.succes[22] = 1; }
	if (p.prestige >= 7) { p.succes[23] = 1; } else { p.succes[23] = 0; }
	if (p.productions[0] >= 100) { p.succes[24] = 1; }
	if (p.productions[1] >= 100) { p.succes[25] = 1; }
	if (p.productions[2] >= 100) { p.succes[26] = 1; }
	if (p.productions[3] >= 100) { p.succes[27] = 1; }
	if (p.productions[4] >= 100) { p.succes[28] = 1; }
	if (p.productions[5] >= 100) { p.succes[29] = 1; }
	if (p.productions[6] >= 100) { p.succes[30] = 1; }
	if (p.productions[7] >= 100) { p.succes[31] = 1; }
	if (p.productions[8] >= 100) { p.succes[32] = 1; }
	if (p.productions[9] >= 100) { p.succes[33] = 1; }
	if (p.productions[10] >= 100) { p.succes[34] = 1; }
	if (p.productions[11] >= 100) { p.succes[35] = 1; }
	if (p.productions[12] >= 100) { p.succes[36] = 1; }
	if (p.buyedveh1 == 7) { p.succes[37] = 1; } else { p.succes[37] = 0; }
	if (p.buyedveh2 == 47) { p.succes[38] = 1; } else { p.succes[38] = 0; }
	if (p.buyedveh3 == 33) { p.succes[39] = 1; } else { p.succes[39] = 0; }
	if (p.buyedveh4 == 0) { p.succes[40] = 1; } else { p.succes[40] = 0; }
	if (p.buyedveh5 == 0) { p.succes[41] = 1; } else { p.succes[41] = 0; }
	if (p.buyedveh6 == 0) { p.succes[42] = 1; } else { p.succes[42] = 0; }
	if (p.buyedveh7 == 0) { p.succes[43] = 1; } else { p.succes[43] = 0; }
	if (p.buyedveh8 == 0) { p.succes[44] = 1; } else { p.succes[44] = 0; }
	if (p.buyedveh9 == 0) { p.succes[45] = 1; } else { p.succes[45] = 0; }
	if (p.buyedveh10 == 0) { p.succes[46] = 1; } else { p.succes[46] = 0; }
	if (p.buyedveh11 == 0) { p.succes[47] = 1; } else { p.succes[47] = 0; }
	if (p.buyedveh12 == 0) { p.succes[48] = 1; } else { p.succes[48] = 0; }
	if (p.buyedveh13 == 0) { p.succes[49] = 1; } else { p.succes[49] = 0; }
	if (p.buyedveh14 == 0) { p.succes[50] = 1; } else { p.succes[50] = 0; }
	if (p.buyedveh15 == 0) { p.succes[51] = 1; } else { p.succes[51] = 0; }
	if (p.buyedveh16 == 0) { p.succes[52] = 1; } else { p.succes[52] = 0; }
	var successlevel = 0;
	for (var succes = 0; succes < 53; succes++) {
		if (p.succes[succes] > 0) { successlevel++; $("#s" + succes).html("<div class='vert droite'>&check;</div>"); }
	}
	$("#successcount").html(successlevel + "/53 success obtained.");
};
