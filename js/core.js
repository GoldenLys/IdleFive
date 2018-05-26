var version = "v3.3";
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
	prestige: 1,
	quality: 0,
	prestigeprice: 400,
	prestigeprice2: 10000000,
	productions: [],
	succes: [],
	ArmeID: 0,
	QualityMult: 1,
	ArmeClass: "<font class='normal'>",
	Arme: "Fist",
	ArmePower: 0.1,
	Quality: "Normal",
	GBought: [],
	VBought: [],
	vehicules: [],
	points: 0,
	DamageMult: 0,
	playTime: 0,
	tutorial: 0,
};


$(document).ready(function () {
	if (localStorage.getItem("IdleFive") != null) { load(); }
	setInterval(function () { idleFiveLoop(); }, 1000);
	setInterval(function () { checkalerts(1, 30); }, 60000);
	setInterval(function () { clearalerts(); }, 20000);
	save();
	UpdateTexts();
	ClickEvents();
	SuccessCount();
	showTutorial(p.tutorial);
	$("#alert").html(texts.infos[3]);
	$(".pusher").css("background-image", "url(images/bg.jpg)");
	if (p.BackgroundsToggle == 0) { p.BackgroundsToggle = 1; ToggleBackgrounds(); }
});


function idleFiveLoop() {
	if (p.cash !== p.cash) { p.cash = 0; }
	p.playTime++;
	if (p.prestige > 1) p.PrestigeMult = 1 + (p.prestige * 0.15);
	for (var mission = 0; mission < 14; mission++) { if (p.productions[mission] == null) { p.productions[mission] = 0; } }
	for (var gun = 0; gun < 37; gun++) { if (p.GBought[gun] == null) { p.GBought[gun] = 0; } }
	for (var vehicle = 0; vehicle < 182; vehicle++) { if (p.VBought[vehicle] == null) { p.VBought[vehicle] = 0; } }
	if (p.rank >= p.prestigeprice) { if (p.cash >= p.prestigeprice2) { btnPrestigeE(); } else { btnPrestigeD(); } } else { btnPrestigeD(); }
	//p.cash = Math.round(p.cash * 100) / 100; //FIX A JS BUG that can make the cash var at 15.9999999999 for example
	var rank = 0;
	for (var id = 0; id < 14; id++) { if (p.productions[id] == null) { p.productions[id] = 0; } rank += p.productions[id]; } // CALCULATE THE RANK
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
			p.cashps += (productions[id].value * p.productions[id]) * (p.PrestigeMult + p.CashMult);
			p.cash += p.cashps;
		}
	}
}

function ClickWeapon() {
	p.cash += (p.ArmePower * p.QualityMult) * (p.PrestigeMult + p.DamageMult + p.CashMult);
	UpdateUI();
}

