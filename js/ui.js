var UpdateUI = function () {
	ClicCashText = fix((p.ArmePower * p.GunMult) * (p.bonuscash + p.bonuspoints), 2);
	CashPSText = fix(p.cashps * p.bonuscash, 2);
	BonusCashText = fix(p.bonuscash, 2);
	CashText = fix(p.cash, 2);
	prestigeText = "";
	if (p.rank < 400) { PrestigePoints = 0; } else { PrestigePoints = Math.trunc(p.rank / 400); }
	if (p.prestigeprice <= p.rank) { if (p.prestigeprice2 <= p.cash) { prestigeText = "<br>" + texts.infos[2]; } }
	points = "";
	if (p.points > 0) { points = texts.infos[4] + " <font class='jaune'> " + p.points + " CP</font>."; }
	//LEFT INFOS
	$("#valeurclic").html("<font class='money'></font><strong><font class='vert'>" + CashText + "</font></strong> (+<font class='money'></font><font class='vert'>" + CashPSText + "</font>/s)");
	$("#quality").html(texts.infos[0] + " | <strong>" + p.GunPower + p.Arme + "</strong> - <strong>" + p.Rarity + "<br><font class='blanc'></strong>" + texts.infos[1] + " |<strong> </font>" + ClicCashText + "</strong></font><br>" + points + prestigeText);
	$("#rank").html(texts.infos[7] + " | <strong>" + getRank(p.rank) + "</strong><div class='level'></div>");
	$('#imagecash').css("background-image", "url(http://aizen.hol.es/IdleFive/images/A/" + p.WeaponID + ".png)");
	//MENUS TEXTS
	$("#menu1").html(texts.menus[0] + "   ");
	$("#menu2").html(texts.menus[1] + "   ");
	$("#menu3").html(texts.menus[2] + "   ");
	$("#menu4").html(texts.menus[3] + "   ");
	$("#t1").html(texts.menus[5] + "   ");
	$("#t2").html(texts.menus[6] + "   ");
	$("#t3").html(texts.menus[7] + "   ");
	//CHARACTER TEXTS
	$("#prestigecount").html(p.prestige);
	$("#prestigepricecount").html(getRank(p.prestigeprice));
	$("#prestigepricecount2").html("<font class='money'></font>" + fix(p.prestigeprice2, 2));
	$("#character-title").html(texts.menus[0]);
	$("#character-number").html(texts.character[1]);
	$("#character-text1").html(texts.character[2]);
	$("#character-text2").html(texts.character[3]);
	$("#character-text3").html(texts.character[4]);
	$("#character-text4").html(texts.character[5] + "<font class='jaune'> " + PrestigePoints + " </font> " + texts.character[6]);
	$("#character-text5").html(texts.character[7] + "<font class='jaune'> " + BonusCashText + "</font> " + texts.character[8]);
	$("#btnPrestige").val(texts.character[0]);
	//GUIDE TEXTS
	$("#tuto-next").html(texts.guide[1]);
	$("#tuto-prev").html(texts.guide[2]);
	$("#tuto-close").html(texts.guide[3]);
	//WEAPONS TYPES BUTTONS
	for (var weapon = 1; weapon < 10; weapon++) { $("#W" + weapon).val(texts.weapontype[weapon]); }
	//VEHICLES TYPES BUTTONS
	for (var vehicle = 1; vehicle < 17; vehicle++) { $("#V" + vehicle).val(texts.vehicletype[vehicle]); }
	//SUCCESS
	$("#S0").val(texts.success[1]);
	$("#S1").val(texts.success[2]);
	$("#S2").val(texts.success[3]);
	$("#S3").val(texts.success[4]);
	$("#CloseSuccess").html(texts.success[5]);
	//SAVE & STATS 
	$("#savemenu").html(texts.stats[0]);
	$("#btnExport").val(texts.stats[2]);
	$("#btnImport").val(texts.stats[3]);
	$("#Recommencer").val(texts.stats[4]);
	$("#CloseStats").html(texts.stats[5]);
	$("#statistics").html(texts.stats[1]);
	$("#cashcount").html("<font class='money'></font><font class='desc vert'>" + CashText + "</font> "+ texts.stats[6]);
	$("#cashpscount").html("<font class='money'></font><font class='desc vert'>" + CashPSText + "</font> " + texts.stats[7]);
	$("#addcashcount").html("<font class='money'></font><font class='desc vert'>" + ClicCashText + "</font> " + texts.stats[8]);
	$("#buyedV1").html(texts.vehicletype[1] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[0] + "/7</font>");
	$("#buyedV2").html(texts.vehicletype[2] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[1] + "/46</font>");
	$("#buyedV3").html(texts.vehicletype[3] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[2] + "/34</font>");
	$("#buyedV4").html(texts.vehicletype[4] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[3] + "/56</font>");
	$("#buyedV5").html(texts.vehicletype[5] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[4] + "/39</font>");
	$("#time").html(texts.stats[10] + " " + p.DateStarted + "<br>" + texts.stats[11] + " <font class='jaune'>" + toHHMMSS(p.playTime) + "</font>");
	$("#version").html(texts.stats[12] + " " + version);
	document.title = "idleFive " + version;
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

			"<font class='title " + colorTitle + "'>" + production.name + "</font><br><br>" +
			"<font class='jaune'>" + texts.missions[2] + " " + owned + "</font><br><br>" +
			"<font class='valeur2'>" + texts.missions[3] + ": <font class='money'></font><font class='valeur vert'>" + fix(cost, 1) + "</font></font><br>" +
			"<p class='production-desc'>" + texts.missions[4] + " <font class='money'></font><font class='gris'>" + fix(p.bonuscash * production.value, 2) + "</font> " + texts.missions[5] + "<br>" + texts.missions[6] + " <font class='money'></font><font class='vert'>" + fix(p.bonuscash * production.value * owned, 2) + "</font>" + texts.missions[7] + "</p>" +
			"<a href='#' class='btn btn-buy" + canBuy + " gauche' onClick='BuyM(" + i + ", 1);''>" + texts.missions[0] + "</a>" +
			"<a href='#' class='btn btn-buy2" + canBuy2 + " gauche' onClick='BuyM(" + i + ", 10);'>" + texts.missions[0] + " 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10), 1) + "</font></a>" +
			"<a href='#' class='btn btn-sell" + canSell + " droite' onClick='SellM(" + i + ", 1);'>" + texts.missions[1] + "</a>" +
			"<a href='#' class='btn btn-sell2" + canSell2 + " droite' onClick='SellM(" + i + ", 10);'>" + texts.missions[1] + " 10<br> <font class='buttonText'>$" + fix(GetMissionSPrice(i, 10), 1) + "</font></a>" +
			"<br /><br /><div class='bar'></div>"
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
			cost = texts.weapons[1] + " : <font class='money'></font><font class='" + canBuy + "'>" + fix(weapon.price * 2, 2) + "</font>";
			damage = "<font class='rougeb'>" + fix(weapon.power, 1) + "</font>";
		} else {
			canBuy = weapon.price > p.cash ? ' rougeb' : ' vert';
			name = "<font class='gris'>" + weapon.name + "</font>";
			cost = texts.weapons[0] + " : <font class='money'></font><font class='" + canBuy + "'>" + fix(weapon.price, 2) + "</font>";
			damage = "<font class='gris'>" + fix(weapon.power, 1) + "</font>";
		}

		view = p.GBought[i] > 0 ? '' : ' style="display:none;"';
		view2 = p.GBought[i] > 0 ? 'style="display:none;"' : '';
		canBuy = weapon.price > p.cash ? ' disabled' : '';
		canBuy2 = weapon.price * 2 > p.cash ? ' disabled' : '';
		url = "url('http://aizen.hol.es/IdleFive/images/A/" + i + ".png')";

		var weaponsDIV = $(
			"<div class='arme-div arme' id='weap" + i + "'>" +
			"<p class='title blanc wleft'>" + name + "</p><br><br><br>" +
			"<p class='btexte wleft'>" + cost + "</font><br>" +
			texts.weapons[2] + " : " + damage + "</font></p><br><br><br><br>" +
			"<input type='button' class='btn btn-weapon" + canBuy + " gauche' " + view2 + " value='" + texts.weapons[3] + "' onClick='buyG(" + i + ");' /><br />" +
			"<input type='button' class='btn btn-weapon" + canBuy2 + "' " + view + " value='" + texts.weapons[4] + "' onClick='buyG(" + i + ");' />" +
			"<input type='button' class='btn btn-weapon2' " + view + " value='" + texts.weapons[5] + "' onClick='useW(" + i + ");' />" +
			"<br><br><div class='bar'></div></div>"
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
			cost = "<font class='vert'>" + texts.vehicles[7] + "</font>";
			multiplier = texts.vehicles[1] + " <font class='jaune'>" + fix(vehicle.value, 2) + "</font>";
		} else {
			bought = "";
			color = vehicle.price > p.points ? ' rougeb bold' : ' jaune bold';
			name = "<font class='gris'>";
			cost = texts.vehicles[0] + " : <font class='" + color + "'>" + fix(vehicle.price, 3) + " CP</font>";
			multiplier = texts.vehicles[1] + " <font class='gris'>" + fix(vehicle.value, 2) + "</font>";
		}

		url = "url('http://aizen.hol.es/IdleFive/images/V/" + i + ".jpg')";
		canBuy = vehicle.price > p.points ? ' disabled' : '';
		type = "";
		if (vehicle.type == 0) { type = " <font class='rougeb bold'>" + texts.vehicles[4] + "</font> "; }
		if (vehicle.type == 1) { type = " <font class='vert bold'>" + texts.vehicles[3] + "</font> "; }

		var vehiclesDIV = $(
			"<div id='veh" + i + "' class='vehicleICON'>" +
			"<p class='title blanc'>" + name + vehicle.name + "</font></p><br><br>" +
			"<p class='btexte'>" + cost + "</font></p><br>" +
			"<p class='btexte'> " + multiplier + "</font> " + texts.vehicles[2] + " " + type + texts.vehicles[5] + "</p><br><br>" +
			"<input type='button' class='btn btn-veh" + canBuy + "' " + bought + " value='" + texts.vehicles[6] + "' onClick='buyV(" + i + ");' />" +
			"<br /><br /><div class='bar'></div></div>"
		);
		if (i < 7) { $('#Vtab1').append(vehiclesDIV); }
		if (i > 6) { if (i < 53) { $('#Vtab2').append(vehiclesDIV); } }
		if (i > 52) { if (i < 87) { $('#Vtab3').append(vehiclesDIV); } }
		if (i > 86) { if (i < 143) { $('#Vtab4').append(vehiclesDIV); } }
		if (i > 142) { if (i < 183) { $('#Vtab5').append(vehiclesDIV); } }
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
	$("#game-menu").on("click", "button", function () { var id = $(this).data('id'); hideTabs(); $("#tab" + id).show(); $("#body").css("background-image", "url(http://aizen.hol.es/IdleFive/images/bg-" + id + ".jpg"); $("#t" + id).addClass("active"); });
	$("#menu").on("click", "button", function () { var id = $(this).data('id'); hideMenus(); $("#menu-" + id).show(); });
}

