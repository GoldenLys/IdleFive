var weapons = {
	1: { name: "Brass Knuckles", power: 1, price: 10 },
	2: { name: "Knife", power: 2, price: 100 },
	3: { name: "Baton", power: 10, price: 1000 },
	4: { name: "Bottle", power: 15, price: 3000 },
	5: { name: "Switchblade", power: 20, price: 10000 },
	6: { name: "Antique Dagger", power: 60, price: 50000 },
	7: { name: "Baseball Bat", power: 200, price: 100000 },
	8: { name: "Cue Stick", power: 1000, price: 350000 },
	9: { name: "Golf Club", power: 2000, price: 750000 },
	10: { name: "Hatchet", power: 25000, price: 1250000 },
	11: { name: "Machete", power: 50000, price: 5000000 },
	12: { name: "Wrench", power: 100000, price: 8500000 },
	13: { name: "Stun Gun", power: 100, price: 100000 },
	14: { name: "Flare Gun", power: 2500, price: 950000 },
	15: { name: "SNS Pistol", power: 50000, price: 1250000 },
	16: { name: "SNS Pistol MKII", power: 100000, price: 15000000 },
	17: { name: "Vintage Pistol", power: 150000, price: 25000000 },
	18: { name: "Combat Pistol", power: 200000, price: 35000000 },
	19: { name: "Pistol", power: 250000, price: 50000000 },
	20: { name: "Pistol MKII", power: 500000, price: 100000000 },
	21: { name: "AP Pistol", power: 750000, price: 250000000 },
	22: { name: "Heavy Pistol", power: 1000000, price: 500000000 },
	23: { name: "Pistol .50", power: 5000000, price: 1000000000 },
	24: { name: "Marksman Pistol", power: 10000000, price: 2500000000 },
	25: { name: "Double Action Revolver", power: 20000000, price: 2000000000 },
	26: { name: "Heavy Revolver", power: 50000000, price: 5000000000 },
	27: { name: "Heavy Revolver MKII", power: 100000000, price: 100000000000 },
};

function showWTab(id) {
	hideWTabs();
	$('#Wtab' + id).show();
	$("#W" + id).addClass("active");
}

function hideWTabs() {
	for (var id = 1; id < 10; id++) {
		$('#Wtab' + id).hide();
		$("#W" + id).removeClass('active');
	}
}

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
}

function buyG(id) {
	var arme = weapons[id].name;
	var damage = weapons[id].power;
	var pricebuy = weapons[id].price;
	if (player.GBought[id] == 0) {
		if (player.caps >= pricebuy) {
			player.caps -= pricebuy;
			player.Arme = arme;
			player.ArmePower = damage;
			player.WeaponID = id;
			player.GBought[id] = 1;
			genGun();
		}
	} else {
		if (player.caps >= pricebuy * 10) {
			player.caps -= pricebuy * 10;
			player.Arme = arme;
			player.WeaponID = id;
			player.ArmePower = damage;
			genGun2();
		}
	}
	updatestats();
}

function WeaponList() {
	for (var id = 1; id < 10; id++) { $('#Wtab' + id).html(""); }

	for (var i in weapons) {
		var weapon = weapons[i];
		if (player.GBought[i] == 1) {
			canBuy = weapon.price * 10 > player.caps ? ' rougeb' : ' vert';
			name = "<font class='vert'>" + weapon.name + "</font>";
			cost = "Modification : <font class='" + canBuy + "'>$" + fix(weapon.price * 10, 2) + "</font>";
			damage = "<font class='rougeb'>" + fix(weapon.power, 1) + "</font>";
			buttonText = "Try to modify";
		} else {
			canBuy = weapon.price > player.caps ? ' rougeb' : ' vert';
			name = "<font class='gris'>" + weapon.name + "</font>";
			cost = "Price : <font class='" + canBuy + "'>$" + fix(weapon.price, 2) + "</font>";
			damage = "<font class='gris'>" + fix(weapon.power, 1) + "</font>";
			buttonText = "Buy";
		}

		view = player.GBought[i] > 0 ? '' : ' style="display:none;"';
		view2 = player.GBought[i] > 0 ? 'style="display:none;"' : '';
		canBuy = weapon.price > player.caps ? ' disabled' : '';
		canBuy2 = weapon.price * 10 > player.caps ? ' disabled' : '';
		url = "url('images/" + i + ".png')";

		var weaponsDIV = $(
			"<div class='arme-div arme' id='weap" + i + "'>" +
			"<p class='title blanc'>" + name + "</p><br><br>" +
			"<p class='btexte'>" + cost + "</font></p><br>" +
			"<p class='btexte'>Damage : " + damage + "</font></p><br><br>" +
			"<input type='button' class='btn btn-weapon" + canBuy + "' value='" + buttonText + " this weapon' onClick='buyG(" + i + ");' />" +
			"<input type='button' class='btn btn-weapon" + canBuy2 + "' " + view + " value='Use this weapon' onClick='useW(" + i + ");' />" +
			"<br></div>"
		);
		if (i < 13) { $('#Wtab1').append(weaponsDIV); }
		if (i > 12) { if (i < 28) { $('#Wtab2').append(weaponsDIV); } }
		$('#weap' + i).css('background-image', url);
	}
}