function AddPrestige() {
	if (p.rank >= p.prestigeprice) {
		if (p.cash >= p.prestigeprice2) {
			var r = confirm("Would you like to reset your character to get some bonuses ?");
			if (r == true) {
				p.points = Math.trunc(p.rank / 200);
				p.ArmePower = 0.1;
				p.ArmeID = 0;
				p.QualityMult = 1;
				p.ArmeClass = "<font class='normal'>";
				p.Arme = "Fist";
				p.Quality = "Normal";
				p.GBought = [];
				p.rank = 0;
				p.cash = 0;
				p.cashps = 0;
				p.productions = [];
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
	if (rankNBR >= 100) { Class = "Silver"; }
	if (rankNBR >= 600) { Class = "Silver"; }
	if (rankNBR >= 700) { Class = "Gold"; }
	if (rankNBR >= 1400) { Class = "Platinum"; }
	result2 = "<font class='" + Class + "'> " + rankNBR + "</font>";
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
			$("#alert").html(texts.infos[3]);
		}
	}
}

function clearalerts() {
	$("#alert").html(texts.infos[3]);
}

var buyV = function (id) {
	if (p.vehicules[id] != 1) {
		if (vehicules[id].price <= p.points) {
			if (p.vehicules[id] == null) {
				p.vehicules[id] = 1;
				p.points -= vehicules[id].price;
			} else {
				if (p.vehicules[id] != 0) {
					p.vehicules[id] = 1;
					p.points -= vehicules[id].price;
				}
			}
			if (id < 7) { p.VBought[0]++; }
			if (id > 6) { if (id < 53) { p.VBought[1]++; } }
			if (id > 52) { if (id < 87) { p.VBought[2]++; } }
			if (id > 86) { if (id < 143) { p.VBought[3]++; } }
			if (id > 142) { if (id < 183) { p.VBought[4]++; } }
			if (vehicules[id].type == 0) { p.DamageMult += vehicules[id].value; }
			if (vehicules[id].type == 1) { p.CashMult += vehicules[id].value; }
		}
	} else { console.log("YOU ALREADY OWN THIS"); }
	SuccessCount();
	UpdateUI();
};

function genGun(id) {
	quality = random(1, 200);
	if (quality >= 1) { setQuality("Very used", "gris", 0.5); }
	if (quality >= 50) { setQuality("Used", "gris", 0.75); }
	if (quality >= 150) { setQuality("Normal", "normal", 1); }
}

function genGun2(id) {
	quality = random(1, 204);
	if (quality >= 1) { setQuality("Normal", "normal", 1); }
	if (quality >= 80) { setQuality("Good condition", "rare", 1.25); }
	if (quality >= 150) { setQuality("Very good state", "or", 1.5); }
	if (quality >= 180) { setQuality("Factory new", "rougeb", 1.75); }
	if (quality >= 190) { setQuality("Military grade", "mythic", 2); }
	if (quality >= 200) { setQuality("Special forces", "tactical", 3); }
}

function setQuality(Type, Class, Mult) {
	p.Quality = Type;
	p.ArmeClass = "<font class='" + Class + "'>";
	p.QualityMult = Mult;
}

function useW(id) {
	var weapon = weapons[id];
	if (p.GBought[id] == 1) {
		if (p.ArmeID != id) {
			p.Quality = "Normal";
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
	if (p.GBought[id] == 0) {
		if (p.cash >= pricebuy) {
			p.cash -= pricebuy;
			p.Arme = arme;
			p.ArmePower = damage;
			p.ArmeID = id;
			p.GBought[id] = 1;
			genGun(id);
		}
	} else {
		if (p.cash >= pricebuy * 2) {
			p.cash -= pricebuy * 2;
			p.Arme = arme;
			p.ArmeID = id;
			p.ArmePower = damage;
			genGun2(id);
		}
	}
	SuccessCount();
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
		SuccessCount();
		getCashPS();
		UpdateUI();
	}
}

function SellM(id, qty) {
	var price = GetMissionSPrice(id, qty);
	if (p.productions[id] == null) p.productions[id] = 0;
	p.cash += price;
	if (p.productions[id] >= qty) {
		p.productions[id] -= qty;
		p.rank -= qty;
	} else {
		p.productions[id] = null;
	}
	SuccessCount();
	getCashPS();
	UpdateUI();
}

var GetMissionPrice = function (id, qty) {
	var owned = 0;
	if (p.productions[id] != null) owned = p.productions[id];
	var total = 0;
	CurPrice = (productions[id].price * Math.pow(productions[id].pricemodifier, owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (productions[id].price * Math.pow(productions[id].pricemodifier, owned + value));
		total += Newprice;
	}
	price = total;
	return price;
};

var GetMissionSPrice = function (id, qty) {
	var owned = 0;
	if (p.productions[id] != null) owned = p.productions[id];
	var total = 0;
	CurPrice = (productions[id].price * Math.pow(productions[id].pricemodifier, owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (productions[id].price * Math.pow(productions[id].pricemodifier, owned - value));
		total += Newprice;
	}
	price = total / 2;
	return price;
};
