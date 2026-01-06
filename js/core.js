const version = "v5.44";
var alert = 0;
var CASHPS = 0;
var WEAPON_MULTIPLIER = 0;
var p = {
	//DEFAULT VARS
	DateStarted: getDate(),
	fl: 1,
	//GAME VARS
	rank: 0,
	cash: 0,
	Weapon: {
		Id: 0,
		Class: "Common",
		Power: 0.5,
	},
	Stars: [3],
	prestige: {
		level: 1,
		bonus: 1,
		price: [0, 0],
		multipliers: [0, 0, 0], //Cash - Damage - Stealth
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
	if (localStorage.getItem("idleFive4") != null) {
		load();
	}
	setInterval(function () {
		idleFiveLoop();
	}, 1000);
	save();
	UpdateTexts();
	ClickEvents();
	SuccessCount();
	getCashPS();
	getPrestigePrice();
	MissionList();
	WeaponList();
	idleFiveLoop();
	showTutorial(p.tutorial);
	WEAPON_MULTIPLIER = GetWeaponMult(p.Weapon.Id);
	$('.ui.sidebar').sidebar('hide');
});

function idleFiveLoop() {
	//DEBUG
	if (p.cash !== p.cash) p.cash = 0;
	p.cash = Math.round(p.cash * 100) / 100;
	for (var m in missions) {
		if (p.missions[m] == null) p.missions[m] = 0;
	}
	for (var w in weapons) {
		if (p.WeaponBought[w] == null) p.WeaponBought[w] = 0;
		if (p.Stars[w] == null) p.Stars[w] = 0;
	}
	for (var s in success)
		if (p.succes[s] == null) p.succes[s] = 0;
	for (var wtype = 0; wtype < 8; wtype++)
		if (p.WeaponType[wtype] == null) p.WeaponType[wtype] = 0;

	//UPDATE VARS
	p.playTime++;
	if (p.prestige.level > 1) p.prestige.bonus = 1 + (p.prestige.level * 0.1) - 0.1;
	let rank = 0;
	for (var i in p.missions) {
		if (p.missions[i] == null) {
			p.missions[i] = 0;
		}
		rank += p.missions[i];
	} // CALCULATE THE RANK
	p.rank = rank;
	if (p.quest.type == 2 && p.rank >= p.quest.objective[0]) getRewards();
	if (p.quest.type == 1 && p.quest.progression >= p.quest.objective[0]) getRewards();
	if (p.rank >= p.prestige.price[0]) {
		if (p.cash >= p.prestige.price[1]) btnPrestigeE();
		else btnPrestigeD();
	} else btnPrestigeD();
	p.cash += CASHPS;
	if (p.fl == 1) showTutorialDIV();
	if (alert > 0) alert--;
	else $("#announce").hide();
	if (p.quest.progression == undefined) p.quest.progression = 0;
	p.points = Math.round(p.points * 100) / 100;
	UpdateUI();
	save();
}

function getCashPS() {
	CASHPS = 0;
	for (var m in missions) {
		if (p.missions[m] > 0) {
			CASHPS += (missions[m].value * p.missions[m]) * (p.prestige.bonus + (p.prestige.multipliers[0] * 0.1));
		}
	}
}

function ClickWeapon() {
	p.cash += p.Weapon.Power * (WEAPON_MULTIPLIER + ((p.prestige.bonus + p.prestige.multipliers[1]) * 0.1) - 0.1);
	p.TotalClicks++;
	if (p.quest.type == 0) {
		if (p.quest.progression == undefined || isNaN(p.quest.objective[0]) || isNaN(p.quest.objective[1])) {
			p.quest.progression = 0;
			p.quest.objective = [10, 0];
		}
		p.quest.objective[0]--;
		if (p.quest.objective[0] <= 0) getRewards();
	}
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
				WEAPON_MULTIPLIER = 1;
				p.Weapon.Class = "Normal";
				p.WeaponBought = [];
				p.WeaponType = [];
				p.rank = 0;
				p.cash = 0;
				CASHPS = 0;
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
	for (var Plevel = 1; Plevel < p.prestige.level; Plevel++) {
		price += (p.prestige.level * 1e9) * 0.3;
	}
	p.prestige.price[1] = price;
}

