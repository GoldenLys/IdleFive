var UpdateUI = function () {
	ClicCashText = fix((p.ArmePower * p.GunMult) * (p.bonuscash + p.bonuspoints), 2);
	CashPSText = fix(p.cashps * p.bonuscash, 2);
	BonusCashText = fix(p.bonuscash, 2);
	CashText = fix(p.cash, 2);
	prestigeText = "";
	if (p.prestigeprice <= p.rank) { if (p.prestigeprice2 <= p.cash) { prestigeText = "<br>A new character slot is available."; } }
	points = "";
	if (p.points > 0) { points = "You have <font class='jaune'> " + p.points + " CP</font>."; }
	$("#prestigepoints").html(p.points + " (+" + p.prestige + ")");
	$("#valeurclic").html("You have <strong><font class='vert'>$" + CashText + "</font></strong> (+<font class='vert'>$" + CashPSText + "</font>/s)");
	$("#cashcount").html("Dollars <font class='desc vert'> $" + CashText + "</font>");
	$("#time").html("You started the " + p.DateStarted + "<br>And played since <font class='jaune'>" + toHHMMSS(p.playTime) + "</font>");
	$("#cashpscount").html("Dollars per second <font class='desc vert'> $" + CashPSText + "</font>");
	$("#buyedV1").html("Bikes bought <font class='desc'>" + p.VBought[0] + "/7</font>");
	$("#buyedV2").html("Motorcycles bought <font class='desc'>" + p.VBought[1] + "/47</font>");
	$("#buyedV3").html("Sports Classics cars bought <font class='desc'>" + p.VBought[2] + "/33</font>");
	$("#addcashcount").html("Dollars per clicks <font class='desc vert'> $" + ClicCashText + "</font>");
	$("#quality").html("Weapon | <strong>" + p.GunPower + p.Arme + "</strong> - <strong>" + p.Rarity + "<br><font class='blanc'></strong>Damage |<strong> </font>" + ClicCashText + "</strong></font><br>" + points + prestigeText);
	$("#bonuscashcount").html(BonusCashText + " (+0.15)");
	$("#rank").html("Rank | <strong>" + getRank(p.rank) + "</strong>");
	$("#prestigecount").html(p.prestige);
	$("#prestigepricecount").html(getRank(p.prestigeprice) + " <font class='blanc'>(" + p.prestigeprice + ")</font>");
	$("#prestigepricecount2").html("$" + fix(p.prestigeprice2, 2));
	$("#version").html("Current version " + version);
	$('#imagecash').css("background-image", "url(images/" + p.WeaponID + ".png)");
	document.title = "IdleFive " + version;
	showTutorial(p.tutorial);
	ClickEvents();
	WeaponList();
	MissionList();
	VehicleList();
	SuccessList();
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
			"<p class='jaune'>Level " + owned + "<br>" +
			"<p class='valeur2'>Value:&nbsp;<font class='valeur vert'> $" + fix(cost, 2) + "</font></p><br>" +
			"<p class='production-desc'><font class='vert'>$" + fix(p.bonuscash * productions[i].value * owned, 3) + "</font> per second" + "</p><br><br>" +
			"<a href='#' class='btn btn-buy" + canBuy + " gauche' onClick='BuyM(" + i + ", 1);''>BUY</a>" +
			"<a href='#' class='btn btn-buy2" + canBuy2 + " gauche' onClick='BuyM(" + i + ", 10);'>BUY 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10), 3) + "</font></a>" +
			"<a href='#' class='btn btn-sell" + canSell + " droite' onClick='SellM(" + i + ", 1);'>SELL</a>" +
			"<a href='#' class='btn btn-sell2" + canSell2 + " droite' onClick='SellM(" + i + ", 10);'>SELL 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10) / 8, 3) + "</font></a><br><br>" +
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
			canBuy = weapon.price * 2 > p.cash ? ' rougeb' : ' vert';
			name = "<font class='vert'>" + weapon.name + "</font>";
			cost = "Modification : <font class='" + canBuy + "'>$" + fix(weapon.price * 2, 2) + "</font>";
			damage = "<font class='rougeb'>" + fix(weapon.power, 1) + "</font>";
		} else {
			canBuy = weapon.price > p.cash ? ' rougeb' : ' vert';
			name = "<font class='gris'>" + weapon.name + "</font>";
			cost = "Price : <font class='" + canBuy + "'>$" + fix(weapon.price, 2) + "</font>";
			damage = "<font class='gris'>" + fix(weapon.power, 1) + "</font>";
		}

		view = p.GBought[i] > 0 ? '' : ' style="display:none;"';
		view2 = p.GBought[i] > 0 ? 'style="display:none;"' : '';
		canBuy = weapon.price > p.cash ? ' disabled' : '';
		canBuy2 = weapon.price * 2 > p.cash ? ' disabled' : '';
		url = "url('images/" + i + ".png')";

		var weaponsDIV = $(
			"<div class='arme-div arme' id='weap" + i + "'>" +
			"<p class='title blanc'>" + name + "</p><br><br>" +
			"<p class='btexte'>" + cost + "</font></p><br>" +
			"<p class='btexte'>Damage : " + damage + "</font></p><br><br>" +
			"<input type='button' class='btn btn-weapon" + canBuy + "' " + view2 + " value='Buy this weapon' onClick='buyG(" + i + ");' />" +
			"<input type='button' class='btn btn-weapon" + canBuy2 + "' " + view + " value='Try to modify this weapon' onClick='buyG(" + i + ");' />" +

			"<input type='button' class='btn btn-weapon2' " + view + " value='Use this weapon (normal)' onClick='useW(" + i + ");' />" +
			"<br></div>"
		);
		if (i < 13) { $('#Wtab1').append(weaponsDIV); }
		if (i > 12) { if (i < 28) { $('#Wtab2').append(weaponsDIV); } }
		if (i > 27) { if (i < 37) { $('#Wtab3').append(weaponsDIV); } }
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
		type = " <font class='rougeb'>ERROR</font> ";
		if (vehicle.type == 0) { type = " <font class='rougeb bold'>damage</font> "; }
		if (vehicle.type == 1) { type = " <font class='vert bold'>cash</font> "; }

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

