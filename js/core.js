var version = "v39";
var a1 = 0;
var texts = textsENG;
var p = {
	DateStarted: getDate(),
	fl: 1,
	rank: 0,
	cash: 0,
	cashps: 0,
	PrestigeMult: 1,
	CashMult: 0,
	DamageMult: 0,
	prestige: 1,
	prestigeprice: 0,
	prestigeprice2: 0,
	missions: [],
	succes: [],
	ArmeID: 0,
	QualityMult: 1,
	ArmeClass: "<font class='normal'>",
	Arme: "Fist",
	ArmePower: 0.5,
	Quality: "1 <i class='small star icon'></i>",
	Armes: [],
	GBought: [],
	Vehicules: [],
	VBought: [],
	points: 0,
	playTime: 0,
	TotalClicks: 0,
	tutorial: 0,
	OTitle: "Use your weapon 10 times.",
	OType: 0,
	OReward: 1,
	OBase: 0,
	ORequired: 0,
	ORequired2: 0,
	CompletedQuests: 0,
	spentpoints: 0,
};


$(document).ready(function () {
	if (localStorage.getItem("idleFive3") != null) { load(); }
	setInterval(function () { idleFiveLoop(); }, 1000);
	setInterval(function () { checkalerts(1, 30); }, 60000);
	setInterval(function () { clearalerts(); }, 20000);
	save();
	UpdateTexts();
	ClickEvents();
	SuccessCount();
	showTutorial(p.tutorial);
	$("#alert").html("");
	$(".pusher").css("background-image", "url(images/bg.jpg)");
	$('.ui.sidebar').sidebar('hide');
});


function idleFiveLoop() {
	//DEBUG
	if (p.cash !== p.cash) { p.cash = 0; }
	p.cash = Math.round(p.cash * 100) / 100; //FIX A BUG that can make the cash var at 0.9999999999 for example
	for (var m in missions) { if (p.missions[m] == null) { p.missions[m] = 0; } }
	for (var w in weapons) { if (p.Armes[w] == null) { p.Armes[w] = 0; } }
	for (var v in vehicules) { if (p.Vehicules[v] == null) { p.Vehicules[v] = 0; } }
	for (var s in success) { if (p.succes[s] == null) { p.succes[s] = 0; } }
	for (var vtype = 0; vtype < 17; vtype++) { if (p.VBought[vtype] == null) { p.VBought[vtype] = 0; } }
	for (var wtype = 0; wtype < 10; wtype++) { if (p.GBought[wtype] == null) { p.GBought[wtype] = 0; } }
	//UPDATE VARS
	p.playTime++;
	if (p.prestige > 1) p.PrestigeMult = 1 + (p.prestige * 0.1) - 0.1;
	rank = 0;
	for (var i in p.missions) { if (p.missions[i] == null) { p.missions[i] = 0; } rank += p.missions[i]; } // CALCULATE THE RANK
	p.rank = rank;
	if (p.OType == 2) { if (p.rank >= p.ORequired) { getRewards(); } }
	if (p.OType == 1) { if (p.OBase >= p.ORequired) { getRewards(); } }
	if (p.rank >= p.prestigeprice) { if (p.cash >= p.prestigeprice2) { btnPrestigeE(); } else { btnPrestigeD(); } } else { btnPrestigeD(); }
	p.cash += p.cashps;
	if (p.fl == 1) { showTutorialDIV(); }
	if (p.OType == 3) { p.OBase = p.Quality; }
	getPrestigePrice();
	getCashPS();
	UpdateUI();
	save();
}

function getCashPS() {
	p.cashps = 0;
	for (var m in missions) {
		if (p.missions[m] > 0) {
			p.cashps += (missions[m].value * p.missions[m]) * (p.PrestigeMult + p.CashMult);
		}
	}
}

function ClickWeapon() {
	p.cash += (p.ArmePower * p.QualityMult) * (p.PrestigeMult + p.DamageMult + p.CashMult);
	p.TotalClicks++;
	if (p.OType == 0) { p.ORequired--; if (p.ORequired <= 0) { getRewards(); } }
	UpdateUI();
}