function getRank(rankNBR) {
	let Class = "";

	if (rankNBR >= 0) Class = "Bronze";
	if (rankNBR >= 210) Class = "Silver"; // x10 each
	if (rankNBR >= 525) Class = "Silver"; // x25 each
	if (rankNBR >= 1050) Class = "Gold"; // x50 each
	if (rankNBR >= 2100) Class = "Platinum"; // x100 each
	if (rankNBR >= 27000) Class = "Heavenly"; // x1000 each
	return "<font class='" + Class + "'>" + rankNBR + "</font>";
}

function buyG(id) {
	let COST = weapons[id].price;

	if (p.cash >= COST) {
		p.Weapon.Id = id;
		p.Weapon.Power = weapons[id].power;
		if (p.WeaponBought[id] == 0) {
			p.cash -= COST;
			p.WeaponBought[id] = 1;
			genGun(id);
			p.WeaponType[weapons[id].type]++;
		} else if (p.cash >= COST * 1.25) {
			p.cash -= COST * 1.25;
			genGun2(id);
		}
	}
	if (p.quest.type === 3 && p.quest.progression >= p.quest.objective[0]) getRewards();
	WEAPON_MULTIPLIER = GetWeaponMult(p.Weapon.Id);
	SuccessCount();
	UpdateUI();
	UpdateTexts();
}

function genGun() {
	let quality = random(1, 250);

	if (quality >= 1) {
		setQuality(1);
		ALERT("Bought a " + GenStarLabel(1) + " " + weapons[p.Weapon.Id].name, 3);
		if (p.quest.type === 3) p.quest.progression = 1;
	}
	if (quality >= 50) {
		setQuality(2);
		ALERT("Bought a " + GenStarLabel(2) + " " + weapons[p.Weapon.Id].name, 3);
		if (p.quest.type === 3) p.quest.progression = 2;
	}
	if (quality >= 150) {
		setQuality(3);
		ALERT("Bought a " + GenStarLabel(3) + " " + weapons[p.Weapon.Id].name, 3);
		if (p.quest.type === 3) p.quest.progression = 3;
	}
}

function genGun2() {
	let quality = _.random(1, 1010); // 3-8 Stars
// 3: 40% = 1–400
// 4: 30% = 401–700
// 5: 15% = 701–850
// 6: 10% = 851–950
// 7: 5%  = 951–1000
// 8: 1%  = 1001–1010 

	let qualityMap = [
		{ min: 1, max: 400, quality: 3 },
		{ min: 401, max: 700, quality: 4 },
		{ min: 701, max: 850, quality: 5 },
		{ min: 851, max: 950, quality: 6 },
		{ min: 951, max: 1000, quality: 7 },
		{ min: 1001, max: 1010, quality: 8 },
	];

	for (let i = 0; i < qualityMap.length; i++) {
		if (quality >= qualityMap[i].min && quality <= qualityMap[i].max) {
			setQuality(qualityMap[i].quality);
			ALERT("Rolled a " + GenStarLabel(qualityMap[i].quality) + " " + weapons[p.Weapon.Id].name, 3);
			if (p.quest.type === 3) p.quest.progression = qualityMap[i].quality;
			break;
		}
	}
}

function ALERT(text, seconds) {
	$("#announce-text").html(text);
	$("#announce").show();
	alert = seconds;
}

function setQuality(Stars) {
	if (p.Stars[p.Weapon.Id] != 0)
		if (p.Stars[p.Weapon.Id] > Stars) Stars = p.Stars[p.Weapon.Id];

	if (Stars == 1) p.Weapon.Class = "Normal";
	if (Stars == 2) p.Weapon.Class = "Normal";
	if (Stars == 3) p.Weapon.Class = "Common";
	if (Stars == 4) p.Weapon.Class = "Uncommon";
	if (Stars == 5) p.Weapon.Class = "Rare";
	if (Stars == 6) p.Weapon.Class = "Epic";
	if (Stars == 7) p.Weapon.Class = "Exotic";
	if (Stars == 8) p.Weapon.Class = "Divine";

	if (Stars > p.Stars[p.Weapon.Id]) p.Stars[p.Weapon.Id] = Stars;
}

function GetWeaponMult(weaponId) {
	let MULTIPLIER = 0;

	if (p.Stars[weaponId] == 1) MULTIPLIER = 0.5;
	if (p.Stars[weaponId] == 2) MULTIPLIER = 0.75;
	if (p.Stars[weaponId] == 3) MULTIPLIER = 1;
	if (p.Stars[weaponId] == 4) MULTIPLIER = 1.25;
	if (p.Stars[weaponId] == 5) MULTIPLIER = 1.5;
	if (p.Stars[weaponId] == 6) MULTIPLIER = 1.75;
	if (p.Stars[weaponId] == 7) MULTIPLIER = 2;
	if (p.Stars[weaponId] == 8) MULTIPLIER = 3;
	return MULTIPLIER;
}