function showVTab(id) { hideVTabs(); $('#Vtab' + id).show(); $("#V" + id).addClass('active'); }
function hideVTabs() { for (var id = 1; id < 17; id++) { $("#Vtab" + id).hide(); $("#V" + id).removeClass("active"); } }
function btnPrestigeD() { $("#btnPrestige").addClass("disabled"); }
function btnPrestigeE() { $("#btnPrestige").removeClass("disabled"); }
function hideTabs() { for (var id = 1; id < 4; id++) { $("#tab" + id).hide(); $("#t" + id).removeClass("active"); } }
function hideMenus() { for (var id = 1; id < 5; id++) { $("#menu-" + id).hide(); } }
function showWTab(id) { hideWTabs(); $('#Wtab' + id).show(); $("#W" + id).addClass("active"); }
function hideWTabs() { for (var id = 0; id < 10; id++) { $('#Wtab' + id).hide(); $("#W" + id).removeClass('active'); } }
function showSTab(id) { hideSTabs(); $('#Stab' + id).show(); $("#S" + id).addClass("active"); }
function hideSTabs() { for (var id = 0; id < 10; id++) { $('#Stab' + id).hide(); $("#S" + id).removeClass('active'); } }

function ClickEvents() {
	$("#game-menu").on("click", "button", function () { var id = $(this).data('id'); hideTabs(); $("#tab" + id).show(); $("#t" + id).addClass("active"); });
	$("#menu").on("click", "button", function () { var id = $(this).data('id'); hideMenus(); $("#menu-" + id).show(); });
}

function SuccessList() {
	for (var id = 0; id < 4; id++) { $('#Stab' + id).html(""); }
	var succeslevel = 0;

	for (var i in success) {
		var succes = success[i];
		if (p.succes[i] > 0) { succeslevel++; }

		if (succes.type == 0) { p.succes[0] = 1; }
		if (succes.type == 1) { if (p.cash >= succes.value) { p.succes[i] = 1; } }
		if (succes.type == 2) { if (p.productions[succes.value2] >= 100) { p.succes[i] = 1; } else { p.succes[i] = 0; } }
		if (succes.type == 3) { if (p.VBought[succes.value2] == succes.value) { p.succes[i] = 1; } else { p.succes[i] = 0; } }
		if (succes.type == 4) { if (p.rank >= succes.value) { p.succes[i] = 1; } }
		if (succes.type == 5) { if (p.prestige >= succes.value) { p.succes[i] = 1; } else { p.succes[i] = 0; } }

		var view = p.succes[i] > 0 ? '' : ' style="display:none;"';
		var succesDIV = $(
			"<div class='garage-div' " + view + " >" +
			"<p class='title vert'>" + succes.name + "</p><br>" +
			"<p class='btexte'>" + succes.desc + "</font></p>"
		);
		if (succes.type == 0) { $('#Stab0').append(succesDIV); }
		if (succes.type == 1) { $('#Stab1').append(succesDIV); }
		if (succes.type == 2) { $('#Stab2').append(succesDIV); }
		if (succes.type == 3) { $('#Stab3').append(succesDIV); }
		if (succes.type == 4) { $('#Stab0').append(succesDIV); }
		if (succes.type == 5) { $('#Stab0').append(succesDIV); }
	}
	$("#successcount").html("<font class='SuccessText'>" + succeslevel + "</font>/54 succes obtained.");
}

function showTutorial(id) {
	p.tutorial = id;
	$("#tutorial-title").html("tutorial - " + tutorialtexts[id].title);
	$("#tutorial-text").html(tutorialtexts[id].text);
}

function closeTutorial() {
	hideMenus();
	p.tutorial = 0;
}

function NextTuto() {
	if (p.tutorial < 6) { p.tutorial++; showTutorial(p.tutorial); }
	if (p.tutorial == 0) { $("#prev").addClass("disabled"); } else {
		$("#prev").removeClass("disabled");
	}
	if (p.tutorial == 6) { $("#next").addClass("disabled"); } else {
		$("#next").removeClass("disabled");
	}
}

function PrevTuto() {
	if (p.tutorial >= 1) { p.tutorial--; showTutorial(p.tutorial); }
	if (p.tutorial == 0) { $("#prev").addClass("disabled"); } else {
		$("#prev").removeClass("disabled");
	}
	if (p.tutorial == 6) { $("#next").addClass("disabled"); } else {
		$("#next").removeClass("disabled");
	}
}

function toggleDiscord() {
	if ($('#menu-1').css('right') == '20%') {
		for (var id = 1; id < 5; id++) { $('#menu-' + id).removeClass('menu-discord').addClass('menu'); }
		$("#discord").hide();
		$("#colonne-m").css("right", "60%");
		$("#colonne-d").css("right", "0%").css("left", "40%");
	} else { 
		for (var id = 1; id < 5; id++) { $('#menu-' + id).removeClass('menu').addClass('menu-discord'); }
		$("#discord").show();
		$("#colonne-m").css("right", "70%");
		$("#colonne-d").css("right", "19.5%").css("left", "30%");
	 }
}