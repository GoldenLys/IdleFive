var UpdateUI = function () {
	ClicCashText = fix((p.ArmePower * p.QualityMult) * (p.PrestigeMult + p.DamageMult + p.CashMult), 2);
	CashPSText = fix(p.cashps, 2);
	PrestigeMultText = fix(p.PrestigeMult, 2);
	CashText = fix(p.cash, 2);
	prestigeText = "";
	WeaponsNBR = 0;
	AllWeaponsNBR = 0;
	for (var i in weapons) { AllWeaponsNBR+=1; WeaponsNBR+=p.Armes[i]; }
	if (p.rank < 400) { PrestigePoints = 0; } else { PrestigePoints = Math.trunc(p.rank / 200); }
	if (p.prestigeprice <= p.rank) { if (p.prestigeprice2 <= p.cash) { prestigeText = texts.infos[2]; } }
	//LEFT INFOS
	$('#imagecash').attr('src', "http://aizen.hol.es/IdleFive/images/A/" + p.ArmeID + ".png");
	$("#cash").html("<i class='money'></i><font class='vert bold'>" + CashText + "</font> (<font class='vert'>" + CashPSText + "</font>/s)");
	$("#level").html(getRank(p.rank));
	$("#weapon").html(p.Arme);
	$("#quality").html(p.ArmeClass + p.Quality + "</font>");
	$("#damage").html(p.ArmeClass + "<font class='bold'>" + ClicCashText + "</font></font>");
	$("#points").html("<font class='jaune'> " + p.points + " CP</font>");
	$("#messages").html(prestigeText);
	//CHARACTER
	$("#prestigecount").html(p.prestige);
	$("#prestigepricecount").html(getRank(p.prestigeprice));
	$("#prestigepricecount2").html("<i class='money'></i>" + fix(p.prestigeprice2, 2));
	$("#character-text4").html(texts.character[5] + "<font class='jaune'> " + PrestigePoints + " </font> " + texts.character[6]);
	$("#character-text5").html(texts.character[7] + "<font class='jaune'> " + PrestigeMultText + "</font> " + texts.character[8]);
	//CASH - STATS
	$("#cashcount").html("<i class='money'></i><font class='desc vert'>" + CashText + "</font> " + texts.stats[6]);
	$("#cashpscount").html("<i class='money'></i><font class='desc vert'>" + CashPSText + "</font> " + texts.stats[7]);
	$("#addcashcount").html("<i class='money'></i><font class='desc vert'>" + ClicCashText + "</font> " + texts.stats[8]);
	//VEHICLES - STATS
	$("#boughtvehicles1").html(texts.vehicletype[1] + " bought <font class='bold jaune'>" + p.VBought[0] + "</font>/7.");
	$("#boughtvehicles2").html(texts.vehicletype[2] + " bought <font class='bold jaune'>" + p.VBought[1] + "</font>/46.");
	$("#boughtvehicles3").html(texts.vehicletype[3] + " bought <font class='bold jaune'>" + p.VBought[2] + "</font>/34.");
	$("#boughtvehicles4").html(texts.vehicletype[4] + " bought <font class='bold jaune'>" + p.VBought[3] + "</font>/56.");
	$("#boughtvehicles5").html(texts.vehicletype[5] + " bought <font class='bold jaune'>" + p.VBought[4] + "</font>/39.");
	//WEAPONS - STATS
	$("#weapons-bought").html(WeaponsNBR + "/" + AllWeaponsNBR + " weapons bought.");
	$("#weaponsT1").html(p.GBought[0] + " " + texts.weapontype[1] + " bought.");
	$("#weaponsT2").html(p.GBought[1] + " " + texts.weapontype[2] + " bought.");
	$("#weaponsT3").html(p.GBought[2] + " " + texts.weapontype[3] + " bought.");
	$("#weaponsT4").html(p.GBought[3] + " " + texts.weapontype[4] + " bought.");
	$("#weaponsT5").html(p.GBought[4] + " " + texts.weapontype[5] + " bought.");
	$("#weaponsT6").html(p.GBought[5] + " " + texts.weapontype[6] + " bought.");
	$("#weaponsT7").html(p.GBought[6] + " " + texts.weapontype[7] + " bought.");
	$("#weaponsT8").html(p.GBought[7] + " " + texts.weapontype[8] + " bought.");
	$("#weaponsT9").html(p.GBought[8] + " " + texts.weapontype[9] + " bought.");
	//MULTIPLIERS - STATS
	$("#cashmult").html("Cash multiplier at <font class='jaune bold'>" + fix(p.CashMult + p.PrestigeMult, 1) + "</font>");
	$("#damagemult").html("Damage multiplier at <font class='jaune bold'>" + fix(p.DamageMult + p.PrestigeMult, 1)+ "</font>");
	$("#prestigemult").html("Prestige multiplier at <font class='jaune bold'>" + fix(p.PrestigeMult, 1)+ "</font>");
	//OTHERS - STATS
	$("#spcount").html("Character number <font class='jaune'>" + p.prestige + "</font>.");
	$("#time").html(texts.stats[10] + " " + p.DateStarted + "<br />" + texts.stats[11] + " <font class='jaune'>" + toHHMMSS(p.playTime) + "</font>");
	WeaponList();
	MissionList();
	VehicleList();
	SuccessList();
	SuccessCount();
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

	for (var i in missions) {
		var production = missions[i];

		var owned = 0;
		if (p.missions[i] != null)
			owned = p.missions[i];
		var cost = GetMissionPrice(i, 1);
		var cost2 = GetMissionPrice(i, 10);

		var canBuy = cost > p.cash ? ' disabled' : '';
		var canBuy2 = cost2 > p.cash ? ' disabled' : '';
		var canBuyColor = cost > p.cash ? ' rouge' : ' text';
		var canSell = owned < 1 ? ' disabled' : '';
		var canSell2 = owned < 10 ? ' disabled' : '';
		var color = owned < 1 ? '' : 'azn';
		var cashColor = owned < 1 ? 'blanc' : 'vert';

		var MissionDIV = $(
			"<tr class='" + color + "'><td class='single line ui center aligned'><font class='type2'>" + production.name + "</font></td>" +
			"<td class='single line ui center aligned'>" + owned + "</td>" +
			"<td class='single line ui center aligned'><font class='valeur2'><i class='money'></i><font class='valeur " + canBuyColor + "'>" + fix(cost, 1) + "</font></font></td>" +
			"<td class='ui center aligned'><i class='money'></i><font class='" + cashColor + "'>" + fix(p.PrestigeMult * production.value * owned, 2) + "</font>" + texts.missions[5] + "</td>" +
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
		canBBuy2 = weapon.price * 1.25 > p.cash ? ' basic red' : ' green';
		Damage = fix(weapon.power * (p.PrestigeMult + p.DamageMult + p.CashMult), 2);

		if (p.Armes[i] == 1) {
			if (p.ArmeID == i) { equipment = 'azn-active'; } else { equipment = ''; }
			bought = 'azn ';
			canBuy = weapon.price * 1.25 > p.cash ? ' rouge' : ' blanc';
			name = "<font class='type2 text'>" + weapon.name + "</font>";
			cost = "<i class='money'></i><font class='type1 " + canBuy + "'>" + fix(weapon.price * 1.25, 2) + "</font>";
			damage = "<font class='jaune'>" + Damage + "</font>";
			buttons = "<div class='fluid ui vertical animated button" + canBBuy2 + "' onClick='buyG(" + i + ");' tabindex='0'><div class='hidden content'>" + cost + "</div><div class='visible content'>" + texts.weapons[4] + "</div></div><button class='fluid ui button' onClick='useW(" + i + ");'>" + texts.weapons[5] + "</button>";
		} else {
			bought = '';
			equipment = '';
			canBuy = weapon.price > p.cash ? ' rouge' : ' blanc';
			name = "<font class='type2 text'>" + weapon.name + "</font>";
			cost = "<i class='money'></i><font class='type1 " + canBuy + "'>" + fix(weapon.price, 2) + "</font>";
			damage = "<font class='text'>" + Damage + "</font>";
			buttons = "<div class='fluid ui vertical animated button" + canBBuy + "' onClick='buyG(" + i + ");' tabindex='0'><div class='hidden content'>" + cost + "</div><div class='visible content'>" + texts.weapons[3] + "</div></div>";
		}

		var weaponsDIV = $(
			"<tr class='" + bought + equipment + " ui center aligned' id='weap" + i + "'>" +
			"<td class='center aligned ui'>" + name + "</td>" +
			"<td class='center aligned'>" + cost + "</td>" +
			"<td class='ui center aligned'>" + damage + "</td>" +
			"<td class='ui center aligned'>" + buttons + "</td>" +
			"</tr>"
		);
		if (i < 13) { $('#Wtab1').append(weaponsDIV); }
		if (i > 12) { if (i < 28) { $('#Wtab2').append(weaponsDIV); } }
		if (i > 27) { if (i < 37) { $('#Wtab3').append(weaponsDIV); } }
		if (i > 36) { if (i < 48) { $('#Wtab4').append(weaponsDIV); } }
		if (i > 47) { if (i < 58) { $('#Wtab5').append(weaponsDIV); } }
		if (i > 57) { if (i < 63) { $('#Wtab6').append(weaponsDIV); } }
		if (i > 62) { if (i < 70) { $('#Wtab7').append(weaponsDIV); } }
		if (i > 69) { if (i < 81) { $('#Wtab8').append(weaponsDIV); } }
		if (i > 80) { if (i < 82) { $('#Wtab9').append(weaponsDIV); } }
	}
}

//GENERATE VEHICLES TAB

function VehicleList() {
	for (var id = 1; id < 17; id++) { $('#Vtab' + id).html("<thead><tr class='shadow'><th class='ui center aligned'>Vehicle</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Bonus</th><th class='ui center aligned'>Action</th></tr></thead>"); }

	for (var i in vehicules) {
		var vehicle = vehicules[i];
		canBuy = vehicle.price > p.points ? ' basic red' : '';
		type = "";
		if (vehicle.type == 0) { type = " for the damage multiplier"; }
		if (vehicle.type == 1) { type = " for the cash multiplier"; }

		if (p.vehicules[i] > 0) {
			bought = "style='display:none;'";
			bought2 = "azn";
			name = "<font class='text type2'>";
			cost = "<font class='jaune'>Owned</font>";
			multiplier = "+<font class='jaune'>" + fix(vehicle.value, 1) + "</font>";
		} else {
			bought = "";
			bought2 = "";
			color = vehicle.price > p.points ? ' rouge bold' : ' jaune bold';
			name = "<font class='text type2'>";
			cost = "<font class='" + color + "'>" + fix(vehicle.price, 3) + " CP</font>";
			multiplier = "+" + fix(vehicle.value, 1);
		}

		var vehiclesDIV = $(
			"<tr class='" + bought2 + "'>" +
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
		if (i > 142) { if (i < 182) { $('#Vtab5').append(vehiclesDIV); } }
		if (i > 181) { if (i < 220) { $('#Vtab6').append(vehiclesDIV); } }
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
		if (succes.type == 2) { if (p.missions[succes.value2] >= 100) { p.succes[i] = 1; } else { p.succes[i] = 0; } }
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
	if (p.tutorial == 0) { $("#tuto-prev").addClass("disabled"); } else {
		$("#tuto-prev").removeClass("disabled");
	}
	if (p.tutorial == 6) { $("#tuto-next").addClass("disabled"); } else {
		$("#tuto-next").removeClass("disabled");
	}
}

function closeTutorial() {
	hideMenus();
	p.tutorial = 0;
}

function NextTuto() {
	if (p.tutorial < 6) { p.tutorial++; showTutorial(p.tutorial); }
}

function PrevTuto() {
	if (p.tutorial >= 1) { p.tutorial--; showTutorial(p.tutorial); }
}

function showTutorialDIV() {
	p.fl = 0;
	$("#menu-4").modal('show');
	showTutorial(0);
}