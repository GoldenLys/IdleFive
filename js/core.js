const version = "v5.8";
var notify_time = 0;
const DEFAULT = {
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
	tutorial: 0,
	stats: {
		spentpoints: 0,
		totalplaytime: 0,
		completedquests: 0,
		totalclicks: 0,
		totalweaponsbought: 0,
		totalweaponrerolled: 0,
		highestrank: 0,
		totalspentcash: 0,
		totalcash: 0,
		character_totalspentcash: 0,
		character_totalcash: 0,
	}
};

var p = DEFAULT; 

$(document).ready(function () {
	if (localStorage.getItem("idleFive5") != null) load();
	setInterval(function () {
		idleFiveLoop();
	}, 1000);
	save();
	UpdateTexts();
	ClickEvents();
	SuccessCount();
	getPrestigePrice();
	MissionList();
	WeaponList();
	idleFiveLoop();
	showTutorial(p.tutorial);
	$('.ui.sidebar').sidebar('hide');
});

function idleFiveLoop() {
	//DEBUG
	
	if (p.stats.totalcash < 0) p.stats.totalcash = 0;
	if (p.stats.totalspentcash < 0) p.stats.totalspentcash = 0;
	if (p.stats.character_totalcash < 0) p.stats.character_totalcash = 0;
	if (p.stats.character_totalspentcash < 0) p.stats.character_totalspentcash = 0;
	if (p.cash !== p.cash) p.cash = 0;
	p.cash = truncate2(p.cash);
	if (p.stats.character_totalcash < p.cash) p.cash = p.stats.character_totalcash - p.stats.character_totalspentcash;
	for (var stat in p.stats) {
		if (p.stats[stat] !== p.stats[stat]) p.stats[stat] = 0;
		if (p.stats[stat] < 0) p.stats[stat] = 0;
	}
	for (var m in missions) {
		if (p.missions[m] == null) p.missions[m] = 0;
	}
	for (var w in weapons) {
		if (p.WeaponBought[w] == null) p.WeaponBought[w] = 0;
		if (p.Stars[w] == null) p.Stars[w] = 0;
	}
	for (var s in success)
		if (p.succes[s] == null) p.succes[s] = 0;
	for (var wtype = 0; wtype < 9; wtype++)
		if (p.WeaponType[wtype] == null) p.WeaponType[wtype] = 0;

	//UPDATE VARS
	p.stats.totalplaytime++;
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
	if (p.quest.type === 3 && _.min(p.Stars.slice(1)) === 10) NewObjective();
	if (p.rank >= p.prestige.price[0]) {
		if (p.cash >= p.prestige.price[1]) btnPrestigeE();
		else btnPrestigeD();
	} else btnPrestigeD();
	p.cash += getCashPS();
	p.stats.totalcash += getCashPS();
	p.stats.character_totalcash += getCashPS();
	if (p.fl == 1) showTutorialDIV();
	if (notify_time > 0) notify_time--;
	else $("#announce").hide();
	if (p.quest.progression == undefined) p.quest.progression = 0;
	p.points = Math.round(p.points * 100) / 100;
	UpdateUI();
	UpdateTabs();
}

function getCashPS() {
	let CASHPERSECOND = 0;
	for (var m in missions) {
		if (p.missions[m] > 0) {
			CASHPERSECOND += (missions[m].value * p.missions[m]) * (p.prestige.bonus + (p.prestige.multipliers[0] * 0.1));
		}
	}
	return CASHPERSECOND;
}

function ClickWeapon() {
	let CASH_PER_CLICK = p.Weapon.Power * (GetWeaponMult(p.Weapon.Id) + ((p.prestige.bonus + p.prestige.multipliers[1]) * 0.1) - 0.1);
	p.cash += CASH_PER_CLICK;
	p.stats.totalcash += CASH_PER_CLICK;
	p.stats.character_totalcash += CASH_PER_CLICK;
	p.stats.totalclicks++;
	if (p.quest.type == 0) {
		if (p.quest.progression == undefined || isNaN(p.quest.objective[0]) || isNaN(p.quest.objective[1])) {
			p.quest.progression = 0;
			p.quest.objective = [10, 0];
		}
		p.quest.objective[0]--;
		if (p.quest.objective[0] <= 0) getRewards();
	}
	UpdateUI();
	save();
}