function AddPrestige() {
	if (p.rank >= p.prestigeprice) {
		if (p.cash >= p.prestigeprice2) {
			var r = confirm("Would you like to reset your character to get some bonuses ?");
			if (r == true) {
				p.points = Math.trunc(p.rank / 200);
				p.ArmePower = 0.5;
				p.ArmeID = 0;
				p.QualityMult = 1;
				p.ArmeClass = "<font class='normal'>";
				p.Arme = "Fist";
				p.Quality = "3 <i class='small star icon'></i>";
				p.Armes = [];
				p.GBought = [];
				p.rank = 0;
				p.cash = 0;
				p.cashps = 0;
				p.missions = [];
				p.prestige++;
				UpdateUI();
				SuccessCount();
				hideMenus();
			}
		}
	}
}

function ForcePrestige() {
	p.rank = p.prestigeprice;
	p.cash = p.prestigeprice2;
	AddPrestige();
}

function Soleil_Rouge() {
	p.rank = p.prestigeprice;
	p.cash = p.prestigeprice2;
	p.Armes[68] = 1;
	useW(38);
	setQuality("8 <i class='small star icon'></i>", "tactical", 3);
}

function getPrestigePrice() {
	p.prestigeprice = p.prestige * 50 + 400;
	p.prestigeprice2 = (p.prestige * 1e9) + 1e10;
	if (p.prestige == 0) {
		p.prestigeprice = 400;
		p.prestigeprice2 = 10000000;
	}
}

function getRank(rankNBR) {
	var Class = "";
	if (rankNBR >= 0) { Class = "Bronze"; }
	if (rankNBR >= 210) { Class = "Silver"; } // x10 each
	if (rankNBR >= 525) { Class = "Silver"; } // x25 each
	if (rankNBR >= 1050) { Class = "Gold"; } // x50 each
	if (rankNBR >= 2100) { Class = "Palladium"; } // x100 each
	if (rankNBR >= 210000) { Class = "Platinum"; } // x1000 each
	result2 = "<font class='" + Class + "'> " + rankNBR + "</font>";
	return result2;
}

function checkalerts(num, num2) {
	chance = random(num, num2);
	if (p.cash > 100) {
		if (chance >= 28) {
			tax = random(100, (p.cash / 100) * 50);
			p.cash -= tax;
			$("#alert").html("<p class='game-text rouge'>" + texts.infos[5] + " <font class='money'></font>" + fix(tax, 3) + " " + texts.infos[6]);
		}
	}
}

function clearalerts() {
	$("#alert").html("");
}

//WEAPONS

function useW(id) {
	var weapon = weapons[id];
	if (p.Armes[id] == 1) {
		if (p.ArmeID != id) {
			p.Quality = "3 <i class='small star icon'></i>";
			p.ArmeClass = "<font class='normal'>";
			p.QualityMult = 1;
			p.Arme = weapon.name;
			p.ArmeID = id;
			p.ArmePower = weapon.power;
		}
	}
	UpdateUI();
}

function buyG(id) {
	var arme = weapons[id].name;
	var damage = weapons[id].power;
	var pricebuy = weapons[id].price;
	if (p.Armes[id] == 0) {
		if (p.cash >= pricebuy) {
			p.cash -= pricebuy;
			p.Arme = arme;
			p.ArmePower = damage;
			p.ArmeID = id;
			p.Armes[id] = 1;
			genGun(id);
			if (id < 13) { p.GBought[0]++; }
			if (id > 12) { if (id < 28) { p.GBought[1]++; } }
			if (id > 27) { if (id < 37) { p.GBought[2]++; } }
			if (id > 36) { if (id < 48) { p.GBought[3]++; } }
			if (id > 47) { if (id < 58) { p.GBought[4]++; } }
			if (id > 57) { if (id < 63) { p.GBought[5]++; } }
			if (id > 62) { if (id < 70) { p.GBought[6]++; } }
			if (id > 69) { if (id < 81) { p.GBought[7]++; } }
			if (id > 80) { if (id < 82) { p.GBought[8]++; } }
			if (p.OType == 3) { if (p.QualityMult == p.ORequired) { getRewards(); } }
		}
	} else {
		if (p.cash >= pricebuy * 1.25) {
			p.cash -= pricebuy * 1.25;
			p.Arme = arme;
			p.ArmeID = id;
			p.ArmePower = damage;
			genGun2(id);
			if (p.OType == 3) { if (p.QualityMult == p.ORequired) { getRewards(); } }
		}
	}
	SuccessCount();
	UpdateUI();
}

