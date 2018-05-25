var UpdateUI = function () {
	ClicCashText = fix((p.ArmePower * p.GunMult) * (p.bonuscash + p.bonuspoints), 2);
	CashPSText = fix(p.cashps, 2);
	BonusCashText = fix(p.bonuscash, 2);
	CashText = fix(p.cash, 2);
	prestigeText = "";
	if (p.rank < 400) { PrestigePoints = 0; } else { PrestigePoints = Math.trunc(p.rank / 200); }
	if (p.prestigeprice <= p.rank) { if (p.prestigeprice2 <= p.cash) { prestigeText = texts.infos[2]; } }
	//LEFT INFOS
	$('#imagecash').attr('src', "http://aizen.hol.es/IdleFive/images/A/" + p.WeaponID + ".png");
	$("#cash").html("<font class='money'></font><font class='vert type1'>" + CashText + "</font> (<font class='vert'>" + CashPSText + "</font>/s)");
	$("#level").html(getRank(p.rank));
	$("#weapon").html(p.GunPower + p.Arme + " - " + p.Rarity);
	$("#damage").html(ClicCashText + "</font>");
	$("#points").html("<font class='jaune'> " + p.points + " CP</font>");
	$("#messages").html(prestigeText);
	//CHARACTER STATS
	$("#prestigecount").html(p.prestige);
	$("#prestigepricecount").html(getRank(p.prestigeprice));
	$("#prestigepricecount2").html("<font class='money'></font>" + fix(p.prestigeprice2, 2));
	$("#character-text4").html(texts.character[5] + "<font class='jaune'> " + PrestigePoints + " </font> " + texts.character[6]);
	$("#character-text5").html(texts.character[7] + "<font class='jaune'> " + BonusCashText + "</font> " + texts.character[8]);
	//STATS
	$("#cashcount").html("<font class='money'></font><font class='desc vert'>" + CashText + "</font> " + texts.stats[6]);
	$("#cashpscount").html("<font class='money'></font><font class='desc vert'>" + CashPSText + "</font> " + texts.stats[7]);
	$("#addcashcount").html("<font class='money'></font><font class='desc vert'>" + ClicCashText + "</font> " + texts.stats[8]);
	$("#buyedV1").html(texts.vehicletype[1] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[0] + "/7</font>");
	$("#buyedV2").html(texts.vehicletype[2] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[1] + "/46</font>");
	$("#buyedV3").html(texts.vehicletype[3] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[2] + "/34</font>");
	$("#buyedV4").html(texts.vehicletype[4] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[3] + "/56</font>");
	$("#buyedV5").html(texts.vehicletype[5] + " " + texts.stats[9] + " <font class='desc'>" + p.VBought[4] + "/39</font>");
	$("#time").html(texts.stats[10] + " " + p.DateStarted + "<tr>" + texts.stats[11] + " <font class='jaune'>" + toHHMMSS(p.playTime) + "</font>");
	WeaponList();
	MissionList();
	VehicleList();
	SuccessList();
};

function UpdateTexts() {
	//PRESTIGE TEXTS
	$("#character-title").html(texts.menus[0]);
	$("#character-number").html(texts.character[1]);
	$("#character-text1").html(texts.character[2]);
	$("#character-text2").html(texts.character[3]);
	$("#character-text3").html(texts.character[4]);
	$("#btnPrestige").val(texts.character[0]);
	//WEAPONS TYPES BUTTONS
	for (var weapon = 1; weapon < 10; weapon++) { $("#W" + weapon).html(texts.weapontype[weapon]); }
	//VEHICLES TYPES BUTTONS
	for (var vehicle = 1; vehicle < 17; vehicle++) { $("#V" + vehicle).html(texts.vehicletype[vehicle]); }
	//SUCCESS
	$("#S0").html(texts.success[1]);
	$("#S1").html(texts.success[2]);
	$("#S2").html(texts.success[3]);
	$("#S3").html(texts.success[4]);
	$("#CloseSuccess").html(texts.success[5]);
	//SAVE & STATS 
	$("#options-title").html(texts.stats[13]);
	$("#btnBackgrounds").val(texts.stats[14]);
	$("#savemenu").html(texts.stats[0]);
	$("#btnExport").val(texts.stats[2]);
	$("#btnImport").val(texts.stats[3]);
	$("#Recommencer").val(texts.stats[4]);
	$("#CloseStats").html(texts.stats[5]);
	$("#statistics").html(texts.stats[1]);
	$("#version").html(texts.stats[12] + " " + version);
	document.title = "idleFive " + version;

}

//GENERATE MISSIONS TAB

