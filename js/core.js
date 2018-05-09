var version = "v2.1";
var a1 = 0;
var player = {
	DateStarted: getDate(),
	fl: 1,
	rank: 0,
	cash: 0,
	cashps: 0,
	bonuscash: 1,
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
	buyedveh1: 0,
	buyedveh2: 0,
	buyedveh3: 0,
	buyedveh4: 0,
	buyedveh5: 0,
	buyedveh6: 0,
	buyedveh7: 0,
	buyedveh8: 0,
	buyedveh9: 0,
	buyedveh10: 0,
	buyedveh11: 0,
	buyedveh12: 0,
	buyedveh13: 0,
	buyedveh14: 0,
	buyedveh15: 0,
	buyedveh16: 0,
	vehicules: [],
	points: 0,
	bonuspoints: 0,
	playTime: 0,
};

$(document).ready(function () {
	if (localStorage.getItem("IdleFive") != null) {
		load();
	}
	setInterval(function () {
		if (player.cash !== player.cash) {
			player.cash = 0;
		}
		player.playTime++;
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
	player.cashps = 0;
	for (var id = 0; id < 13; id++) {
		if (player.productions[id] > 0) {
			player.cashps += productions[id].value * player.productions[id];
			player.cash += player.cashps * player.bonuscash;
		}
	}
}

function ClickWeapon() {
	player.cash = player.cash + (player.ArmePower * player.GunMult) * (player.bonuscash + player.bonuspoints);
	updateprogression();
}

function updateprogression() {
	if (player.rank >= player.prestigeprice) { btnPrestigeE(); } else { btnPrestigeD(); }
	if (player.cash < player.prestigeprice2) { btnPrestigeD(); }
	player.cash = Math.round(player.cash * 100) / 100; //FIX A JS BUG that can make the cash var at 15.9999999999 for example
	getPrestigePrice();
	getCashPS();
	checkSucces();
	UpdateUI();
	if (player.fl == 1) { player.fl = 0; save(); showOptionsMenu(); }
	save();
}

function AddPrestige() {
	if (player.rank >= player.prestigeprice) {
		if (player.cash >= player.prestigeprice2) {
			var r = confirm("Would you like to sell all of your activities to get a permanent bonus ?");
			if (r == true) {
				player.prestige = player.prestige + 1;
				player.ArmePower = 0.1;
				player.WeaponID = 0;
				player.GunMult = 1;
				player.GunPower = "<font class='blanc'>";
				player.Arme = "Fist";
				player.Rarity = "Normal";
				player.GBought= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				player.rank = 0;
				player.cash = 0;
				player.cashps = 0;
				player.bonuspoints = 0;
				player.productions = [];
				player.points = player.prestige;
				getPrestigePrice();
				UpdateUI();
				updateprogression();
				location.reload();
			}
		}
	}
}

function getPrestigePrice() {
	player.prestigeprice = player.prestige * 100 + 300;
	player.bonuscash = 1;
	if (player.prestige > 1) player.bonuscash = 1 + (player.prestige * 0.25);
	player.prestigeprice2 = player.prestige * 10000000;
	if (player.prestige == 0) {
		player.prestigeprice = 400;
		player.prestigeprice2 = 10000000;
	}
}

function sauvegardeauto() {
	save();
}
setTimeout(sauvegardeauto, 600000);


function getRank() {
	if (player.rank == 0) { prank = "<font class='bronze'> Bronze &#x2729;</font>"; }
	if (player.rank > 0) { prank = "<font class='bronze'> Bronze &#x2729; &#x2729;</font>"; }
	if (player.rank > 4) { prank = "<font class='bronze'> Bronze &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 14) { prank = "<font class='bronze'>Bronze &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 29) { prank = "<font class='bronze'>Bronze &#x2729; &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 49) { prank = "<font class='bronze'>Bronze &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; </font>"; }
	if (player.rank > 99) { prank = "<font class='argent'>Silver &#x2729;</font>"; }
	if (player.rank > 199) { prank = "<font class='argent'>Silver &#x2729; &#x2729;</font>"; }
	if (player.rank > 299) { prank = "<font class='argent'>Silver &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 399) { prank = "<font class='argent'>Silver &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 499) { prank = "<font class='argent'>Silver &#x2729; &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 599) { prank = "<font class='argent'>Silver &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 699) { prank = "<font class='or'>Gold &#x2729;</font>"; }
	if (player.rank > 799) { prank = "<font class='or'>Gold &#x2729; &#x2729;</font>"; }
	if (player.rank > 899) { prank = "<font class='or'>Gold &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 999) { prank = "<font class='or'>Gold &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 1099) { prank = "<font class='or'>Gold &#x2729; &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	if (player.rank > 2199) { prank = "<font class='platine'>Platinum &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; &#x2729;</font>"; }
	return prank;
}

function getPrestigeLevel() {
	if (player.prestigeprice > 399) { pprestige = "<font class='argent'>Silver &#x2729; &#x2729; &#x2729; &#x2729; (400)</p>"; }
	if (player.prestigeprice > 499) { pprestige = "<font class='argent'>Silver &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; (500)</p>"; }
	if (player.prestigeprice > 599) { pprestige = "<font class='argent'>Silver &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; (600)</p>"; }
	if (player.prestigeprice > 699) { pprestige = "<font class='or'>Gold &#x2729; (700)</p>"; }
	if (player.prestigeprice > 799) { pprestige = "<font class='or'>Gold &#x2729; &#x2729; (800)</p>"; }
	if (player.prestigeprice > 899) { pprestige = "<font class='or'>Gold &#x2729; &#x2729; &#x2729; (900)</p>"; }
	if (player.prestigeprice > 999) { pprestige = "<font class='or'>Gold &#x2729; &#x2729; &#x2729; &#x2729; (1000)</p>"; }
	if (player.prestigeprice > 1099) { pprestige = "<font class='or'>Gold &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; (11000)</p>"; }
	if (player.prestigeprice > 2199) { pprestige = "<font class='platine'>Platinum &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; &#x2729; (" + player.prestigeprice + ")</p>"; }
	return pprestige;
}

function checkalerts() {
	chance = random(1, 30);
	if (player.cash > 100) {
		if (chance >= 28) {
			tax = random(100, (player.cash / 100));
			player.cash -= tax;
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
	if (vehicules[id].price <= player.points) {
	  if (player.vehicules[id] == null) {
	  player.vehicules[id] = 1; player.points -= vehicules[id].price;
	  } else { if (player.vehicules[id] != 1) player.vehicules[id] = 1; player.points -= vehicules[id].price; }
	  player.buyedveh1++;
	  player.bonuspoints += vehicules[id].value;
	}
	VehicleList();
  };

  function genGun() {
	quality = random(1, 400);
	if (quality >= 1) { setRarity("Very Used","<font class='bronze'>",0.25); }
	if (quality >= 50) { setRarity("Used","<font class='gris'>",0.5); }
	if (quality >= 120) { setRarity("Normal","<font class='normal'>",1); }
	if (quality >= 220) { setRarity("Rare","<font class='rare'>",1.25); }
	if (quality >= 350) { setRarity("Epic","<font class='or'>",1.5); }
	if (quality >= 380) { setRarity("Legendary","<font class='rougeb'>",1.75); }
	if (quality >= 395) { setRarity("Mythic","<font class='mythic'>",2); }
}

function genGun2() {
	quality = random(1, 200);
	if (quality >= 1) { setRarity("Normal","<font class='normal'>",1); }
	if (quality >= 80) { setRarity("Rare","<font class='rare'>",1.25); }
	if (quality >= 150) { setRarity("Epic","<font class='or'>",1.5); }
	if (quality >= 180) { setRarity("Legendary","<font class='rougeb'>",1.75); }
	if (quality >= 195) { setRarity("Mythic","<font class='mythic'>",2); }
}

function setRarity(Type, Class, Mult) {
	player.Rarity = Type;
	player.GunPower = Class;
	player.GunMult = Mult;
}

function useW(id) {
	var weapon = weapons[id];
	if (player.GBought[id] == 1) {
		player.Rarity = "Normal";
		player.GunPower = "<font class='normal'>";
		player.GunMult = 1;
		player.Arme = weapon.name;
		player.WeaponID = id;
		player.ArmePower = weapon.power;
	}
	WeaponList();
}

function buyG(id) {
	var arme = weapons[id].name;
	var damage = weapons[id].power;
	var pricebuy = weapons[id].price;
	if (player.GBought[id] == 0) {
		if (player.cash >= pricebuy) {
			player.cash -= pricebuy;
			player.Arme = arme;
			player.ArmePower = damage;
			player.WeaponID = id;
			player.GBought[id] = 1;
			genGun();
		}
	} else {
		if (player.cash >= pricebuy * 10) {
			player.cash -= pricebuy * 10;
			player.Arme = arme;
			player.WeaponID = id;
			player.ArmePower = damage;
			genGun2();
		}
	}
	WeaponList();
}

function BuyM(id, qty) {
	var price = GetMissionPrice(id, qty);
	if (price <= player.cash) {
	  player.cash -= price;
	  if (player.productions[id] == null) {
		player.productions[id] = qty;
	  } else {
		player.productions[id] += qty;
		player.rank += qty;
	  }
	  MissionList();
	}
  }
  
  function SellM(id, qty) {
	var price = GetMissionPrice(id, qty) / 8;
	if (player.productions[id] == null) player.productions[id] = 0;
	player.cash += price;
	if (player.productions[id] >= qty) {
	  player.productions[id] -= qty;
	  player.rank -= qty;
	} else {
	  player.productions[id] = null;
	}
	MissionList();
  }
  
  var GetMissionPrice = function (id, qty) {
	var owned = 0;
	if (player.productions[id] != null) owned = player.productions[id];
	var price = (qty * productions[id].price) * Math.pow(productions[id].pricemodifier, owned);
	return price;
  };
  