function genGun() {
	quality = random(1, 250);
	if (quality >= 1) { setQuality("1 <i class='small star icon'></i>", "gris", 0.5); }
	if (quality >= 50) { setQuality("2 <i class='small star icon'></i>", "gris", 0.75); }
	if (quality >= 150) { setQuality("3 <i class='small star icon'></i>", "normal", 1); }
}

function genGun2() {
	quality = random(1, 204);
	if (quality >= 1) { setQuality("3 <i class='small star icon'></i>", "normal", 1); }
	if (quality >= 80) { setQuality("4 <i class='small star icon'></i>", "rare", 1.25); }
	if (quality >= 150) { setQuality("5 <i class='small star icon'></i>", "or", 1.5); }
	if (quality >= 180) { setQuality("6 <i class='small star icon'></i>", "rouge", 1.75); }
	if (quality >= 190) { setQuality("7 <i class='small star icon'></i>", "mythic", 2); }
	if (quality >= 200) { setQuality("8 <i class='small star icon'></i>", "tactical", 3); }
}

function setQuality(Type, Class, Mult) {
	p.Quality = Type;
	p.ArmeClass = "<font class='" + Class + "'>";
	p.QualityMult = Mult;
}

//MISSIONS

function BuyM(id, qty) {
	var price = GetMissionPrice(id, qty);
	if (price <= p.cash) {
		p.cash -= price;
		if (p.missions[id] == null) {
			p.missions[id] = qty;
			p.rank += qty;
		} else {
			p.missions[id] += qty;
			p.rank += qty;
		}
		if (p.OType == 1) { if (id == p.ORequired2) { if (p.OBase >= p.ORequired) { getRewards(); } else { p.OBase += qty; } } }
		SuccessCount();
		getCashPS();
		UpdateUI();
	}
}

function SellM(id, qty) {
	var price = GetMissionSPrice(id, qty);
	if (p.missions[id] == null) p.missions[id] = 0;
	p.cash += price;
	if (p.missions[id] >= qty) {
		p.missions[id] -= qty;
		p.rank -= qty;
	} else {
		p.missions[id] = null;
	}
	SuccessCount();
	getCashPS();
	UpdateUI();
}

