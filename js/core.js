var version = "v2.8.2";
var a1 = 0;
var texts = textsENG;
var p = {
	DateStarted: getDate(),
	fl: 1,
	rank: 0,
	cash: 0,
	cashps: 0,
	bonuscash: 1,
	VehMult: 0,
	prestige: 1,
	quality: 0,
	prestigeprice: 400,
	prestigeprice2: 10000000,
	productions: [],
	succes: [],
	WeaponID: 0,
	GunMult: 1,
	GunPower: "<font class='normal'>",
	Arme: "Fist",
	ArmePower: 0.1,
	Rarity: "Normal",
	GBought: [],
	VBought: [],
	vehicules: [],
	points: 0,
	bonuspoints: 0,
	playTime: 0,
	tutorial: 0,
	lang: "English",
};


$(document).ready(function () {
	if (localStorage.getItem("IdleFive") != null) { load(); }
	setInterval(idleFiveLoop(), 1000);
	setInterval(checkalerts(1, 30), 60000);
	setInterval(clearalerts(), 10000);
	console.log(p.lang);
	save();
	$("#alert").html("<p class='game-text'>" + texts.infos[3] + "</p>");
});


function idleFiveLoop() {
	if (p.cash !== p.cash) { p.cash = 0; }
	p.playTime++;
	for (var mission = 0; mission < 14; mission++) { if (p.productions[mission] == null) { p.productions[mission] = 0; } }
	for (var gun = 0; gun < 37; gun++) { if (p.GBought[gun] == null) { p.GBought[gun] = 0; } }
	for (var vehicle = 0; vehicle < 182; vehicle++) { if (p.VBought[vehicle] == null) { p.VBought[vehicle] = 0; } }
	if (p.rank >= p.prestigeprice) { if (p.cash >= p.prestigeprice2) { btnPrestigeE(); } else { btnPrestigeD(); } }
	p.cash = Math.round(p.cash * 100) / 100; //FIX A JS BUG that can make the cash var at 15.9999999999 for example
	var rank = 0;
	for (var id = 0; id < 12; id++) { if (p.productions[id] == null) { p.productions[id] = 0; } rank += p.productions[id]; }
	p.rank = rank;
	if (p.fl == 1) { p.fl = 0; showTutorialDIV(); }
	getPrestigePrice();
	getCashPS();
	UpdateUI();
	save();
}

function getCashPS() {
	p.cashps = 0;
	for (var id = 0; id < 14; id++) {
		if (p.productions[id] > 0) {
			p.cashps += productions[id].value * p.productions[id];
			p.cash += p.cashps * (p.bonuscash + p.VehMult);
		}
	}
}

function ClickWeapon() {
	p.cash += (p.ArmePower * p.GunMult) * (p.bonuscash + p.bonuspoints + p.VehMult);
	UpdateUI();
}

function AddPrestige() {
	if (p.rank >= p.prestigeprice) {
		if (p.cash >= p.prestigeprice2) {
			var r = confirm("Would you like to reset your character to get some bonuses ?");
			if (r == true) {
				p.points = Math.trunc(p.rank / 400);
				p.ArmePower = 0.1;
				p.WeaponID = 0;
				p.GunMult = 1;
				p.GunPower = "<font class='normal'>";
				p.Arme = "Fist";
				p.Rarity = "Normal";
				p.GBought = [];
				p.rank = 0;
				p.cash = 0;
				p.cashps = 0;
				p.productions = [];
				p.prestige++;
				UpdateUI();
				hideMenus();
			}
		}
	}
}

function ForcePrestige() {
	p.rank = p.prestigeprice;
	p.cash = p.prestigeprice2;
}

function getPrestigePrice() {
	p.prestigeprice = p.prestige * 100 + 300;
	p.bonuscash = 1;
	if (p.prestige > 1) p.bonuscash = 1 + (p.prestige * 0.15);
	p.prestigeprice2 = (p.prestige * 1e7) * p.prestige;
	if (p.prestige == 0) {
		p.prestigeprice = 400;
		p.prestigeprice2 = 10000000;
	}
}

function sauvegardeauto() {
	save();
}
setTimeout(sauvegardeauto, 600000);


function getRank(rankNBR) {
	var rankText = "";
	if (rankNBR == 0) { rankText = "Bronze"; }
	if (rankNBR >= 1) { rankText = "Bronze"; }
	if (rankNBR >= 5) { rankText = "Bronze"; }
	if (rankNBR >= 15) { rankText = "Bronze"; }
	if (rankNBR >= 30) { rankText = "Bronze"; }
	if (rankNBR >= 50) { rankText = "Bronze"; }
	if (rankNBR >= 100) { rankText = "Silver"; }
	if (rankNBR >= 200) { rankText = "Silver"; }
	if (rankNBR >= 300) { rankText = "Silver"; }
	if (rankNBR >= 400) { rankText = "Silver"; }
	if (rankNBR >= 500) { rankText = "Silver"; }
	if (rankNBR >= 600) { rankText = "Silver"; }
	if (rankNBR >= 700) { rankText = "Gold"; }
	if (rankNBR >= 800) { rankText = "Gold"; }
	if (rankNBR >= 900) { rankText = "Gold"; }
	if (rankNBR >= 1000) { rankText = "Gold"; }
	if (rankNBR >= 1100) { rankText = "Gold"; }
	if (rankNBR >= 1200) { rankText = "Gold"; }
	if (rankNBR >= 1300) { rankText = "Platinum"; }
	if (rankNBR >= 2600) { rankText = "Platinum"; }
	if (rankNBR >= 3900) { rankText = "Platinum"; }
	if (rankNBR >= 5200) { rankText = "Platinum"; }
	if (rankNBR >= 6500) { rankText = "Platinum"; }
	if (rankNBR >= 7800) { rankText = "Platinum"; }
	if (rankNBR >= 9100) { rankText = "Platinum"; }
	if (rankNBR >= 10400) { rankText = "Platinum"; }
	if (rankNBR >= 11700) { rankText = "Platinum"; }
	if (rankNBR >= 13000) { rankText = "Platinum"; }
	result2 = "<font class='" + rankText + "'> " + rankNBR + "</font>";
	return result2;
}