function useW(id) {
	if (p.WeaponBought[id] == 1 && p.Weapon.Id != id) {
		p.Weapon.Id = id;
		WEAPON_MULTIPLIER = GetWeaponMult();
		p.Weapon.Power = weapons[id].power;
		setQuality(p.Stars[p.Weapon.Id]);
	}
	UpdateUI();
}

function BuyM(id, qty) {
	let price = GetMissionPrice(id, qty);

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
	let price = GetMissionSPrice(id, qty);

	if (p.missions[id] == null) p.missions[id] = 0;
	p.cash += price;
	if (p.missions[id] >= qty) {
		p.missions[id] -= qty;
		p.rank -= qty;
	} else {
		p.missions[id] = null;
	}
	if (p.quest.type == 1 && id == p.quest.objective[1]) p.quest.progression -= qty;
	SuccessCount();
	getCashPS();
	UpdateUI();
}

function GetMissionPrice(id, qty) {
	let owned = 0;
	let total = 0;

	if (p.missions[id] != null) owned = p.missions[id];
	CurPrice = (missions[id].price * Math.pow(GetModifierByAmount(owned), owned));
	for (var value = 0; value < qty; value++) {
		Newprice = (missions[id].price * Math.pow(GetModifierByAmount(owned), owned + value));
		total += Newprice;
	}
	return Math.round((total * 100) / 100);
}

function GetModifierByAmount(amount) {
	Mapping = {
		1: 1.05,
		100: 1.025,
		1000: 1.01,
		10000: 1.005
	};
	return Mapping[Object.keys(Mapping).reverse().find(key => amount >= key)] || 1.05;
}

function GetMissionSPrice(id, qty) {
	let owned = 0;
	let total = 0;

	if (p.missions[id] != null) owned = p.missions[id];
	for (var value = 0; value < qty; value++) {
		Newprice = (missions[id].price * Math.pow(missions[id].modifier, owned - value));
		total += Newprice;
	}
	return Math.round(total / 2);
}

function buyV(id) {
	let price = GetMultPrice(id);

	if (p.points >= price) {
		p.points -= price;
		p.spentpoints += price;
		p.prestige.multipliers[vehicules[id].type]++;
	}
	VehicleList();
	getCashPS();
	UpdateUI();
}

function GetQuestTitle() {
	let TYPE = p.quest.type;
	let MESSAGE = "";

	if (TYPE === 0) MESSAGE = "Use your weapon <span class='jaune'>" + p.quest.objective[0] + "</span> times";
	if (TYPE === 1) MESSAGE = "Increase <span class='jaune'>" + missions[p.quest.objective[1]].name + "</span> by <span class='jaune'>" + (p.quest.objective[0] - p.quest.progression) + "</span> levels";
	if (TYPE === 2) MESSAGE = "Reach the rank " + getRank(p.quest.objective[0]);
	if (TYPE === 3) MESSAGE = "Obtain a new weapon with " + p.quest.objective[1] + " or more";
	return MESSAGE;
}

function getQuestType(id) {
	let map = {
		0: "Use Weapon",
		1: "Increase Mission",
		2: "Reach Rank",
		3: "New Weapon",
	};
	return map[id];
}

function ListMissionsBought() {
	let filtered = [];

	for (let M in missions) {
		if (p.missions[M] > 0) filtered.push(Number(M));
	}
	return filtered;
}

