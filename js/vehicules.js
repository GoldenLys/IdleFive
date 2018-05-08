var vehicules = {
  0: { name: 'BMX', price: 1, value: 0.1 },
  1: { name: 'Whippet', price: 1, value: 0.1 },
  2: { name: 'Cruiser', price: 1, value: 0.1 },
  3: { name: 'Endurex', price: 1, value: 0.1 },
  4: { name: 'Fixter', price: 1, value: 0.1 },
  5: { name: 'Scorcher', price: 1, value: 0.1 },
  6: { name: 'Tri-Cycles', price: 1, value: 0.1 }, //END OF TYPE 1
  7: { name: 'Akuma', price: 2, value: 0.1 },
  8: { name: 'Avarus', price: 2, value: 0.1 },
  9: { name: 'Bagger', price: 2, value: 0.1 },
  10: { name: 'Bati 801', price: 2, value: 0.1 },
  11: { name: 'Bati 801RR', price: 2, value: 0.1 },
  12: { name: 'BF400', price: 2, value: 0.1 },
  13: { name: 'Carbon RS', price: 2, value: 0.1 },
  14: { name: 'Zombie Chopper', price: 2, value: 0.1 },
  15: { name: 'Chimera', price: 2, value: 0.1 },
  16: { name: 'Cliffhanger', price: 2, value: 0.1 },
  17: { name: 'Deamon', price: 2, value: 0.1 },
  18: { name: 'Deamon (Lost)', price: 2, value: 0.1 },
  19: { name: 'Defiler', price: 2, value: 0.1 },
  20: { name: 'Diabolus', price: 2, value: 0.1 },
  21: { name: 'Diabolus Custom', price: 2, value: 0.1 },
  22: { name: 'Double T', price: 2, value: 0.1 },
  23: { name: 'Enduro', price: 2, value: 0.1 },
  24: { name: 'Esskey', price: 2, value: 0.1 },
  25: { name: 'Faggio', price: 2, value: 0.1 },
  26: { name: 'Faggio Mod', price: 2, value: 0.1 },
  27: { name: 'Faggio Sport', price: 2, value: 0.1 },
  28: { name: 'FCR 1000', price: 2, value: 0.1 },
  29: { name: 'FCR 1000 Custom', price: 2, value: 0.1 },
  30: { name: 'Gargoyle', price: 2, value: 0.1 },
  31: { name: 'Hakuchou', price: 2, value: 0.1 },
  32: { name: 'Hakuchou Drag', price: 2, value: 0.1 },
  33: { name: 'Hexer', price: 2, value: 0.1 },
  34: { name: 'Innovation', price: 2, value: 0.1 },
  35: { name: 'Lectro', price: 2, value: 0.1 },
  36: { name: 'Manchez', price: 2, value: 0.1 },
  37: { name: 'Nemesis', price: 2, value: 0.1 },
  38: { name: 'Nightblade', price: 2, value: 0.1 },
  39: { name: 'Oppressor', price: 2, value: 0.1 },
  40: { name: 'PCJ 600', price: 2, value: 0.1 },
  41: { name: 'Rat Bike', price: 2, value: 0.1 },
  42: { name: 'Ruffian', price: 2, value: 0.1 },
  43: { name: 'Sanchez', price: 2, value: 0.1 },
  44: { name: 'Sanctus', price: 2, value: 0.1 },
  45: { name: 'Shotaro', price: 2, value: 0.1 },
  46: { name: 'Sovereign', price: 2, value: 0.1 },
  47: { name: 'Thrust', price: 2, value: 0.1 },
  48: { name: 'Vader', price: 2, value: 0.1 },
  49: { name: 'Vindicator', price: 2, value: 0.1 },
  50: { name: 'Vortex', price: 2, value: 0.1 },
  51: { name: 'Wolfsbane', price: 2, value: 0.1 },
  52: { name: 'Zombie Bobber', price: 2, value: 0.1 }, //END OF TYPE 3
  53: { name: '190z', price: 3, value: 0.1 },
  54: { name: 'Ardent', price: 3, value: 0.1 },
  55: { name: 'Casco', price: 3, value: 0.1 },
  56: { name: 'Cheetah Classic', price: 3, value: 0.1 },
  57: { name: 'Coquette Classic', price: 3, value: 0.1 },
  58: { name: 'Deluxo', price: 3, value: 0.1 },
  59: { name: 'Fagaloa', price: 3, value: 0.1 },
  60: { name: 'Franken Stange', price: 3, value: 0.1 },
  61: { name: 'GT500', price: 3, value: 0.1 },
  62: { name: 'Infernus Classic', price: 3, value: 0.1 },
  63: { name: 'JB 700', price: 3, value: 0.1 },
  64: { name: 'Mamba', price: 3, value: 0.1 },
  65: { name: 'Manana', price: 3, value: 0.1 },
  66: { name: 'Monroe', price: 3, value: 0.1 },
  67: { name: 'Peyote', price: 3, value: 0.1 },
  68: { name: 'Pigalle', price: 3, value: 0.1 },
  69: { name: 'Rapid GT Classic', price: 3, value: 0.1 },
  70: { name: 'Retinue', price: 3, value: 0.1 },
  71: { name: 'Roosevelt', price: 3, value: 0.1 },
  72: { name: 'Roosevelt Valor', price: 3, value: 0.1 },
  73: { name: 'Savestra', price: 3, value: 0.1 },
  74: { name: 'Stinger', price: 3, value: 0.1 },
  75: { name: 'Stinger GT', price: 3, value: 0.1 },
  76: { name: 'Stromberg', price: 3, value: 0.1 },
  77: { name: 'Torero', price: 3, value: 0.1 },
  78: { name: 'Tornado', price: 3, value: 0.1 },
  79: { name: 'Tornado (Beater)', price: 3, value: 0.1 },
  80: { name: 'Tornado (Mariachi)', price: 3, value: 0.1 },
  81: { name: 'Tornado Custom', price: 3, value: 0.1 },
  82: { name: 'Tornado Rat Rod', price: 3, value: 0.1 },
  83: { name: 'Turismo Classic', price: 3, value: 0.1 },
  84: { name: 'Viseris', price: 3, value: 0.1 },
  85: { name: 'Z-Type', price: 3, value: 0.1 },
  86: { name: 'Stirling GT', price: 3, value: 0.1 }
};

