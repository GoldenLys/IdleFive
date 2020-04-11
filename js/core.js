const version = "v4.1";
var texts = textsEN;
var alert = 0;
var p = {
	//DEFAULT VARS
	DateStarted: getDate(),
	fl: 1,
	//GAME VARS
	rank: 0,
	cash: 0,
	cashps: 0,
	Weapon: {
		Id: 0,
		Class: "Normal",
		Mult: 1,
		Power: 0.5,
	},
	Stars: [1],
	prestige: {
		level: 1,
		bonus: 1,
		price: [0, 0],
		multipliers: [0, 0], //DAMAGE - CASH
	},
	points: 0,
	quest: {
		type: 0,
		reward: 1,
		progression: 0,
		objective: [10, 0],
	},
	//STATISTICS
	missions: [],
	succes: [],
	WeaponBought: [1],
	WeaponType: [],
	playTime: 0,
	TotalClicks: 0,
	tutorial: 0,
	CompletedQuests: 0,
	spentpoints: 0,
};

$(document).ready(function () {
	if (localStorage.getItem("idleFive4") != null) { load(); }
	setInterval(function () { idleFiveLoop(); }, 1000);
	save();
	UpdateTexts();
	ClickEvents();
	SuccessCount();
	getCashPS();
	getPrestigePrice();
	showTutorial(p.tutorial);
	$('.ui.sidebar').sidebar('hide');
});

function idleFiveLoop() {
	//DEBUG
	if (p.cash !== p.cash) { p.cash = 0; }
	p.cash = Math.round(p.cash * 100) / 100;
	for (var m in missions) { if (p.missions[m] == null) { p.missions[m] = 0; } }
	for (var w in weapons) {
		if (p.WeaponBought[w] == null) { p.WeaponBought[w] = 0; }
		if (p.Stars[w] == null) p.Stars[w] = 0;
	}
	for (var s in success) { if (p.succes[s] == null) p.succes[s] = 0; }
	for (var wtype = 0; wtype < 10; wtype++) if (p.WeaponType[wtype] == null) { p.WeaponType[wtype] = 0; }

	//UPDATE VARS
	p.playTime++;
	if (p.prestige.level > 1) p.prestige.bonus = 1 + (p.prestige.level * 0.1) - 0.1;
	rank = 0;
	for (var i in p.missions) { if (p.missions[i] == null) { p.missions[i] = 0; } rank += p.missions[i]; } // CALCULATE THE RANK
	p.rank = rank;
	if (p.quest.type == 2 && p.rank >= p.quest.objective[0]) getRewards();
	if (p.quest.type == 1 && p.quest.progression >= p.quest.objective[0]) getRewards();
	if (p.rank >= p.prestige.price[0]) { if (p.cash >= p.prestige.price[1]) { btnPrestigeE(); } else { btnPrestigeD(); } } else { btnPrestigeD(); }
	p.cash += p.cashps;
	if (p.fl == 1) showTutorialDIV();
	if (p.quest.type == 3) p.quest.progression = p.Stars[p.Weapon.Id];
	if (alert > 0 || $("#announce").is("visible")) alert--;
	else $("#announce").hide();
	UpdateUI();
	save();
}

function getCashPS() {
	p.cashps = 0;
	for (var m in missions) {
		if (p.missions[m] > 0) {
			p.cashps += (missions[m].value * p.missions[m]) * (p.prestige.bonus + (p.prestige.multipliers[0] * 0.1));
		}
	}
}

function ClickWeapon() {
	p.cash += p.Weapon.Power * p.Weapon.Mult * p.prestige.bonus + p.prestige.multipliers[1] * 0.1;
	p.TotalClicks++;
	if (p.quest.type == 0) { p.quest.objective[0]--; if (p.quest.objective[0] <= 0) { getRewards(); } }
	UpdateUI();
}

