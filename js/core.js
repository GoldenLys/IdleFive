var version = "v3.4";
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
	missions: [],
	succes: [],
	ArmeID: 0,
	QualityMult: 1,
	ArmeClass: "<font class='normal'>",
	Arme: "Fist",
	ArmePower: 0.1,
	Quality: "Normal",
	Armes: [],
	GBought: [],
	VBought: [],
	vehicules: [],
	points: 0,
	DamageMult: 0,
	playTime: 0,
	tutorial: 0,
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
	$("#alert").html(texts.infos[3]);
	$(".pusher").css("background-image", "url(images/bg.jpg)");
});


function idleFiveLoop() {
	//DEBUG
	if (p.cash !== p.cash) { p.cash = 0; }
	for (var m in missions) { if (p.missions[m] == null) { p.missions[m] = 0; } }
	for (var w in weapons) { if (p.Armes[w] == null) { p.Armes[w] = 0; } }
	for (var v in vehicules) { if (p.VBought[v] == null) { p.VBought[v] = 0; } }
	for (var type = 0; type < 10; type++) { if (p.GBought[type] == null) { p.GBought[type] = 0; } }
	//UPDATE VARS
	p.playTime++;
	if (p.prestige > 1) p.PrestigeMult = 1 + (p.prestige * 0.15);
	rank = 0;
	for (var i in p.missions) { if (p.missions[i] == null) { p.missions[i] = 0; } rank += p.missions[i]; } // CALCULATE THE RANK
	p.rank = rank;
	p.cash = Math.round(p.cash * 100) / 100; //FIX A JS BUG that can make the cash var at 15.9999999999 for example
	if (p.rank >= p.prestigeprice) { if (p.cash >= p.prestigeprice2) { btnPrestigeE(); } else { btnPrestigeD(); } } else { btnPrestigeD(); }
	p.cash += p.cashps;
	if (p.fl == 1) { showTutorialDIV(); }
	getPrestigePrice();
	getCashPS();
	UpdateUI();
	save();
}

function getCashPS() {
	p.cashps = 0;
	for (var id = 0; id < 14; id++) {
		if (p.missions[id] > 0) {
			p.cashps += (missions[id].value * p.missions[id]) * (p.PrestigeMult + p.CashMult);
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
				p.Armes = [];
				p.GBought[];
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
	if (rankNBR >= 1400) { Class = "Palladium"; }
	if (rankNBR >= 14000) { Class = "Platinum"; }
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
	$("#alert").html(texts.infos[3]);
}

//WEAPONS

function useW(id) {
	var weapon = weapons[id];
	if (p.Armes[id] == 1) {
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
		}
	} else {
		if (p.cash >= pricebuy * 1.25) {
			p.cash -= pricebuy * 1.25;
			p.Arme = arme;
			p.ArmeID = id;
			p.ArmePower = damage;
			genGun2(id);
		}
	}
	SuccessCount();
	UpdateUI();
}

function genGun() {
	quality = random(1, 250);
	if (quality >= 1) { setQuality("Very used", "gris", 0.5); }
	if (quality >= 50) { setQuality("Used", "gris", 0.75); }
	if (quality >= 150) { setQuality("Normal", "normal", 1); }
}

function genGun2() {
	quality = random(1, 204);
	if (quality >= 1) { setQuality("Normal", "normal", 1); }
	if (quality >= 80) { setQuality("Good condition", "rare", 1.25); }
	if (quality >= 150) { setQuality("Very good state", "or", 1.5); }
	if (quality >= 180) { setQuality("Factory new", "rouge", 1.75); }
	if (quality >= 190) { setQuality("Military grade", "mythic", 2); }
	if (quality >= 200) { setQuality("Special forces", "tactical", 3); }
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

var GetMissionPrice = function (id, qty) {
	var owned = 0;
	if (p.missions[id] != null) owned = p.missions[id];
	var total = 0;
	CurPrice = (missions[id].price * Math.pow(missions[id].pricemodifier, owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (missions[id].price * Math.pow(missions[id].pricemodifier, owned + value));
		total += Newprice;
	}
	price = Math.round(total * 100) / 100;
	return price;
};

var GetMissionSPrice = function (id, qty) {
	var owned = 0;
	if (p.missions[id] != null) owned = p.missions[id];
	var total = 0;
	CurPrice = (missions[id].price * Math.pow(missions[id].pricemodifier, owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (missions[id].price * Math.pow(missions[id].pricemodifier, owned - value));
		total += Newprice;
	}
	price = total / 2;
	return price;
};

//VEHICLES

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