var buyV = function (id) {
  if (vehicules[id].price <= player.points) {
    if (player.vehicules[id] == null) {
    player.vehicules[id] = 1; player.points -= vehicules[id].price;
    } else { if (player.vehicules[id] != 1) player.vehicules[id] = 1; player.points -= vehicules[id].price; }
    player.buyedveh1++;
    player.bonuspoints += vehicules[id].value;
  }
};

function VehicleList() {
  for (var id = 1; id < 17; id++) { $('#Vtab' + id).html(""); }

  for (var i in vehicules) {
    var vehicle = vehicules[i];
    if (player.vehicules[i] > 0) {
      bought = 'style="display:none;"';
      canBuy = "";
      name = "<font class='vert'>";
      cost = "<font class='vert'>IN YOUR GARAGE</font>";
      multiplier = "adds <font class='jaune'>" + fix(vehicle.value, 2) + "</font>";
    } else {
      bought = "";
      color = vehicle.price > player.points ? ' rougeb bold' : ' jaune bold';
      name = "<font class='gris'>";
      cost = "Price : <font class='" + color + "'>" + fix(vehicle.price, 3) + " CP</font>";
      multiplier = "adds <font class='gris'>" + fix(vehicle.value, 2) + "</font>";
    }

    url = "url('images/V/" + i + ".png')";
    canBuy = vehicle.price > player.points ? ' disabled' : '';

    var vehiclesDIV = $(
      "<div id='veh" + i + "' class='garage-div vehicleICON' style=" + url + ">" +
      "<p class='title blanc'>" + name + vehicle.name + "</font></p><br><br>" +
      "<p class='btexte'>" + cost + "</font></p><br>" +
      "<p class='btexte'> " + multiplier + "</font> to the damage multiplier</p><br><br>" +
      "<input type='button' class='btn btn-veh" + canBuy + "' " + bought + " value='Purchase' onClick='buyV(" + i + ");' />" +
      "<br></div>"
    );
    if (i < 7) { $('#Vtab1').append(vehiclesDIV); }
    if (i > 6) { if (i < 53) { $('#Vtab2').append(vehiclesDIV); } }
    if (i > 52) { if (i < 87) { $('#Vtab3').append(vehiclesDIV); } }
    $('#veh' + i).css('background-image', url);
  }
}

function showVTab(id) {
  hideVTabs();
  $('#Vtab' + id).show();
  $("#V" + id).addClass('active');
}


function hideVTabs() {
  for (var id = 1; id < 17; id++) {
    $("#Vtab" + id).hide();
    $("#V" + id).removeClass("active");
  }
}