function AddPrestige() {
	if (p.rank >= p.prestige.price[0]) {
		if (p.cash >= p.prestige.price[1]) {
			var r = confirm("Would you like to reset your character to get some bonuses ?");
			if (r == true) {
				p.points = Math.trunc(p.rank / 200);
				p.Weapon.Power = 0.5;
				p.Weapon.Id = 0;
				p.Weapon.Class = "Normal";
				p.WeaponBought = [];
				p.WeaponType = [];
				p.rank = 0;
				p.cash = 0;;
				p.missions = [];
				p.prestige.level++;
				p.quest.type = 0;
				p.quest.reward = 1;
				p.quest.progression = 0;
				p.quest.objective = [10, 0];
				p.stats.character_totalspentcash = 0;
				p.stats.character_totalcash = 0;
				UpdateUI();
				SuccessCount();
				hideMenus();
				getPrestigePrice();
				idleFiveLoop();
				save();
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
	return "<span class='ui content " + Class + "'>" + fix(rankNBR, 3) + "</span>";
}

function buyG(id) {
	let COST = weapons[id].price;

	if (p.WeaponBought[id] == 1 && p.Stars[id] === 10) return;
	if (p.cash >= COST) {
		p.Weapon.Id = id;
		p.Weapon.Power = weapons[id].power;
		if (p.WeaponBought[id] == 0) {
			p.cash -= COST;
			p.WeaponBought[id] = 1;
			genGun(id);
			p.WeaponType[weapons[id].type]++;
			p.stats.totalweaponsbought++;
			p.stats.totalspentcash += COST;
			p.stats.character_totalspentcash += COST;
		} else if (p.cash >= COST * 1.25) {
			p.cash -= COST * 1.25;
			genGun2(id);
			p.stats.totalweaponrerolled++;
			p.stats.totalspentcash += COST * 1.25;
			p.stats.character_totalspentcash += COST * 1.25;
		}
	}
	if (p.quest.type === 3 && p.quest.progression >= p.quest.objective[0]) getRewards();
	SuccessCount();
	UpdateUI();
	UpdateTexts();
	save();
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
	let quality = _.random(1, 1017); // 3-10 Stars
	// 3: 40%  = 1–400
	// 4: 30%  = 401–700
	// 5: 15%  = 701–850
	// 6: 10%  = 851–950
	// 7: 5%   = 951–1000
	// 8: 1%   = 1001–1010 
	// 9: .5%% = 1011–1015
	// 10: .2% = 1016–1017

	let qualityMap = [
		{ min: 1, max: 400, quality: 3 },
		{ min: 401, max: 700, quality: 4 },
		{ min: 701, max: 850, quality: 5 },
		{ min: 851, max: 950, quality: 6 },
		{ min: 951, max: 1000, quality: 7 },
		{ min: 1001, max: 1010, quality: 8 },
		{ min: 1011, max: 1015, quality: 9 },
		{ min: 1016, max: 1017, quality: 10 },
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
	notify_time = seconds;
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

	// REAL SHIT
	if (Stars == 8) p.Weapon.Class = "Divine";
	if (Stars == 9) p.Weapon.Class = "Universal";
	if (Stars == 10) p.Weapon.Class = "Dimensional";

	if (Stars > p.Stars[p.Weapon.Id]) p.Stars[p.Weapon.Id] = Stars;
}

function GetWeaponMult(weaponId) {
	let MULTIPLIER = 1;
	if (p.Stars[weaponId] == 1) MULTIPLIER = 0.5;
	if (p.Stars[weaponId] == 2) MULTIPLIER = 0.75;
	if (p.Stars[weaponId] == 3) MULTIPLIER = 1;
	if (p.Stars[weaponId] == 4) MULTIPLIER = 1.25;
	if (p.Stars[weaponId] == 5) MULTIPLIER = 1.5;
	if (p.Stars[weaponId] == 6) MULTIPLIER = 1.75;
	if (p.Stars[weaponId] == 7) MULTIPLIER = 2;

	// REAL SHIT
	if (p.Stars[weaponId] == 8) MULTIPLIER = 3;
	if (p.Stars[weaponId] == 9) MULTIPLIER = 5;
	if (p.Stars[weaponId] == 10) MULTIPLIER = 10;
	return MULTIPLIER;
}

function useW(id) {
	if (p.WeaponBought[id] == 1 && p.Weapon.Id != id) {
		p.Weapon.Id = id;
		p.Weapon.Power = weapons[id].power;
		setQuality(p.Stars[p.Weapon.Id]);
	}
	UpdateUI();
	save();
}

function BuyM(id, qty) {
	let price = GetMissionPrice(id, qty);

	if (price <= p.cash) {
		p.cash -= price;
		p.stats.totalspentcash += price;
		p.stats.character_totalspentcash += price;
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
		if (p.rank > p.stats.highestrank) p.stats.highestrank = p.rank;
		SuccessCount();
		UpdateMissionsDiv(id);
		save();
	}
}

function SellM(id, qty) {
	let price = GetMissionSellPrice(id, qty);
	if (p.missions[id] == null) p.missions[id] = 0;
	p.cash += price;
	p.stats.totalspentcash -= price;
	p.stats.character_totalspentcash -= price;
	if (p.missions[id] >= qty) {
		p.missions[id] -= qty;
		p.rank -= qty;
	}
	if (p.quest.type == 1 && id == p.quest.objective[1]) p.quest.progression -= qty;
	SuccessCount();
	UpdateMissionsDiv(id);
	save();
}

function GetMissionPrice(id, qty) {
    const owned = p.missions[id] || 0;
    const base = new BigNumber(missions[id].price);
    const modifier = new BigNumber(GetMissionPriceModifier());

    if (modifier.eq(1)) {
        return base.times(qty).toNumber();
    }

    const start = modifier.pow(owned);
    const factor = modifier.pow(qty).minus(1).div(modifier.minus(1));

    return base.times(start).times(factor).toNumber();
}

function GetMissionPriceModifier() {
	let amount = p.rank;
	Mapping = {
		1: 1.15,
		1000: 1.10,
		10000: 1.05,
		25000: 1.025,
		50000: 1.010,
		75000: 1.005,
		100000: 1.001,
		250000: 1
	};
	return Mapping[Object.keys(Mapping).reverse().find(key => amount >= key)] || 1.15;
}

function GetMissionSellPrice(id, qty) {
    const owned = p.missions[id] || 0;
    const base = new BigNumber(missions[id].price);
    const modifier = new BigNumber(GetMissionPriceModifier());

    const start = modifier.pow(owned - qty);
    const factor = modifier.pow(qty).minus(1).div(modifier.minus(1));

    return base.times(start).times(factor).toNumber();
}

function buyV(id) {
	let price = GetMultPrice(id);

	if (p.points >= price) {
		p.points -= price;
		p.stats.spentpoints += price;
		p.prestige.multipliers[vehicules[id].type]++;
	}
	VehicleList();
	UpdateUI();
	save();
}

function GetQuestTitle() {
	let TYPE = p.quest.type;
	let MESSAGE = "";

	if (TYPE === 0) MESSAGE = "Use your weapon <span class='jaune'>" + p.quest.objective[0] + "</span> times";
	if (TYPE === 1) MESSAGE = "Increase <span class='jaune'>" + missions[p.quest.objective[1]].name + "</span> by <span class='jaune'>" + (p.quest.objective[0] - p.quest.progression) + "</span> levels";
	if (TYPE === 2) MESSAGE = "Reach the rank " + getRank(p.quest.objective[0]);
	if (TYPE === 3) MESSAGE = "Buy a weapon with " + p.quest.objective[1] + " or more";
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
	QUEST.objective[1] = null;
	QUEST.type = _.random(0, 3);
	if (QUEST.type === 1 && filter.length === 0) QUEST.type = 0;
	if (QUEST.type === 3 && _.min(p.Stars.slice(1) === 10)) QUEST.type = 0;

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
		if (QUEST.objective[1] == null) QUEST.objective[1] = 0;
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
	save();
}

function getRewards() {
	p.points += p.quest.reward + (p.quest.reward * (p.prestige.multipliers[2] * 0.1));
	p.stats.completedquests++;
	NewObjective();
}

function ReasignPoints() {
	p.points += p.stats.spentpoints;
	p.stats.spentpoints = 0;
	p.prestige.multipliers = [0, 0, 0];
	VehicleList();
	UpdateUI();
	save();
}

function GenStarLabel(Stars) {
	let Class = "Normal";

	if (Stars == 3) Class = "Common";
	if (Stars == 4) Class = "Uncommon";
	if (Stars == 5) Class = "Rare";
	if (Stars == 6) Class = "Epic";
	if (Stars == 7) Class = "Exotic";
	if (Stars == 8) Class = "Divine";
	if (Stars == 9) Class = "Universal";
	if (Stars == 10) Class = "Dimensional";
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
	if (Stars == 9) QUALITY = "Universal";
	if (Stars == 10) QUALITY = "Dimensional";
	return QUALITY;
}