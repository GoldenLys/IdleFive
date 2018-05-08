var productions = {
  0: { name: 'Pickpocketing', price: 1, pricemodifier: 1.15, value: 0.1, },
  1: { name: 'Rob A Grocery Store', price: 10, pricemodifier: 1.15, value: 0.5, },
  2: { name: 'Rob An Armored Van', price: 50, pricemodifier: 1.15, value: 1, },
  3: { name: 'Street Race', price: 100, pricemodifier: 1.15, value: 5, },
  4: { name: 'False Papers Factory', price: 500, pricemodifier: 1.15, value: 10, },
  5: { name: 'Weed Farm', price: 2000, pricemodifier: 1.15, value: 50, },
  6: { name: 'False Money Factory', price: 10000, pricemodifier: 1.15, value: 100, },
  7: { name: 'Meth Workshop', price: 50000, pricemodifier: 1.15, value: 250, },
  8: { name: 'Cocaine Workshop', price: 150000, pricemodifier: 1.15, value: 1000, },
  9: { name: 'Hangar', price: 750000, pricemodifier: 1.15, value: 5000, },
  10: { name: 'Bunker', price: 12500000, pricemodifier: 1.15, value: 10000, },
  11: { name: 'Vehicle Trafficking', price: 25000000, pricemodifier: 1.15, value: 25000, },
  12: { name: 'Rob the Union Depository', price: 200000000, pricemodifier: 1.15, value: 200000, },
};

function BuyM(id, qty) {
  var price = GetMissionPrice(id, qty);
  if (price <= player.caps) {
    player.caps -= price;
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
  var price = GetMissionPrice(id, qty) / 2;
  if (player.productions[id] == null) player.productions[id] = 0;
  player.caps += price;
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
  var price = (productions[id].price * Math.pow(productions[id].pricemodifier, owned)) * qty;
  return price;
};

var MissionList = function () {
  $('#productions').html('');

  var missions = $("<div class='garage-div' />");
  $('#productions').append(missions);

  for (var i in productions) {
    var production = productions[i];

    var owned = 0;
    if (player.productions[i] != null)
      owned = player.productions[i];
    var cost = GetMissionPrice(i, 1);
    var cost2 = GetMissionPrice(i, 10);

    var canBuy = cost > player.caps ? ' disabled' : '';
    var canBuy2 = cost2 > player.caps ? ' disabled' : '';
    var canSell = owned < 1 ? ' disabled' : '';
    var canSell2 = owned < 10 ? ' disabled' : '';
    var colorTitle = owned < 1 ? 'gris' : 'vert';

    var MissionDIV = $(

      "<p class='title " + colorTitle + "'>" + productions[i].name + "</p><br>" +
      "<p class='level'>Level " + owned + "<br>" +
      "<p class='valeur2'>Value:&nbsp;<font class='valeur vert'> $" + fix(cost, 2) + "</font></p><br>" +
      "<p class='production-desc'><font class='vert'>$" + fix(player.bonuscaps * productions[i].value * owned, 3) + "</font> per second" + "</p><br><br>" +
      "<a href='#' class='btn-buy" + canBuy + " gauche' onClick='BuyM(" + i + ", 1);''>BUY</a>" +
      "<a href='#' class='btn-buy2" + canBuy2 + " gauche' onClick='BuyM(" + i + ", 10);'>BUY 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10), 3) + "</font></a>" +
      "<a href='#' class='btn-sell" + canSell + " droite' onClick='SellM(" + i + ", 1);'>SELL</a>" +
      "<a href='#' class='btn-sell2" + canSell2 + " droite' onClick='SellM(" + i + ", 10);'>SELL 10<br> <font class='buttonText'>$" + fix(GetMissionPrice(i, 10)/2, 3) + "</font></a><br><br>" +
      "<div class='bar'></div>"
    );
    missions.append(MissionDIV);
  }
}; 