function AddPrestige() {
	if (p.rank >= p.prestige.price[0]) {
		if (p.cash >= p.prestige.price[1]) {
			var r = confirm("Would you like to reset your character to get some bonuses ?");
			if (r == true) {
				p.points = Math.trunc(p.rank / 200);
				p.Weapon.Power = 0.5;
				p.Weapon.Id = 0;
				p.Weapon.Mult = 1;
				p.Weapon.Class = "Normal";
				p.WeaponBought = [];
				p.WeaponType = [];
				p.rank = 0;
				p.cash = 0;
				p.cashps = 0;
				p.missions = [];
				p.prestige.level++;
				p.quest.type = 0;
				p.quest.reward = 1;
				p.quest.progression = 0;
				p.quest.objective = [10, 0];
				UpdateUI();
				SuccessCount();
				hideMenus();
				getPrestigePrice();
			}
		}
	}
}

function getPrestigePrice() {
	p.prestige.price[0] = p.prestige.level * 50 + 750;
	let price = 1e9;

	for (var Plevel=1; Plevel < p.prestige.level; Plevel++) {
		price += (p.prestige.level * 1e9) * 0.3;
	}

	p.prestige.price[1] = price;
}

function getRank(rankNBR) {
	let Class = "";
	if (rankNBR >= 0) Class = "Bronze";
	if (rankNBR >= 210) Class = "Silver";  // x10 each
	if (rankNBR >= 525) Class = "Silver";  // x25 each
	if (rankNBR >= 1050) Class = "Gold";  // x50 each
	if (rankNBR >= 2100) Class = "Platinum";  // x100 each
	if (rankNBR >= 210000) Class = "Heavenly";  // x1000 each
	return "<font class='" + Class + "'>" + rankNBR + "</font>";
}

function useW(id) {
	var weapon = weapons[id];
	if (p.WeaponBought[id] == 1) {
		if (p.Weapon.Id != id) {
			p.Weapon.Class = "Common";
			p.Weapon.Mult = 1;
			p.Weapon.Id = id;
			p.Weapon.Power = weapon.power;
			setQuality(p.Stars[p.Weapon.Id]);
		}
	}
	UpdateUI();
}

function buyG(id) {
	var arme = weapons[id];
	var damage = weapons[id].power;
	var pricebuy = weapons[id].price;
	if (p.WeaponBought[id] == 0) {
		if (p.cash >= pricebuy) {
			p.cash -= pricebuy;
			p.Weapon.Power = damage;
			p.Weapon.Id = id;
			p.WeaponBought[id] = 1;
			genGun(id);
			if (id < 13) { p.WeaponType[0]++; }
			p.WeaponType[weapons[id].type]++;
			if (p.quest.type === 3 && p.Weapon.Mult === p.quest.objective[0]) getRewards();
		}
	} else {
		if (p.cash >= pricebuy * 1.25) {
			p.cash -= pricebuy * 1.25;
			p.Weapon.Id = id;
			p.Weapon.Power = damage;
			genGun2(id);
			if (p.quest.type == 3) { if (p.Weapon.Mult == p.quest.objective[0]) { getRewards(); } }
		}
	}
	SuccessCount();
	UpdateUI();
}

function genGun() {
	quality = random(1, 250);
	if (quality >= 1) { setQuality(1); ALERT("Bought a " + GenStarLabel(1) + " " + weapons[p.Weapon.Id].name, 5); }
	if (quality >= 50) { setQuality(2); ALERT("Bought a " + GenStarLabel(2) + " " + weapons[p.Weapon.Id].name, 5); }
	if (quality >= 150) { setQuality(3); ALERT("Bought a " + GenStarLabel(3) + " " + weapons[p.Weapon.Id].name, 5); }
}