function checkalerts(num, num2) {
	chance = random(num, num2);
	if (p.cash > 100) {
		if (chance >= 28) {
			tax = random(100, (p.cash / 100) * 50);
			p.cash -= tax;
			$("#alert").html("<p class='game-text rougeb'>" + texts.infos[5] + " <font class='money'></font>" + fix(tax, 3) + " " + texts.infos[6]);
		} else {
			$("#alert").html("<p class='game-text'>" + texts.infos[3] + "</p>");
		}
	}
}

function clearalerts() {
	$("#alert").html("<p class='game-text'>" + texts.infos[3] + "</p>");
}

var buyV = function (id) {
	if (vehicules[id].price <= p.points) {
		if (p.vehicules[id] == null) {
			p.vehicules[id] = 1; p.points -= vehicules[id].price;
		} else { if (p.vehicules[id] != 1) p.vehicules[id] = 1; p.points -= vehicules[id].price; }
		if (id < 7) { p.VBought[0]++; }
		if (id > 6) { if (id < 53) { p.VBought[1]++; } }
		if (id > 52) { if (id < 87) { p.VBought[2]++; } }
		if (id > 86) { if (id < 143) { p.VBought[3]++; } }
		if (id > 142) { if (id < 183) { p.VBought[4]++; } }
		if (vehicules[id].type == 0) { p.bonuspoints += vehicules[id].value; }
		if (vehicules[id].type == 1) { p.VehMult += vehicules[id].value; }
	}
	UpdateUI();
};

function genGun(id) {
	quality = random(1, 500);
	if (quality >= 1) { setRarity("Very used", "gris", 0.25); }
	if (quality >= 50) { setRarity("Used", "gris", 0.5); }
	if (quality >= 150) { setRarity("Normal", "normal", 1); }
	if (quality >= 250) { setRarity("Good condition", "rare", 1.25); }
	if (quality >= 320) { setRarity("Very good state", "or", 1.5); }
	if (quality >= 420) { setRarity("Factory new", "rougeb", 1.75); }
	if (quality >= 495) { setRarity("Military grade", "mythic", 2); }
}

function genGun2(id) {
	quality = random(1, 200);
	if (quality >= 1) { setRarity("Normal", "normal", 1); }
	if (quality >= 80) { setRarity("Good condition", "rare", 1.25); }
	if (quality >= 150) { setRarity("Very good state", "or", 1.5); }
	if (quality >= 180) { setRarity("Factory new", "rougeb", 1.75); }
	if (quality >= 195) { setRarity("Military grade", "mythic", 2); }
	if (quality >= 200) { setRarity("Special forces", "tactical", 3); }
}

function setRarity(Type, Class, Mult) {
	p.Rarity = Type;
	p.GunPower = "<font class='" + Class + "'>";
	p.GunMult = Mult;
}

function useW(id) {
	var weapon = weapons[id];
	if (p.GBought[id] == 1) {
		if (p.WeaponID != id) {
			p.Rarity = "Normal";
			p.GunPower = "<font class='normal'>";
			p.GunMult = 1;
			p.Arme = weapon.name;
			p.WeaponID = id;
			p.ArmePower = weapon.power;
		}
	}
	UpdateUI();
}

function buyG(id) {
	var arme = weapons[id].name;
	var damage = weapons[id].power;
	var pricebuy = weapons[id].price;
	if (p.GBought[id] == 0) {
		if (p.cash >= pricebuy) {
			p.cash -= pricebuy;
			p.Arme = arme;
			p.ArmePower = damage;
			p.WeaponID = id;
			p.GBought[id] = 1;
			genGun(id);
		}
	} else {
		if (p.cash >= pricebuy * 2) {
			p.cash -= pricebuy * 2;
			p.Arme = arme;
			p.WeaponID = id;
			p.ArmePower = damage;
			genGun2(id);
		}
	}
	UpdateUI();
}

function BuyM(id, qty) {
	var price = GetMissionPrice(id, qty);
	if (price <= p.cash) {
		p.cash -= price;
		if (p.productions[id] == null) {
			p.productions[id] = qty;
			p.rank += qty;
		} else {
			p.productions[id] += qty;
			p.rank += qty;
		}
		UpdateUI();
	}
}

function SellM(id, qty) {
	var price = GetMissionPrice(id, qty) / 8;
	if (p.productions[id] == null) p.productions[id] = 0;
	p.cash += price;
	if (p.productions[id] >= qty) {
		p.productions[id] -= qty;
		p.rank -= qty;
	} else {
		p.productions[id] = null;
	}
	UpdateUI();
}

var GetMissionPrice = function (id, qty) {
	var owned = 0;
	if (p.productions[id] != null) owned = p.productions[id];
	var price = (qty * productions[id].price) * Math.pow(productions[id].pricemodifier, owned);
	return price;
};