function GetMissionPrice(id, qty) {
	var owned = 0;
	if (p.missions[id] != null) owned = p.missions[id];
	var total = 0;
	CurPrice = (missions[id].price * Math.pow(missions[id].modifier, owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (missions[id].price * Math.pow(missions[id].modifier, owned + value));
		total += Newprice;
	}
	price = Math.round(total * 100) / 100;
	return price;
}

function GetMissionSPrice(id, qty) {
	var owned = 0;
	if (p.missions[id] != null) owned = p.missions[id];
	var total = 0;
	CurPrice = (missions[id].price * Math.pow(missions[id].modifier, owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (missions[id].price * Math.pow(missions[id].modifier, owned - value));
		total += Newprice;
	}
	price = total / 2;
	return price;
}

//VEHICLES

function buyV(id) {
	if (p.Vehicules[id] < 1) {
		if (vehicules[id].price <= p.points) {
			if (p.Vehicules[id] == 0) {
				p.Vehicules[id] = 1;
				p.points -= vehicules[id].price;
				p.spentpoints += vehicules[id].price;
			} else {
				if (p.Vehicules[id] > 1) {
					p.Vehicules[id] = 1;
				}
			}
			if (id < 7) { p.VBought[0]++; }
			if (id > 6) { if (id < 53) { p.VBought[1]++; } }
			if (id > 52) { if (id < 87) { p.VBought[2]++; } }
			if (id > 86) { if (id < 143) { p.VBought[3]++; } }
			if (id > 142) { if (id < 182) { p.VBought[4]++; } }
			if (id > 181) { if (id < 225) { p.VBought[5]++; } }
			if (id > 224) { if (id < 234) { p.VBought[6]++; } }
			if (id > 233) { if (id < 265) { p.VBought[7]++; } }
			if (id > 264) { if (id < 303) { p.VBought[8]++; } }
			if (id > 302) { if (id < 317) { p.VBought[9]++; } }
			if (id > 316) { if (id < 337) { p.VBought[10]++; } }
			if (id > 336) { if (id < 356) { p.VBought[11]++; } }
			if (vehicules[id].type == 0) { p.DamageMult += vehicules[id].value; }
			if (vehicules[id].type == 1) { p.CashMult += vehicules[id].value; }
		}
	}
	SuccessCount();
	UpdateUI();
}

function ChangeObjective() {
	if (p.points >= 0.5) {
		p.points -= 0.5;
		NewObjective();
	}
}

function NewObjective() {
	var type = random(0, 3);
	var chance = random(0, 100);
	if (type == 0) {
		p.ORequired2 = null;
		if (chance < 30) {
			p.ORequired = random(10, 30);
			p.OReward = 0.1;
		}
		if (chance >= 30) {
			p.ORequired = random(50, 100);
			p.OReward = 0.2;
		}
		if (chance >= 80) {
			p.ORequired = random(200, 1000);
			p.OReward = 0.5;
		}
		p.OTitle = "Use your weapon <font class='jaune'>" + p.ORequired + "</font> times";
		p.OType = type;
		p.OBase = p.ORequired;
	}
	if (type == 1) {
		for (var m in missions) { p.ORequired2 = random(0, m); }
		if (chance < 30) {
			p.ORequired = random(1, 10);
			p.OReward = 0.1;
		}
		if (chance >= 30) {
			p.ORequired = random(20, 30);
			p.OReward = 0.2;
		}
		if (chance >= 80) {
			p.ORequired = random(50, 80);
			p.OReward = 0.5;
		}
		p.OTitle = "Increase <font class='jaune'>" + missions[p.ORequired2].name + " " + p.ORequired + "</font> times";
		p.OType = type;
		p.OBase = 0;
	}
	if (type == 2) {
		if (chance < 30) {
			p.ORequired = p.rank + random(10, 30);
			p.OReward = 0.1;
		}
		if (chance >= 30) {
			p.ORequired = p.rank + random(30, 100);
			p.OReward = 0.2;
		}
		if (chance >= 80) {
			p.ORequired = p.rank + random(200, 500);
			p.OReward = 0.5;
		}
		p.OTitle = "Reach the rank" + getRank(p.ORequired) + "";
		p.OType = type;
		p.ORequired2 = null;
		p.OBase = p.rank;
	}
	if (type == 3) {
		if (chance >= 0) {
			p.ORequired = 1;
			p.ORequired2 = "3 <i class='small star icon'></i>";
			p.OReward = 0.1;
		}
		if (chance >= 20) {
			p.ORequired = 1.25;
			p.ORequired2 = "4 <i class='small star icon'></i>";
			p.OReward = 0.1;
		}
		if (chance >= 40) {
			p.ORequired = 1.5;
			p.ORequired2 = "5 <i class='small star icon'></i>";
			p.OReward = 0.2;
		}
		if (chance >= 60) {
			p.ORequired = 1.75;
			p.ORequired2 = "6 <i class='small star icon'></i>";
			p.OReward = 0.2;
		}
		if (chance >= 80) {
			p.ORequired = 2;
			p.ORequired2 = "7 <i class='small star icon'></i>";
			p.OReward = 0.5;
		}
		if (chance >= 98) {
			p.ORequired = 3;
			p.ORequired2 = "8 <i class='small star icon'></i>";
			p.OReward = 1.0;
		}
		p.OTitle = "Obtain a weapon with " + p.ORequired2 + " or more";
		p.OType = type;
	}
}

function getRewards() {
	p.points += p.OReward;
	p.CompletedQuests++;
	NewObjective();
	$("#colonne-m").append("<div id='objective' class='ui black message'><i id='close' class='close icon'></i><div class='header vert'>Objective completed !</div>New objective :<br /> " + p.OTitle + "</div>")
}
function ReasignPoints() {
	p.points += p.spentpoints;
	p.spentpoints = 0;
	for (var v in vehicules) { if (p.Vehicules[v] == 1) { p.Vehicules[v] = 0; } }
	for (var vtype = 0; vtype < 17; vtype++) { if (p.VBought[vtype] > 0) { p.VBought[vtype] = 0; } }
	p.DamageMult=0;
	p.CashMult=0;
}