function genGun2() {
	let luck = random(1, 20);
	let quality = random(1, 100); // 3 Stars
	if (luck > 10) quality = random(1, 100); //4 Stars
	if (luck > 12) quality = random(1, 125); //5 Stars
	if (luck > 14) quality = random(1, 150); //6 Stars
	if (luck > 16) quality = random(1, 175); //6 Stars
	if (luck > 18) quality = random(1, 200); //8 Stars
	if (quality >= 1) { setQuality(3); ALERT("Rolled a " + GenStarLabel(3) + weapons[p.Weapon.Id].name, 5); }
	if (quality > 100) { setQuality(4); ALERT("Rolled a " + GenStarLabel(4) + weapons[p.Weapon.Id].name, 5); }
	if (quality > 125) { setQuality(5); ALERT("Rolled a " + GenStarLabel(5) + weapons[p.Weapon.Id].name, 5); }
	if (quality > 150) { setQuality(6); ALERT("Rolled a " + GenStarLabel(6) + weapons[p.Weapon.Id].name, 5); }
	if (quality > 175) { setQuality(7); ALERT("Rolled a " + GenStarLabel(7) + weapons[p.Weapon.Id].name, 5); }
	if (quality > 200) { setQuality(8); ALERT("Rolled a " + GenStarLabel(8) + weapons[p.Weapon.Id].name, 5); }
}

function ALERT(text, seconds) {
	$("#announce-text").html(text);
	$("#announce").show();
	alert = seconds;
}

