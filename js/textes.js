var updatestats = function () {
	year = player.prestige;
	pcliccaps = fix((player.ArmePower * player.GunMult) * (player.bonuscaps + player.bonuspoints), 2);
	pscaps = fix(player.capsps * player.bonuscaps, 2);
	pprestigeprice = getPrestigeLevel();
	pprestigeprice2 = fix(player.prestigeprice2, 2);
	pbonuscaps = fix(player.bonuscaps, 2);
	pcaps = fix(player.caps, 2);
    prestigeText = "";
	if(player.prestigeprice<=player.rank) { if(player.prestigeprice2<=player.caps) { prestigeText = "<br>A new character slot is available."; }}
	points = "";
	if(player.points>0) { points = "You have <font class='jaune'> " + player.points + " CP</font>."; }
	$("#prestigepoints").html(player.points + "(+" + player.prestige + ")");
	$("#valeurclic").html("You have <strong><font class='vert'>$" + pcaps + "</font></strong> (+<font class='vert'>$" + pscaps + "</font>/s)");
	$("#capscount").html("Dollars <font class='desc vert'> $" + pcaps + "</font>");
	$("#time").html("You started the " + player.DateStarted + "<br>And played since <font class='jaune'>" + toHHMMSS(player.playTime) + "</font>");
	$("#capspscount").html("Dollars per second <font class='desc vert'> $" + pscaps + "</font>");
	$("#buyedV1").html("Bikes bought <font class='desc'>" + player.buyedveh1 + "/7</font>");
	$("#buyedV2").html("Motorcycles bought <font class='desc'>" + player.buyedveh2 + "/47</font>");
	$("#buyedV3").html("Sports Classics Cars bought <font class='desc'>" + player.buyedveh3 + "/33</font>");
	$("#addcapscount").html("Dollars per clicks <font class='desc vert'> $" + pcliccaps + "</font>");
	$("#quality").html("Weapon | <strong>" + player.GunPower + player.Arme + "</strong> - <strong>" + player.Rarity + "<br><font class='blanc'></strong>Damage |<strong> </font>" + pcliccaps + "</strong></font><br>" + points + prestigeText);
	$("#bonuscapscount").html(pbonuscaps + "(+0.25)");
	$("#rank").html("Rank | <strong>" + getRank() + "</strong>");
	$("#prestigecount").html(year);
	$("#prestigepricecount").html(pprestigeprice);
	$("#prestigepricecount2").html("$" + pprestigeprice2);
	$("#version").html("Current version " + version);
	document.title = "IdleFive " + version;
	WeaponList();
	MissionList();
	VehicleList();
};