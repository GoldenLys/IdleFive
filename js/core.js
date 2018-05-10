var version = "v2.4";
var a1 = 0;
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
	productions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	succes: [],
	WeaponID: 0,
	GunMult: 1,
	GunPower: "<font class='gris'>",
	Arme: "Fist",
	ArmePower: 0.1,
	Rarity: "Normal",
	GBought: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	VBought: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	vehicules: [],
	points: 0,
	bonuspoints: 0,
	playTime: 0,
	tutorial:0,
};

$(document).ready(function () {
	if (localStorage.getItem("IdleFive") != null) {
		load();
	}
	setInterval(function () {
		if (p.cash !== p.cash) {
			p.cash = 0;
		}
		p.playTime++;
		updateprogression();
	}, 1000);
	setInterval(function () {
		checkalerts();
	}, 60000);
	setInterval(function () {
		clearalerts();
	}, 10000);
	save();
	document.title = "IdleFive";
	$("#alert").html("<p class='game-text'>Nothing to report at the moment.</font></p>");
});

function getCashPS() {
	p.cashps = 0;
	for (var id = 0; id < 13; id++) {
		if (p.productions[id] > 0) {
			p.cashps += productions[id].value * p.productions[id];
			p.cash += p.cashps * p.bonuscash + p.VehMult;
		}
	}
}

function ClickWeapon() {
	p.cash = p.cash + (p.ArmePower * p.GunMult) * (p.bonuscash + p.bonuspoints + p.VehMult);
	updateprogression();
}

function updateprogression() {
	if (p.rank >= p.prestigeprice) { if(p.cash>=p.prestigeprice2) { btnPrestigeE(); } else { btnPrestigeD(); } }
	p.cash = Math.round(p.cash * 100) / 100; //FIX A JS BUG that can make the cash var at 15.9999999999 for example
	getPrestigePrice();
	getCashPS();
	UpdateUI();
	if (p.fl == 1) { p.fl = 0; save(); showOptionsMenu(); }
	save();
}

function AddPrestige() {
	if (p.rank >= p.prestigeprice) {
		if (p.cash >= p.prestigeprice2) {
			var r = confirm("Would you like to sell all of your activities to get a permanent bonus ?");
			if (r == true) {
				p.ArmePower = 0.1;
				p.WeaponID = 0;
				p.GunMult = 1;
				p.GunPower = "<font class='blanc'>";
				p.Arme = "Fist";
				p.Rarity = "Normal";
				p.GBought = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				p.rank = 0;
				p.cash = 0;
				p.cashps = 0;
				p.productions = [];
				p.points = p.prestige;
				p.prestige++;
				getPrestigePrice();
				UpdateUI();
				updateprogression();
				location.reload();
			}
		}
	}
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
	if (rankNBR == 0) { rankText = "Bronze"; nbrStars = 1; }
	if (rankNBR >= 1) { rankText = "Bronze"; nbrStars = 2; }
	if (rankNBR >= 5) { rankText = "Bronze"; nbrStars = 3; }
	if (rankNBR >= 15) { rankText = "Bronze"; nbrStars = 4; }
	if (rankNBR >= 30) { rankText = "Bronze"; nbrStars = 5; }
	if (rankNBR >= 50) { rankText = "Bronze"; nbrStars = 6; }
	if (rankNBR >= 100) { rankText = "Silver"; nbrStars = 1; }
	if (rankNBR >= 200) { rankText = "Silver"; nbrStars = 2; }
	if (rankNBR >= 300) { rankText = "Silver"; nbrStars = 3; }
	if (rankNBR >= 400) { rankText = "Silver"; nbrStars = 4; }
	if (rankNBR >= 500) { rankText = "Silver"; nbrStars = 5; }
	if (rankNBR >= 600) { rankText = "Silver"; nbrStars = 6; }
	if (rankNBR >= 700) { rankText = "Gold"; nbrStars = 1; }
	if (rankNBR >= 800) { rankText = "Gold"; nbrStars = 2;  }
	if (rankNBR >= 900) { rankText = "Gold"; nbrStars = 3; }
	if (rankNBR >= 1000) { rankText = "Gold"; nbrStars = 4; }
	if (rankNBR >= 1100) { rankText = "Gold"; nbrStars = 5; }
	if (rankNBR >= 1200) { rankText = "Gold"; nbrStars = 6; }
	if (rankNBR >= 1300) { rankText = "Platinum"; nbrStars = 1; }
	if (rankNBR >= 2600) { rankText = "Platinum"; nbrStars = 2; }
	if (rankNBR >= 3900) { rankText = "Platinum"; nbrStars = 3; }
	if (rankNBR >= 5200) { rankText = "Platinum"; nbrStars = 4; }
	if (rankNBR >= 6500) { rankText = "Platinum"; nbrStars = 5; }
	if (rankNBR >= 7800) { rankText = "Platinum"; nbrStars = 6; }
	if (rankNBR >= 9100) { rankText = "Platinum"; nbrStars = 7; }
	if (rankNBR >= 10400) { rankText = "Platinum"; nbrStars = 8; }
	if (rankNBR >= 11700) { rankText = "Platinum"; nbrStars = 9; }
	if (rankNBR >= 13000) { rankText = "Platinum"; nbrStars = 10; }
	var stars = "";
	for (var id = 0; id < nbrStars; id++) { stars += " &#x2729;"; }
	result = "<font class='" + rankText + "'> " + rankText + stars + "</font>";
	return result;
}