function setQuality(Stars) {
	if (p.Stars[p.Weapon.Id] != 0) if (p.Stars[p.Weapon.Id] > Stars) Stars = p.Stars[p.Weapon.Id];

	if (Stars == 1) { p.Weapon.Mult = 0.5; p.Weapon.Class = "Normal"; }
	if (Stars == 2) { p.Weapon.Mult = 0.75; p.Weapon.Class = "Normal"; }
	if (Stars == 3) { p.Weapon.Mult = 1; p.Weapon.Class = "Common"; }
	if (Stars == 4) { p.Weapon.Mult = 1.25; p.Weapon.Class = "Uncommon"; }
	if (Stars == 5) { p.Weapon.Mult = 1.5; p.Weapon.Class = "Rare"; }
	if (Stars == 6) { p.Weapon.Mult = 1.75; p.Weapon.Class = "Epic"; }
	if (Stars == 7) { p.Weapon.Mult = 2; p.Weapon.Class = "Exotic"; }
	if (Stars == 8) { p.Weapon.Mult = 3; p.Weapon.Class = "Divine"; }

	if (Stars > p.Stars[p.Weapon.Id]) p.Stars[p.Weapon.Id] = Stars;
}

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
		if (p.quest.type == 1 && id == p.quest.objective[1]) {
			if (p.quest.progression >= p.quest.objective[0]) getRewards();
			else p.quest.progression += qty;
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

function GetMissionPrice(id, qty) {
	let owned = 0;
	let total = 0;

	if (p.missions[id] != null) owned = p.missions[id];
	CurPrice = (missions[id].price * Math.pow(missions[id].modifier, owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (missions[id].price * Math.pow(missions[id].modifier, owned + value));
		total += Newprice;
	}
	return Math.round(total * 100) / 100;
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
	return (total / 2);
}

function buyV(id) {
	if (vehicules[id].price <= p.points) {
		p.points -= vehicules[id].price;
		p.spentpoints += vehicules[id].price;
		p.prestige.multipliers[vehicules[id].type]++;
	}
	VehicleList();
	UpdateUI();
}

function GetQuestTitle() {
	let TYPE = p.quest.type;
	let MESSAGE = "";

	if (TYPE === 0) MESSAGE = "Use your weapon <span class='jaune'>" + p.quest.objective[0] + "</span> times more.";
	if (TYPE === 1) MESSAGE = "Increase <span class='jaune'>" + missions[p.quest.objective[1]].name + " " + (p.quest.objective[0] - p.quest.progression) + "</span> times";
	if (TYPE === 2) MESSAGE = "Reach the rank " + getRank(p.quest.objective[0]);
	if (TYPE === 3) MESSAGE = "Obtain a new weapon with " + p.quest.objective[1] + "or more";

	return MESSAGE;
}

function ListMissionsBought() {
	let filtered = [];

	for (let M in missions) {
		if (p.missions[M] > 0) filtered.push(Number(M));
	}

	return filtered;
}

function NewObjective() {
	let filter = ListMissionsBought();
	let chance = random(0, 30);
	let maxStars = 0;
	for (let star in p.Stars) {
		if (p.Stars[star] < 8) maxStars = 1;
	}
	let type = random(0, 3);
	if (maxStars === 1) type = random(0, 2);

	if (rank >= 50) {
		chance = chance = random(0, 50);
		if (rank >= 250) chance = random(0, 80);
		if (rank >= 1000) chance = random(0, 100);
	}
	if (type == 0) {
		if (chance < 30) {
			p.quest.objective[0] = random(10, 30);
			p.quest.reward = 0.1;
		}
		if (chance >= 30) {
			p.quest.objective[0] = random(50, 100);
			p.quest.reward = 0.2;
		}
		if (chance >= 80) {
			p.quest.objective[0] = random(100, 300);
			p.quest.reward = 0.5;
		}
		p.quest.type = type;
		p.quest.progression = p.quest.objective[0];
	}
	if (type == 1) {
		let objective = filter[Math.floor(Math.random() * filter.length)];
		p.quest.objective[1] = objective;
		if (chance < 30) {
			p.quest.objective[0] = random(1, 10);
			p.quest.reward = 0.1;
		}
		if (chance >= 30) {
			p.quest.objective[0] = random(20, 30);
			p.quest.reward = 0.2;
		}
		if (chance >= 80) {
			p.quest.objective[0] = random(50, 80);
			p.quest.reward = 0.5;
		}
		p.quest.objective[0] += p.quest.objective[0];
		p.quest.type = type;
		p.quest.progression = p.missions[objective];
	}
	if (type == 2) {
		if (chance < 30) {
			p.quest.objective[0] = p.rank + random(10, 30);
			p.quest.reward = 0.1;
		}
		if (chance >= 30) {
			p.quest.objective[0] = p.rank + random(30, 100);
			p.quest.reward = 0.2;
		}
		if (chance >= 80) {
			p.quest.objective[0] = p.rank + random(200, 500);
			p.quest.reward = 0.5;
		}
		p.quest.type = type;
		p.quest.objective[1] = null;
		p.quest.progression = p.rank;
	}
	if (type == 3) {
		if (chance >= 0) {
			p.quest.objective[0] = 1;
			p.quest.objective[1] = GenStarLabel(3);
			p.quest.reward = 0.1;
		}
		if (chance >= 20) {
			p.quest.objective[0] = 1.25;
			p.quest.objective[1] = GenStarLabel(4);
			p.quest.reward = 0.1;
		}
		if (chance >= 40) {
			p.quest.objective[0] = 1.5;
			p.quest.objective[1] = GenStarLabel(5);
			p.quest.reward = 0.2;
		}
		if (chance >= 60) {
			p.quest.objective[0] = 1.75;
			p.quest.objective[1] = GenStarLabel(6);
			p.quest.reward = 0.2;
		}
		if (chance >= 80) {
			p.quest.objective[0] = 2;
			p.quest.objective[1] = GenStarLabel(7);
			p.quest.reward = 0.5;
		}
		if (chance >= 98) {
			p.quest.objective[0] = 3;
			p.quest.objective[1] = GenStarLabel(8);
			p.quest.reward = 1.0;
		}
		p.quest.type = type;
	}
}

function getRewards() {
	p.points += p.quest.reward;
	p.CompletedQuests++;
	NewObjective();
	$("#colonne-m").append("<div id='objective' class='ui black message'><i id='close' class='close icon'></i><div class='header vert'>Objective completed !</div>New objective :<br /> " + GetQuestTitle() + "</div>");
}

function ReasignPoints() {
	p.points += p.spentpoints;
	p.spentpoints = 0;
	p.prestige.multipliers = [0, 0, 0];
	for (var v in vehicules) { if (p.Vehicules[v] == 1) p.Vehicules[v] = 0; }
	VehicleList();
	UpdateUI();
}

function GenStarLabel(Stars) {
	let Class = "Normal";
	if (Stars == 3) Class = "Common";
	if (Stars == 4) Class = "Uncommon";
	if (Stars == 5) Class = "Rare";
	if (Stars == 6) Class = "Epic";
	if (Stars == 7) Class = "Exotic";
	if (Stars == 8) Class = "Divine";
	return "<div class='ui horizontal label " + Class + "'> " + Stars + " <i class='fitted star icon'></i></div>";
}