var MissionList = function () {
	$('#missions').html("<thead><tr class='shadow'><th class='ui center aligned'>Mission</th><th class='ui center aligned'>Level</th><th class='ui center aligned'>Value</th><th class='ui center aligned'>Product</th><th class='ui center aligned'>Manage</th></tr></thead>");

	var Missions = $("<tbody />");
	$('#missions').append(Missions);

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
		var colorTitle = owned < 1 ? 'text' : 'vert';

		var MissionDIV = $(
			"<tr><td class='single line ui center aligned'><font class='type2 " + colorTitle + "'>" + production.name + "</font></td>" +
			"<td class='single line ui center aligned'>" + owned + "</td>" +
			"<td class='single line ui center aligned'><font class='valeur2'><font class='money'></font><font class='valeur vert'>" + fix(cost, 1) + "</font></font></td>" +
			"<td class='ui center aligned'><font class='money'></font><font class='vert'>" + fix(p.bonuscash * production.value * owned, 2) + "</font>" + texts.missions[5] + "</td>" +
			"<td class='ui center aligned'><div class='ui center aligned buttons'><button class='ui positive button " + canBuy + "' onClick='BuyM(" + i + ", 1);'>Buy 1</button><div class='or'></div>" +
			"<button class='ui positive button " + canBuy2 + "' onClick='BuyM(" + i + ", 10);'>10</button></div><br />" +
			"<div class='ui buttons'><button class='ui negative button " + canSell + "' onClick='SellM(" + i + ", 1);'>Sell 1</button><div class='or'></div>" +
			"<button class='ui negative button " + canSell2 + "' onClick='SellM(" + i + ", 10);'>10</button></div></td></tr>"
		);
		Missions.append(MissionDIV);
	}
};

//GENERATE WEAPONS TAB