function checkalerts() {
	chance = random(1, 30);
	if (p.cash > 100) {
		if (chance >= 28) {
			tax = random(100, (p.cash / 100) * 50);
			p.cash -= tax;
			$("#alert").html("<p class='game-text rouge'>A player killed you, he stole <font class='vert'>$" + fix(tax, 3) + " </font>from your pockets !");
		} else {
			$("#alert").html("<p class='game-text'>Nothing to report at the moment.</p>");
		}
	}
}

function clearalerts() {
	$("#alert").html("<p class='game-text'>Nothing to report at the moment.</p>");
}

var buyV = function (id) {
	if (vehicules[id].price <= p.points) {
		if (p.vehicules[id] == null) {
			p.vehicules[id] = 1; p.points -= vehicules[id].price;
		} else { if (p.vehicules[id] != 1) p.vehicules[id] = 1; p.points -= vehicules[id].price; }
		if (id < 7) { p.VBought[0]++; }
		if (id > 6) { if (id < 53) { p.VBought[1]++; } }
		if (id > 52) { if (id < 87) { p.VBought[2]++; } }
		if(vehicules[id].type==0) { p.bonuspoints += vehicules[id].value; }
		if(vehicules[id].type==1) { p.VehMult += vehicules[id].value; }
	}
	VehicleList();
};

function genGun() {
	quality = random(1, 400);
	if (quality >= 1) { setRarity("Very Used", "<font class='bronze'>", 0.25); }
	if (quality >= 50) { setRarity("Used", "<font class='gris'>", 0.5); }
	if (quality >= 120) { setRarity("Normal", "<font class='normal'>", 1); }
	if (quality >= 220) { setRarity("Rare", "<font class='rare'>", 1.25); }
	if (quality >= 350) { setRarity("Epic", "<font class='or'>", 1.5); }
	if (quality >= 380) { setRarity("Legendary", "<font class='rougeb'>", 1.75); }
	if (quality >= 395) { setRarity("Mythic", "<font class='mythic'>", 2); }
}

function genGun2() {
	quality = random(1, 200);
	if (quality >= 1) { setRarity("Normal", "<font class='normal'>", 1); }
	if (quality >= 80) { setRarity("Rare", "<font class='rare'>", 1.25); }
	if (quality >= 150) { setRarity("Epic", "<font class='or'>", 1.5); }
	if (quality >= 180) { setRarity("Legendary", "<font class='rougeb'>", 1.75); }
	if (quality >= 195) { setRarity("Mythic", "<font class='mythic'>", 2); }
}

function setRarity(Type, Class, Mult) {
	p.Rarity = Type;
	p.GunPower = Class;
	p.GunMult = Mult;
}

function useW(id) {
	var weapon = weapons[id];
	if (p.GBought[id] == 1) {
		p.Rarity = "Normal";
		p.GunPower = "<font class='normal'>";
		p.GunMult = 1;
		p.Arme = weapon.name;
		p.WeaponID = id;
		p.ArmePower = weapon.power;
	}
	WeaponList();
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
			genGun();
		}
	} else {
		if (p.cash >= pricebuy * 2) {
			p.cash -= pricebuy * 2;
			p.Arme = arme;
			p.WeaponID = id;
			p.ArmePower = damage;
			genGun2();
		}
	}
	WeaponList();
}

function BuyM(id, qty) {
	var price = GetMissionPrice(id, qty);
	if (price <= p.cash) {
		p.cash -= price;
		if (p.productions[id] == null) {
			p.productions[id] = qty;
		} else {
			p.productions[id] += qty;
			p.rank += qty;
		}
		MissionList();
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
	MissionList();
}

var GetMissionPrice = function (id, qty) {
	var owned = 0;
	if (p.productions[id] != null) owned = p.productions[id];
	var price = (qty * productions[id].price) * Math.pow(productions[id].pricemodifier, owned);
	return price;
};