function SuccessList() {
	for (var id = 0; id < 4; id++) { $('#Stab' + id).html(""); }
	var succeslevel = 0;

	for (var i in success) {
		var succes = success[i];
		if (p.succes[i] > 0) { succeslevel++; }

		if (succes.type == 0) { if (p.tutorial==6) { p.succes[0] = 1; } }
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
	$("#successcount").html("<font class='SuccessText'>" + succeslevel + "</font>/54 " + texts.success[0]);
}

function showTutorial(id) {
	p.tutorial = id;
	$("#tutorial-title").html(texts.guide[0] + " - " + tutorialtexts[id].title);
	$("#tutorial-text").html(tutorialtexts[id].text);
}

function closeTutorial() {
	hideMenus();
	p.tutorial = 0;
}

function NextTuto() {
	if (p.tutorial < 6) { p.tutorial++; showTutorial(p.tutorial); }
	if (p.tutorial == 0) { $("#tuto-prev").addClass("disabled"); } else {
		$("#tuto-prev").removeClass("disabled");
	}
	if (p.tutorial == 6) { $("#tuto-next").addClass("disabled"); } else {
		$("#tuto-next").removeClass("disabled");
	}
}

function PrevTuto() {
	if (p.tutorial >= 1) { p.tutorial--; showTutorial(p.tutorial); }
	if (p.tutorial == 0) { $("#tuto-prev").addClass("disabled"); } else {
		$("#tuto-prev").removeClass("disabled");
	}
	if (p.tutorial == 6) { $("#tuto-next").addClass("disabled"); } else {
		$("#tuto-next").removeClass("disabled");
	}
}

function toggleDiscord() {
	if ($('#menu-1').css('right') == '27%') {
		//HIDE DISCORD
		for (var menulist = 1; menulist < 5; menulist++) { $('#menu-' + menulist).removeClass('menu-discord').addClass('menu'); }
		$("#discord").hide();
		$("#colonne-m").css("right", "59.6%");
		$("#menu").css("right", "0%");
		$("#colonne-d").css("right", "0%").css("left", "40%");
		$("#btnDiscord").html(texts.menus[4] + "<br><font class='buttonText rougeb'>(OFF)</font>");
	} else {
		//SHOW DISCORD
		for (var menulist2 = 1; menulist2 < 5; menulist2++) { $('#menu-' + menulist2).removeClass('menu').addClass('menu-discord'); }
		$("#discord").show();
		$("#menu").css("right", "27%");
		$("#colonne-m").css("right", "72.7%");
		$("#colonne-d").css("right", "27%").css("left", "27%");
		$("#btnDiscord").html(texts.menus[4] + "<br><font class='buttonText vert'>(ON)</font>");
	}
}

function ChangeLang() {
	if (p.lang == "English") {
		texts = textsFRA;
		p.lang = "Français";
		$("#lang").css("background-image", "url('http://aizen.hol.es/IdleFive/images/fra.png')");
	} else {
		texts = textsENG;
		p.lang = "English";
		$("#lang").css("background-image", "url('http://aizen.hol.es/IdleFive/images/eng.png')");
	}
	UpdateUI();
}

function showTutorialDIV() {
	hideMenus();
	$("#menu-4").show();
	showTutorial(0);
}