function WeaponList() {
	for (var id = 1; id < 10; id++) { $('#Wtab' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Weapon</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Damage</th><th class='ui center aligned'>Actions</th></tr></thead>"); }

	for (var i in weapons) {
		var weapon = weapons[i];
		canBBuy = weapon.price > p.cash ? ' basic red' : ' green';
		canBBuy2 = weapon.price * 2 > p.cash ? ' basic red' : ' green';

		if (p.GBought[i] == 1) {
			canBuy = weapon.price * 2 > p.cash ? ' rougeb' : ' blanc';
			name = "<font class='type2 vert'>" + weapon.name + "</font>";
			cost = "<i class='money'></i><font class='type1 " + canBuy + "'>" + fix(weapon.price * 2, 2) + "</font>";
			damage = "<font class='rougeb'>" + fix(weapon.power, 1) + "</font>";
			buttons = "<div class='fluid ui vertical animated button" + canBBuy2 + "' onClick='buyG(" + i + ");' tabindex='0'><div class='hidden content'>" + cost + "</div><div class='visible content'>" + texts.weapons[4] + "</div></div><button class='fluid ui button' onClick='useW(" + i + ");'>" + texts.weapons[5] + "</button>";
		} else {
			canBuy = weapon.price > p.cash ? ' rougeb' : ' blanc';
			name = "<font class='type2 text'>" + weapon.name + "</font>";
			cost = "<i class='money'></i><font class='type1 " + canBuy + "'>" + fix(weapon.price, 2) + "</font>";
			damage = "<font class='text'>" + fix(weapon.power, 1) + "</font>";
			buttons = "<div class='fluid ui vertical animated button" + canBBuy + "' onClick='buyG(" + i + ");' tabindex='0'><div class='hidden content'>" + cost + "</div><div class='visible content'>" + texts.weapons[3] + "</div></div>";
		}

		var weaponsDIV = $(
			"<tr class='ui center aligned' id='weap" + i + "'>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + cost + "</td>" +
			"<td class='ui center aligned'>" + damage + "</td>" +
			"<td class='ui center aligned'>" + buttons + "</td>" +
			"</tr>"
		);
		if (i < 13) { $('#Wtab1').append(weaponsDIV); }
		if (i > 12) { if (i < 28) { $('#Wtab2').append(weaponsDIV); } }
		if (i > 27) { if (i < 37) { $('#Wtab3').append(weaponsDIV); } }
	}
}

//GENERATE VEHICLES TAB

function VehicleList() {
	for (var id = 1; id < 17; id++) { $('#Vtab' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Vehicle</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Bonus</th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in vehicules) {
		var vehicle = vehicules[i];
		canBuy = vehicle.price > p.points ? ' basic disabled' : '';
		type = "";
		if (vehicle.type == 0) { type = " for the damage multiplier"; }
		if (vehicle.type == 1) { type = " for the cash multiplier"; }

		if (p.vehicules[i] > 0) {
			bought = "style='display:none;'";
			bought2 = "azn";
			name = "<font class='text type2'>";
			cost = "<font class='jaune'>Owned</font>";
			multiplier = "+<font class='jaune'>" + fix(vehicle.value, 2) + "</font>";
		} else {
			bought = "";
			bought2 = "";
			color = vehicle.price > p.points ? ' rougeb bold' : ' jaune bold';
			name = "<font class='text type2'>";
			cost = "<font class='" + color + "'>" + fix(vehicle.price, 3) + " CP</font>";
			multiplier = "+" + fix(vehicle.value, 2);
		}

		var vehiclesDIV = $(
			"<tr class='" + bought2 + "' id='veh" + i + "'>" +
			"<td class='center aligned ui'>" + name + vehicle.name + "</font></td>" +
			"<td class='center aligned'>" + cost + "</td>" +
			"<td class='center aligned'>" + multiplier + "</font> " + type + "</td>" +
			"<td class='center aligned'><button class='fluid ui green button" + canBuy + "' " + bought + " onClick='buyV(" + i + ");'>Purchase</button></td>" +
			"</tr>"
		);
		if (i < 7) { $('#Vtab1').append(vehiclesDIV); }
		if (i > 6) { if (i < 53) { $('#Vtab2').append(vehiclesDIV); } }
		if (i > 52) { if (i < 87) { $('#Vtab3').append(vehiclesDIV); } }
		if (i > 86) { if (i < 143) { $('#Vtab4').append(vehiclesDIV); } }
		if (i > 142) { if (i < 183) { $('#Vtab5').append(vehiclesDIV); } }
	}
}

//UI FUNCTIONS

function hideVTabs() { for (var id = 1; id < 17; id++) { $("#Vtab" + id).hide(); $("#V" + id).removeClass("active"); } }
function btnPrestigeD() { $("#btnPrestige").addClass("disabled").addClass("inverted"); }
function btnPrestigeE() { $("#btnPrestige").removeClass("disabled").removeClass("inverted"); }
function hideTabs() { for (var id = 1; id < 4; id++) { $("#tab" + id).hide(); $("#t" + id).removeClass("active"); } }
function hideMenus() { for (var id = 1; id < 6; id++) { $('#menu-' + id).modal('hide'); } }
function hideWTabs() { for (var id = 0; id < 10; id++) { $('#Wtab' + id).hide(); $("#W" + id).removeClass('active'); } }
function hideSTabs() { for (var id = 0; id < 10; id++) { $('#Stab' + id).hide(); $("#S" + id).removeClass('active'); } }

function ClickEvents() {
	$("#game-menu").on("click", "a", function () {
		var id = $(this).data('id'); hideTabs();
		$("#tab" + id).show();
		$("#t" + id).addClass("active");
	});
	$("#sidebar").on("click", "a", function () {
		var id = $(this).data('id');
		$('#menu-' + id).modal('show');
		$('.ui.sidebar').sidebar('toggle');
	});
	$('#select').dropdown();
	$('.ui.dropdown').dropdown();
	$("#weap-select").change(function () {
		var id = $(this).val();
		hideWTabs();
		$('#Wtab' + id).show();
		$("#W" + id).addClass("active");
	});
	$("#veh-select").change(function () {
		var id = $(this).val();
		hideVTabs();
		$('#Vtab' + id).show();
		$("#V" + id).addClass('active');
	});
	$("#top-menu").on("click", "#sidebar", function () {
		$('.ui.sidebar').sidebar('toggle');
	});
	$("#successtype").on("click", "button", function () {
		var id = $(this).data('id');
		hideSTabs();
		$('#Stab' + id).show();
		$("#S" + id).addClass("active");
	});
}

//SUCCESS MENU

function SuccessCount() {
	var succeslevel = 0;

	for (var i in success) {
		var succes = success[i];
		if (p.succes[i] > 0) { succeslevel++; }

		if (succes.type == 0) { if (p.tutorial == 6) { p.succes[0] = 1; } }
		if (succes.type == 1) { if (p.cash >= succes.value) { p.succes[i] = 1; } }
		if (succes.type == 2) { if (p.productions[succes.value2] >= 100) { p.succes[i] = 1; } else { p.succes[i] = 0; } }
		if (succes.type == 3) { if (p.VBought[succes.value2] == succes.value) { p.succes[i] = 1; } else { p.succes[i] = 0; } }
		if (succes.type == 4) { if (p.rank >= succes.value) { p.succes[i] = 1; } }
		if (succes.type == 5) { if (p.prestige >= succes.value) { p.succes[i] = 1; } else { p.succes[i] = 0; } }
	}
	$("#successcount").html("<font class='SuccessText'>" + succeslevel + "</font>/54 " + texts.success[0]);
}

function SuccessList() {
	for (var id = 0; id < 4; id++) { $('#Stab' + id).html(""); }

	for (var i in success) {
		var succes = success[i];
		var view = p.succes[i] > 0 ? '' : ' style="display:none;"';

		var succesDIV = $(
			"<div class='ui black icon message'" + view + " >" +
			"<i class='vert check icon'></i>" +
			"<div class='content'><p class='text type2'>" + succes.name + "</p>" +
			"<p>" + succes.desc + "</p></div></div>"
		);
		if (succes.type == 0) { $('#Stab0').append(succesDIV); }
		if (succes.type == 1) { $('#Stab1').append(succesDIV); }
		if (succes.type == 2) { $('#Stab2').append(succesDIV); }
		if (succes.type == 3) { $('#Stab3').append(succesDIV); }
		if (succes.type == 4) { $('#Stab0').append(succesDIV); }
		if (succes.type == 5) { $('#Stab0').append(succesDIV); }
	}
}

//TUTORIAL FUNCTIONS

function showTutorial(id) {
	p.tutorial = id;
	$("#tutorial-title").html("Guide - " + tutorialtexts[id].title);
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

function showTutorialDIV() {
	hideMenus();
	$("#menu-4").show();
	showTutorial(0);
}