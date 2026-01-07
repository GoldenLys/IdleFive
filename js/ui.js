function UpdateUI() {
	let ClicCashText = fix(p.Weapon.Power * (GetWeaponMult(p.Weapon.Id) + ((p.prestige.bonus + p.prestige.multipliers[1]) * 0.1) - 0.1), 1);
	let CashPSText = fix(CASHPS, 2);
	let PrestigeMultText = fix(p.prestige.bonus, 9);
	let CashText = fix(p.cash, 2);
	let prestigeText = "";
	let WeaponsNBR = 0;
	let AllWeaponsNBR = 0;
	for (var i in weapons) { AllWeaponsNBR += 1; WeaponsNBR += p.WeaponBought[i]; }
	if (p.rank < 400) { PrestigePoints = 0; } else { PrestigePoints = Math.trunc(p.rank / 200); }
	if (p.prestige.price[0] <= p.rank) { if (p.prestige.price[1] <= p.cash) { prestigeText = texts.infos[0]; } }
	//LEFT INFOS
	$('#imagecash').attr('style', "background-image:url('" + weapons[p.Weapon.Id].img +"');");
	$("#cash").html("<i class='money'></i><font class='vert bold'>" + CashText + "</font> <div class='sub header blanc'>" + CashPSText + "/s</div>");
	$("#level").html(getRank(p.rank));
	$("#weapon").html(weapons[p.Weapon.Id].name + " " + GenStarLabel(p.Stars[p.Weapon.Id]));
	$("#weapon").attr("class", p.Weapon.Class);
	$("#damage").attr("class", p.Weapon.Class);
	$("#damage").html("<i class='ui red fa-thin fa-crosshairs-simple'></i>" + ClicCashText);
	$("#points").html("<font class='jaune'> " + fix(p.points, 2) + " CP</font>");
	$("#messages").html(prestigeText);
	//CHARACTER
	$("#prestigecount").html(p.prestige.level);
	$("#prestigepricecount").html(getRank(p.prestige.price[0]));
	$("#prestigepricecount2").html("<i class='fa-regular fa-dollar-sign'></i>" + fix(p.prestige.price[1], 2));
	$("#character-text4").html(texts.character[5] + "<font class='jaune'> " + PrestigePoints + " </font> " + texts.character[6]);
	$("#character-text5").html(texts.character[7] + "<font class='jaune'> " + PrestigeMultText + "</font> " + texts.character[8]);
	//CASH - STATS
	$("#cashcount").html("<i class='fa-regular fa-dollar-sign'></i><font class='desc vert'>" + CashText + "</font> " + texts.stats[6]);
	$("#cashpscount").html("<i class='fa-regular fa-dollar-sign'></i><font class='desc vert'>" + CashPSText + "</font> " + texts.stats[7]);
	$("#addcashcount").html("<i class='fa-regular fa-dollar-sign'></i><font class='desc vert'>" + ClicCashText + "</font> " + texts.stats[8]);
	//VEHICLES - STATS
	$("#boughtvehicles1").html("Strength (damage) multiplier <font class='bold jaune'>" + p.prestige.multipliers[0] + "</font>/1000");
	$("#boughtvehicles2").html("Stamina (cash) multiplier <font class='bold jaune'>" + p.prestige.multipliers[1] + "</font>/1000");
	$("#boughtvehicles3").html("Stealth (rewards) multiplier <font class='bold jaune'>" + p.prestige.multipliers[2] + "</font>/1000");
	//WEAPONS - STATS
	$("#weapons-bought").html(WeaponsNBR + "/" + AllWeaponsNBR + " weapons acquired.");
	for (var TYPE = 1; TYPE < 8; TYPE++) {
		$("#weaponsT" + TYPE).html(p.WeaponType[TYPE] + " " + texts.weapontype[TYPE] + " acquired.");
	}
	//MULTIPLIERS - STATS
	$("#stealthmult").html("Stealth multiplier at <font class='jaune bold'>" + fix(p.prestige.bonus + p.prestige.multipliers[2] * 0.1, 9) + "</font>");
	$("#damagemult").html("Damage multiplier at <font class='jaune bold'>" + fix((p.prestige.bonus + (p.prestige.multipliers[0] * 0.1)), 9) + "</font>");
	$("#cashmult").html("Cash multiplier at <font class='jaune bold'>" + fix((p.prestige.bonus + (p.prestige.multipliers[1] * 0.1)), 9) + "</font>");
	$("#prestigemult").html("Prestige multiplier at <font class='jaune bold'>" + fix(p.prestige.bonus, 9) + "</font>");
	//OTHERS - STATS
	$("#ObjectivesCompleted").html(p.CompletedQuests + " Objectives completed.");
	$("#totalclicks").html("Clicked " + fix(p.TotalClicks, 3) + " times.");
	$("#pointsspent").html(p.spentpoints + " points spent.");
	$("#spcount").html("Character number <font class='jaune'>" + p.prestige.level + "</font>.");
	$("#time").html(texts.stats[10] + " " + p.DateStarted + "<br />" + texts.stats[11] + " <font class='jaune'>" + toHHMMSS(p.playTime) + "</font>");
	//OBJECTIVES
	$("#objective").html(GetQuestTitle());
	$("#quest_rewards").html("<font class='jaune'>" + fix(p.quest.reward + p.quest.reward * (p.prestige.multipliers[2] * 0.1), "dynamic") + " CP</font>");

	if (p.points >= 0.5) $("#ChangeObjective").attr("class", "fluid ui inverted green dollar button");
	else $("#ChangeObjective").attr("class", "fluid ui inverted basic red button");

	if ($('#tab1').is(":visible")) UpdateWeapons();
	if ($('#tab2').is(":visible")) UpdateMissions();
	if ($('#tab3').is(":visible")) VehicleList();
	SuccessList();
	SuccessCount();
	redrawTables();
}