function NewObjective() {
	let QUEST = {
		type: 0,
		reward: 1,
		progression: 0,
		objective: [0, 0],
	};
	let filter = ListMissionsBought();
	let chance = _.random(0, 100);
	let maxStars = 0;
	QUEST.objective[1] = null;
	for (let star in p.Stars) {
		if (p.Stars[star] < 8) maxStars = 1;
	}
	QUEST.type = _.random(0, 3);
	if (maxStars === 0) type = _.random(0, 2);

	const rewardMap = [
		{ min: 0, max: 9, reward: 0.05 },
		{ min: 10, max: 29, reward: 0.1 },
		{ min: 30, max: 49, reward: 0.25 },
		{ min: 50, max: 79, reward: 0.5 },
		{ min: 80, max: 94, reward: 1.0 },
		{ min: 95, max: 98, reward: 1.5 },
		{ min: 99, max: 100, reward: 2.5 },
	];

	const goal_main_Map = [
		{ chance: 10, objective: [1, 10] },
		{ chance: 30, objective: [10, 30] },
		{ chance: 60, objective: [50, 100] },
		{ chance: 80, objective: [100, 300] },
		{ chance: 95, objective: [300, 500] },
		{ chance: 99, objective: [500, 1000] },
	];

	const goal_mission_Map = [
		{ chance: 10, objective: [1, 5] },
		{ chance: 30, objective: [5, 10] },
		{ chance: 60, objective: [10, 25] },
		{ chance: 80, objective: [25, 50] },
		{ chance: 95, objective: [50, 80] },
		{ chance: 99, objective: [80, 10] },
	];

	let selectedReward = rewardMap.find(r => chance >= r.min && chance <= r.max);

	let selectedObjective = goal_main_Map.find(o => chance < o.chance);
	// USE X TIMES WEAPON 
	if (QUEST.type === 0) {
		QUEST.progression = 0;
		QUEST.objective[0] = _.random(selectedObjective.objective[0], selectedObjective.objective[1]);
		QUEST.reward = selectedReward.reward;
	}

	// INCREASE X TIMES MISSION
	if (QUEST.type === 1) {
		let selectedObjective2 = goal_mission_Map.find(o => chance < o.chance);
		let objective = filter[Math.floor(Math.random() * filter.length)];

		QUEST.objective = [p.missions[objective], objective];
		QUEST.objective[0] = _.random(selectedObjective2.objective[0], selectedObjective2.objective[1]);
		QUEST.reward = selectedReward.reward;
	}
	// REACH RANK X
	if (QUEST.type === 2) {
		QUEST.objective[0] = p.rank + _.random(selectedObjective.objective[0], selectedObjective.objective[1]);
		QUEST.progression = p.rank;
		QUEST.reward = selectedReward.reward;
	}

	// BUY WEAPON WITH X STARS
	if (QUEST.type === 3) {
		let lowest = _.min(p.Stars.slice(1));

		const minStarChanceMap = [
			{ star: 1, minChance: 0 },
			{ star: 2, minChance: 0 },
			{ star: 3, minChance: 0 },
			{ star: 4, minChance: 30 },
			{ star: 5, minChance: 60 },
			{ star: 6, minChance: 80 },
			{ star: 7, minChance: 95 },
			{ star: 8, minChance: 99 },
		];
		
		if (lowest >= 4 && chance < 30) chance = 30;
		if (lowest >= 5 && chance < 60) chance = 60;
		if (lowest >= 6 && chance < 80) chance = 80;
		if (lowest >= 7 && chance < 95) chance = 95;
		if (lowest >= 8) chance = 100;

		for (let i = minStarChanceMap.length - 1; i >= 0; i--) {
			if (chance >= minStarChanceMap[i].minChance) {
				QUEST.objective[0] = minStarChanceMap[i].star;
				QUEST.objective[1] = GenStarLabel(minStarChanceMap[i].star);
				break;
			}
		}

		QUEST.reward = selectedReward.reward;
		QUEST.progression = 0;
	}
	p.quest = QUEST;
	//console.log("Type: " + getQuestType(QUEST.type) + " | Objective: " + QUEST.objective[1]);
	//console.log("Reward: " + QUEST.reward + " CP" + " | Chance: " + chance + "%");
}

function getRewards() {
	p.points += p.quest.reward + (p.quest.reward * (p.prestige.multipliers[2] * 0.1));
	p.CompletedQuests++;
	NewObjective();
}

function ReasignPoints() {
	p.points += p.spentpoints;
	p.spentpoints = 0;
	p.prestige.multipliers = [0, 0, 0];
	VehicleList();
	getCashPS();
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
	if (Stars != 0) return "<div class='ui horizontal label " + Class + "'> " + Stars + " <i class='fitted star icon'></i></div>";
	else return "";
}

function getQuality(Stars) {
	let QUALITY = "Normal";
	if (Stars <= 2) QUALITY = "Normal";
	if (Stars == 3) QUALITY = "Common";
	if (Stars == 4) QUALITY = "Uncommon";
	if (Stars == 5) QUALITY = "Rare";
	if (Stars == 6) QUALITY = "Epic";
	if (Stars == 7) QUALITY = "Exotic";
	if (Stars == 8) QUALITY = "Divine";
	return QUALITY;

}