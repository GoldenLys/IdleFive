var version = "v2.0";
var a1 = 0;
var player = {
	DateStarted: getDate(),
	fl: 1,
	rank: 0,
	caps: 0,
	capsps: 0,
	bonuscaps: 1,
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
	GBought: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
		if (player.caps !== player.caps) {
			player.caps = 0;
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
	console.log("Have fun of IdleFive!   - Aizen_");
});

function firstlaunch() {
	if (player.fl == 1) {
		player.fl = 0;
		save();
		showOptionsMenu();
	}
}

function CashPS() {
	player.capsps = 0;
	for (var id = 0; id < 13; id++) {
		if (player.productions[id] > 0) {
			player.capsps += productions[id].value * player.productions[id];
			player.caps += player.capsps * player.bonuscaps;
		}
	}
}

function UseWeapon() {
	player.caps = player.caps + (player.ArmePower * player.GunMult) * (player.bonuscaps + player.bonuspoints);
	updateprogression();
}

function updateprogression() {
	if (player.rank >= player.prestigeprice) {
		btnPrestigeE();
	} else {
		btnPrestigeD();
	}
	if (player.caps < player.prestigeprice2) { btnPrestigeD(); }
	$('#imagecaps').css("background-image", "url(images/" + player.WeaponID + ".png)");
	player.caps = Math.round(player.caps * 100) / 100; //FIX A JS BUG that can make the cash var at 15.9999999999 for example
	getPrestigePrice();
	CashPS();
	checkSucces();
	updatestats();
	firstlaunch();
	save();
}

function AddPrestige() {
	if (player.rank >= player.prestigeprice) {
		if (player.caps >= player.prestigeprice2) {
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
				player.caps = 0;
				player.capsps = 0;
				player.bonuspoints = 0;
				player.productions = [];
				player.points = player.prestige;
				getPrestigePrice();
				updatestats();
				updateprogression();
				location.reload();
			}
		}
	}
}

function getPrestigePrice() {
	player.prestigeprice = player.prestige * 100 + 300;
	player.bonuscaps = 1;
	if (player.prestige > 1) player.bonuscaps = 1 + (player.prestige * 0.25);
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

function hideMenus() {
	var a = document.getElementById('menu-sa');
	var b = document.getElementById('menu-su');
	var c = document.getElementById('menu-op');
	var d = document.getElementById('menu-pr');
	a.style.display = 'none';
	b.style.display = 'none';
	c.style.display = 'none';
	d.style.display = 'none';
}

function showSaveMenu() {
	hideMenus();
	var a = document.getElementById('menu-sa');
	a.style.display = 'block';
}

function showSuccesMenu() {
	hideMenus();
	var b = document.getElementById('menu-su');
	b.style.display = 'block';
}

function showOptionsMenu() {
	hideMenus();
	var c = document.getElementById('menu-op');
	c.style.display = 'block';
}

function showPrestigeMenu() {
	hideMenus();
	var d = document.getElementById('menu-pr');
	d.style.display = 'block';
}

function btnPrestigeD() {
	var b1 = document.getElementById('btnPrestige').classList;
	b1.add("disabled");
}

function btnPrestigeE() {
	var b1 = document.getElementById('btnPrestige').classList;
	b1.remove("disabled");
}

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

function showGunMenu() {
	hideTabs();
	var a = document.getElementById('tab1');
	a.style.display = 'block';
	document.getElementById("t1").classList.add('active');
}
function showProdMenu() {
	hideTabs();
	var a = document.getElementById('tab3');
	a.style.display = 'block';
	document.getElementById("t3").classList.add('active');
}
function showGarageMenu() {
	hideTabs();
	var a = document.getElementById('tab4');
	a.style.display = 'block';
	document.getElementById("t4").classList.add('active');
}

function hideTabs() {
	var a = document.getElementById('tab1');
	var b = document.getElementById('tab4');
	var c = document.getElementById('tab3');
	a.style.display = 'none';
	b.style.display = 'none';
	c.style.display = 'none';
	document.getElementById("t1").classList.remove('active');
	document.getElementById("t4").classList.remove('active');
	document.getElementById("t3").classList.remove('active');
}

function checkalerts() {
	chance = random(1, 30);
	if (player.caps > 100) {
		if (chance >= 28) {
			tax = random(100, (player.caps / 100));
			player.caps -= tax;
			$("#alert").html("<p class='game-text rouge'>A player killed you, he stole <font class='vert'>$" + fix(tax, 3) + " </font>from your pockets !");
		} else {
			$("#alert").html("<p class='game-text'>Nothing to report at the moment.</p>");
		}
	}
}

function clearalerts() {
	$("#alert").html("<p class='game-text'>Nothing to report at the moment.</p>");
}