function UpdateTexts() {
	//MENU
	$("#t0").html("<i class='sidebar icon'></i>" + texts.menu[0]);
	$("#t1").html("<i class='fa-thin fa-crosshairs-simple icon'></i>" + texts.menu[1]);
	$("#t2").html("<i class='dollar sign icon'></i>" + texts.menu[2]);
	$("#t3").html("<i class='user icon'></i>" + texts.menu[3]);
	$("#t4").html("<i class='clipboard icon'></i>" + texts.menu[4]);
	//PRESTIGE TEXTS
	$("#character-number").html(texts.character[1]);
	$("#character-text1").html(texts.character[2]);
	$("#character-text2").html(texts.character[3]);
	$("#character-text3").html(texts.character[4]);
	$("#btnPrestige").val(texts.character[0]);
	//WEAPONS TYPES BUTTONS
	for (var weapon = 1; weapon < 9; weapon++) { $("#W" + weapon).html(texts.weapontype[weapon] + " (" + p.WeaponType[weapon] + "/" + countWeaponsByType()[weapon] + ")"); }
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

//MISSIONS TABLE
function MissionList() {
	$('#missions').html("<thead><tr><th class='ui center aligned'>Mission</th><th class='ui center aligned'>Level</th><th class='ui center aligned'>Value</th><th class='ui center aligned'>Produce</th><th class='ui center aligned'>Manage</th></tr></thead>");
	$('#missions').append("<tbody />");
	for (var i in missions) {
		let CONTENT = $(`
			<tr id='mission-${i}'><td class='single line ui center aligned type2'>${missions[i].name}</td>
			<td id='mission-${i}-level' class='single line ui center aligned'>0</td>
			<td id='mission-${i}-value' class='single line ui center aligned'>0</td>
			<td id='mission-${i}-cost' class='ui center aligned'>0</td>
			<td class='ui center aligned'>
			<div class='ui buttons'>
			<button id='mission-${i}-btnB1' class='ui green dollar button' onClick='BuyM(${i}, 1);'>Buy 1</button>
			<button id='mission-${i}-btnB10' class='ui green dollar button' onClick='BuyM(${i}, 10);'>10</button>"+
			<button id='mission-${i}-btnB100' class='ui green dollar button' onClick='BuyM(${i}, 100);'>100</button>
			</div><br />
			<div class='ui buttons'>
			<button id='mission-${i}-btnS1' class='ui negative button' onClick='SellM(${i}, 1);'>Sell 1</button>
			<button id='mission-${i}-btnS10' class='ui negative button' onClick='SellM(${i}, 10);'>10</button>
			<button id='mission-${i}-btnS100' class='ui negative button' onClick='SellM(${i}, 100);'>100</button>
			</div>
			</td></tr>`);
		$('#missions tbody').append(CONTENT);
		if (p.rank >= missions[i].level) $("#mission-" + i).show(); else $("#mission-" + i).hide();
	}
	$("#tab2").append(`<div id='NextMissionUnlock' class='ui black message'>Next mission unlocks at rank 0</div>`);
	if (getLatestUnlockedMissionId("latest") === "allUnlocked") $("#NextMissionUnlock").hide(); else $("#NextMissionUnlock").show();
}

function UpdateMissions() {
	for (var i in missions) {
		$("#mission-" + i).attr("class", p.missions[i] < 1 ? '' : 'item-active');
		$("#mission-" + i + "-level").html(p.missions[i]);
		$("#mission-" + i + "-value").html("<i class='fa-regular fa-dollar-sign'></i>" + fix(GetMissionPrice(i, 1), 1));
		$("#mission-" + i + "-cost").attr("class", "ui center aligned" + p.missions[i] < 1 ? '' : 'bold');
		$("#mission-" + i + "-cost").html("<i class='fa-regular fa-dollar-sign'></i>" + fix((missions[i].value * p.missions[i]) * (p.prestige.bonus + (p.prestige.multipliers[0] * 0.1)), 1) + texts.missions[5]);
		$("#mission-" + i + "-btnB1").attr("class", "ui green dollar button" + (GetMissionPrice(i, 1) > p.cash ? ' disabled' : ''));
		$("#mission-" + i + "-btnB10").attr("class", "ui green dollar button" + (GetMissionPrice(i, 10) > p.cash ? ' disabled' : ''));
		$("#mission-" + i + "-btnB100").attr("class", "ui green dollar button" + (GetMissionPrice(i, 100) > p.cash ? ' disabled' : ''));
		$("#mission-" + i + "-btnS1").attr("class", "ui red button " + (p.missions[i] < 1 ? 'disabled' : ''));
		$("#mission-" + i + "-btnS10").attr("class", "ui red button " + (p.missions[i] < 10 ? 'disabled' : ''));
		$("#mission-" + i + "-btnS100").attr("class", "ui red button " + (p.missions[i] < 100 ? 'disabled' : ''));
		if (getLatestUnlockedMissionId("latest") === "allUnlocked") {
			$("#NextMissionUnlock").hide();
		}
		else {
			$("#NextMissionUnlock").html(`Next mission unlocks at rank ${missions[getLatestUnlockedMissionId("next")].level}`);
			$("#NextMissionUnlock").show();
		}
		if (p.rank >= missions[i].level) $("#mission-" + i).show();
		redrawTables();
	}
}

//WEAPONS TABLE
function WeaponList() {
	for (var id = 1; id < 8; id++) {
		$('#Wtab' + id).html("<thead><tr><th class='ui center aligned'>" + texts.weapons[0] +
			"</th><th class='ui center aligned'>" + texts.weapons[1] + "</th><th class='ui center aligned'>" + texts.weapons[7] + "</th></tr></thead>");
	}

	for (var i in weapons) {
		let CONTENT = $(
			"<tr id='weapon-" + i + "' class='ui center aligned'>" +
			"<td id='weapon-" + i + "-name' class='ui center aligned type2'>" + GenStarLabel(p.Stars[i]) + "<font class='" + getQuality(p.Stars[i]) + "'>" + weapons[i].name + "</font></td>" +
			"<td id='weapon-" + i + "-price' class='ui center aligned'>0" + "</td>" +
			"<td class='ui center aligned'><div class='fluid ui vertical buttons'><div id='weapon-" + i + "-purchase' class='fluid ui button' onClick='buyG(" + i + ");'><div class='hidden content'>" + "</div><div class='visible content'>" + texts.weapons[4] + "</div></div>" +
			"<button id='weapon-" + i + "-equip' class='fluid ui button' onClick='useW(" + i + ");'></button></div></td>" +
			"</tr>"
		);
		$('#Wtab' + weapons[i].type).append(CONTENT);
	}
}

function UpdateWeapons() {
	for (var i in weapons) {
		let ENABLED = p.WeaponBought[i] < 1 ? '' : 'item-active';
		let CANBUY = weapons[i].price * 1 > p.cash ? 'rouge' : 'blanc';
		if (p.WeaponBought[i] > 0) { weapons[i].price * 1.25 > p.cash ? 'rouge' : 'blanc'; }
		let COST = p.WeaponBought[i] < 1 ? fix(weapons[i].price, 1) : fix(weapons[i].price * 1.25, 1);
		let PURCHASED = p.WeaponBought[i] > 0 ? 'blanc' : 'rouge';
		let PURCHASED_TEXT = p.WeaponBought[i] > 0 ? "" : `<font class="${PURCHASED}"><i class="fa-solid fa-lock-keyhole"></i></font>`;
		let ENABLE_BTN = weapons[i].price > p.cash ? 'basic red' : 'green dollar';
		let PURCHASE_TEXT = p.WeaponBought[i] > 0 ? "<div class='hidden content'><i class='fa-regular fa-dollar-sign'></i>" + COST + "</div><div class='visible content'>Roll stats</div>" : "Purchase";
		let PURCHASE_BTN = p.WeaponBought[i] > 0 ? "fluid ui vertical animated button" : "fluid ui button";
		let EQUIP_BTN = p.WeaponBought[i] < 1 ? " disabled" : "";
		let EQUIP_TEXT = "Equip";
		if (ENABLED === 'item-active' && p.Weapon.Id == i) { ENABLED = 'item-equipped'; EQUIP_BTN = " inverted basic"; EQUIP_TEXT = "Equipped"; }
		if (p.Stars[i] === 10 && p.WeaponBought[i] > 0) { PURCHASE_TEXT = "Maxed"; PURCHASE_BTN = "fluid ui button disabled"; ENABLE_BTN = "basic green dollar"; }
		$("#weapon-" + i).attr("class", "ui center aligned " + ENABLED);
		$("#weapon-" + i + "-name").html(`${PURCHASED_TEXT}${GenStarLabel(p.Stars[i])} <font class="${getQuality(p.Stars[i])}">${weapons[i].name}</font> </br><i class="fa-thin fa-crosshairs-simple rouge"></i> ${fix(weapons[i].power * (GetWeaponMult(i) + ((p.prestige.bonus + p.prestige.multipliers[1]) * 0.1) - 0.1), 1)}`);
		$("#weapon-" + i + "-price").attr("class", "ui center aligned " + CANBUY);
		$("#weapon-" + i + "-price").html("<i class='fa-regular fa-dollar-sign'></i>" + COST);
		$("#weapon-" + i + "-purchase").html(PURCHASE_TEXT);
		$("#weapon-" + i + "-purchase").attr("class", PURCHASE_BTN + " " + ENABLE_BTN);
		$("#weapon-" + i + "-equip").html(EQUIP_TEXT);
		$("#weapon-" + i + "-equip").attr("class", "fluid ui button" + EQUIP_BTN);
		redrawTables();
	}
}

//CHARACTER SKILLS TABLE
function VehicleList() {
	$('#Vtab').html("<thead><tr><th class='ui center aligned'>Skill</th><th class='ui center aligned'>Level</th><th class='ui center aligned'>Price</th><th class='ui center aligned'>Bonus</th><th class='ui center aligned'>Action</th></tr></thead>");

	for (var i in vehicules) {
		let vehicle = vehicules[i];
		let PRICE = GetMultPrice(i);
		let canBuy = PRICE > p.points ? ' basic red' : ' green dollar';
		let BUTTON = "<button class='fluid ui button" + canBuy + "' onClick='buyV(" + i + ");'>Upgrade</button>";
		let type = "";
		let level = 0;
		let name = "<font class='text type2'>";
		let multiplier = "<font class='jaune'>" + fix((p.prestige.bonus + (p.prestige.multipliers[i] * vehicle.value)), 9) + "</font>";
		let color = vehicle.price > p.points ? ' rouge bold' : ' jaune bold';
		let cost = "<font class='" + color + "'>" + fix(PRICE, 3) + " CP</font>";
		if (vehicle.type == 0) { type = " cash (+10% per level)"; }
		if (vehicle.type == 1) { type = " damage (+10% per level)"; }
		if (vehicle.type == 2) { type = " objective reward (+10% per level)"; }

		if (p.prestige.multipliers[i] > 0) level = fix(p.prestige.multipliers[i], 0);

		if (p.prestige.multipliers[i] >= 1000) BUTTON = "<button class='fluid ui button basic red'>Maxed</button>";

		var vehiclesDIV = $(
			"<tr>" +
			"<td class='center aligned ui'>" + name + vehicle.name + "</font></td>" +
			"<td class='center aligned ui'>" + level + "</font></td>" +
			"<td class='center aligned'>" + cost + "</td>" +
			"<td class='center aligned'>" + multiplier + "</font> " + type + "</td>" +
			"<td class='center aligned'>" + BUTTON + "</td>" +
			"</tr>"
		);
		$('#Vtab').append(vehiclesDIV);
	}
}

//UI FUNCTIONS

function hideVTabs() { for (var id = 1; id < 17; id++) { $("#Vtab" + id).hide(); $("#V" + id).removeClass("active"); } }
function btnPrestigeD() { $("#btnPrestige").addClass("disabled").addClass("inverted"); }
function btnPrestigeE() { $("#btnPrestige").removeClass("disabled").removeClass("inverted"); }
function hideTabs() { for (var id = 1; id < 5; id++) { $("#tab" + id).hide(); $("#t" + id).removeClass("inverted basic"); } }
function hideMenus() { for (var id = 1; id < 6; id++) { $('#modal-' + id).modal('hide'); } }
function hideWTabs() { for (var id = 0; id < 10; id++) { $('#Wtab' + id).hide(); $("#W" + id).attr('class', 'ui green dollar button inverted'); } }
function hideSTabs() { for (var id = 0; id < 10; id++) { $('#Stab' + id).hide(); $("#S" + id).removeClass('active'); } }

function ClickEvents() {
	$("#game-menu").on("click", "a", function () {
		var id = $(this).data('id'); hideTabs();
		$("#tab" + id).show();
		$("#t" + id).addClass("green dollar basic");
		UpdateUI();
	});
	$("#sidebar").on("click", "a", function () {
		var id = $(this).data('id');
		$('#modal-' + id).modal('show');
		$('.ui.sidebar').sidebar('toggle');
		UpdateUI();
	});
	$('#select').dropdown();
	$('.ui.dropdown').dropdown();
	$("#weap-select").on("click", "div", function () {
		var id = $(this).data('id');
		hideWTabs();
		$('#Wtab' + id).show();
		$("#W" + id).removeClass("inverted");
	});
	$("#ChangeObjective").on("click", function () {
		if (p.points >= 0.5) {
			p.points -= 0.5;
			NewObjective();
		}
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
	$('#colonne-m').on('click', '#close', function () {
		$(this).closest('#objective').transition('fade');
	});
	$("#closeMSG").on("click", function () {
		hideMenus();
	});
	$("#imagecontainer").on("click", function () { ClickWeapon(); });
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
		if (succes.type == 4) { if (p.rank >= succes.value) { p.succes[i] = 1; } }
		if (succes.type == 5) { if (p.prestige.level >= succes.value) { p.succes[i] = 1; } else { p.succes[i] = 0; } }
	}
	$("#successcount").html("<font class='SuccessText'>" + succeslevel + "</font>/59 " + texts.success[0]);
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
		if (succes.type === 0) { $('#Stab0').append(succesDIV); }
		if (succes.type === 1) { $('#Stab1').append(succesDIV); }
		if (succes.type === 2) { $('#Stab2').append(succesDIV); }
		if (succes.type === 3) { $('#Stab3').append(succesDIV); }
		if (succes.type === 4) { $('#Stab0').append(succesDIV); }
		if (succes.type === 5) { $('#Stab0').append(succesDIV); }
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
	$("#modal-4").modal('show');
	showTutorial(0);
}

function MESSAGE(title, message) {
	$("#message-title").html(title);
	$("#message-text").html(message);
	$("#modal-1").modal("setting", "closable", false).modal("show");
}

function GetMultPrice(id) {
	if (p.prestige.multipliers[id] == null) p.prestige.multipliers[id] = 0;
	var price = 1;
	if (p.prestige.multipliers[id] >= 10) price = 1.25;
	if (p.prestige.multipliers[id] >= 20) price = 1.5;
	if (p.prestige.multipliers[id] >= 30) price = 2;
	if (p.prestige.multipliers[id] >= 40) price = 2.5;
	if (p.prestige.multipliers[id] >= 50) price = 4;
	if (p.prestige.multipliers[id] >= 60) price = 5;
	if (p.prestige.multipliers[id] >= 70) price = 5.5;
	if (p.prestige.multipliers[id] >= 80) price = 6;
	if (p.prestige.multipliers[id] >= 90) price = 6.5;
	if (p.prestige.multipliers[id] >= 100) price = 7;
	if (p.prestige.multipliers[id] >= 200) price = 8;
	if (p.prestige.multipliers[id] >= 300) price = 9;
	if (p.prestige.multipliers[id] >= 400) price = 10;
	if (p.prestige.multipliers[id] >= 500) price = 11;
	if (p.prestige.multipliers[id] >= 600) price = 12;
	if (p.prestige.multipliers[id] >= 700) price = 13;
	if (p.prestige.multipliers[id] >= 800) price = 14;
	if (p.prestige.multipliers[id] >= 900) price = 15;
	if (id == 0 && p.prestige.multipliers[id] >= 1000) price = 999999999;
	if (id == 1 && p.prestige.multipliers[id] >= 1000) price = 999999999;
	if (id == 2 && p.prestige.multipliers[id] >= 1000) price = 999999999
	return price;
}

function getLatestUnlockedMissionId(type) {
	if (type === undefined) type = "latest";
	let latestId = -1;
	let nextId = -1;

	for (let i in missions) {
		let id = parseInt(i);
		if (p.rank >= missions[id].level) {
			latestId = id;
		} else {
			nextId = id;
			break; // stop at the first mission not unlocked
		}
	}

	const maxId = Math.max(...Object.keys(missions).map(Number));

	if (type === "latest") {
		if (latestId === maxId) {
			return "allUnlocked";
		}
		return latestId;
	} else if (type === "next") {
		if (latestId === maxId) {
			return "none"; // or "allUnlocked" if you prefer
		}
		return nextId;
	}
}

function countWeaponsByType() {
  const typeCounts = {};

  for (const weapon of Object.values(weapons)) {
    if (!typeCounts[weapon.type]) {
      typeCounts[weapon.type] = 0;
    }
    typeCounts[weapon.type]++;
  }

  return typeCounts;
}

function rebuildDropdown(id) {
    const $dropdown = $('#' + id);
    $dropdown.dropdown('destroy');
    $dropdown.find('.menu').empty();
    $dropdown.find('option').each(function () {
        const value = $(this).attr('value');
        const text = $(this).text();
        const $item = $('<div>').addClass('item').attr('data-value', value).text(text);
        $dropdown.find('.menu').append($item);
    });
    $dropdown.dropdown();
}

function redrawTables() {
    $("table").each(function () {
        const parent = this.parentNode;
        const next = this.nextSibling;
        parent.removeChild(this);
        parent.insertBefore(this, next);
    });
}