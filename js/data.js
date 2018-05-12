var productions = {
    0: { name: 'Pickpocketing', price: 1, pricemodifier: 1.05, value: 0.1, },
    1: { name: 'Rob A Grocery Store', price: 3, pricemodifier: 1.05, value: 0.5, },
    2: { name: 'Security Van Heist', price: 50, pricemodifier: 1.05, value: 1, },
    3: { name: 'Street Race', price: 100, pricemodifier: 1.05, value: 5, },
    4: { name: 'Document Forgery', price: 500, pricemodifier: 1.05, value: 10, },
    5: { name: 'Weed Farm', price: 2000, pricemodifier: 1.05, value: 50, },
    6: { name: 'Counterfeit Cash', price: 10000, pricemodifier: 1.05, value: 100, },
    7: { name: 'Meth', price: 50000, pricemodifier: 1.05, value: 250, },
    8: { name: 'Cocaine', price: 150000, pricemodifier: 1.05, value: 1000, },
    9: { name: 'Hangar', price: 750000, pricemodifier: 1.05, value: 5000, },
    10: { name: 'Bunker', price: 12500000, pricemodifier: 1.05, value: 10000, },
    11: { name: 'Vehicle Trafficking', price: 25000000, pricemodifier: 1.05, value: 25000, },
    12: { name: 'Union Depository Heist', price: 200000000, pricemodifier: 1.05, value: 200000, },
    13: { name: 'The Doomsday Heist', price: 10000000000, pricemodifier: 1.05, value: 15000000, },
};

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
    11: { name: "Machete", power: 50000, price: 5000000 }, //END OF TYPE 1
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
    24: { name: "Marksman Pistol", power: 10000000, price: 1750000000 },
    25: { name: "Double Action Revolver", power: 20000000, price: 2500000000 },
    26: { name: "Heavy Revolver", power: 50000000, price: 5000000000 },
    27: { name: "Heavy Revolver MKII", power: 100000000, price: 100000000000 }, //END OF TYPE 2
    28: { name: "Assault Shotgun", power: 1000000000, price: 1000000000000 },
    29: { name: "Bullpup Shotgun", power: 1250000000, price: 1500000000000 },
    30: { name: "Double Barrel Shotgun", power: 1500000000, price: 2000000000000 },
    31: { name: "Heavy Shotgun", power: 2000000000, price: 3000000000000 },
    32: { name: "Musket", power: 2500000000, price: 6000000000000 },
    33: { name: "Sawed-Off Shotgun", power: 3000000000, price: 10000000000000 },
    34: { name: "Sweeper Shotgun", power: 3500000000, price: 17500000000000 },
    35: { name: "Pump Shotgun", power: 5000000000, price: 20000000000000 },
    36: { name: "Pump Shotgun MKII", power: 10000000000, price: 40000000000000 }, //END OF TYPE 3
};

var vehicules = {
    0: { name: 'BMX', price: 1, value: 0.5, type: 0 },
    1: { name: 'Whippet', price: 1, value: 0.5, type: 0 },
    2: { name: 'Cruiser', price: 1, value: 0.5, type: 0 },
    3: { name: 'Endurex', price: 2, value: 1, type: 1 },
    4: { name: 'Fixter', price: 1, value: 0.5, type: 0 },
    5: { name: 'Scorcher', price: 2, value: 1, type: 1 },
    6: { name: 'Tri-Cycles', price: 2, value: 1, type: 1 }, //END OF TYPE 1
    7: { name: 'Akuma', price: 1, value: 0.5, type: 0 },
    8: { name: 'Avarus', price: 1, value: 0.5, type: 0 },
    9: { name: 'Bagger', price: 1, value: 0.5, type: 0 },
    10: { name: 'Bati 801', price: 2, value: 1, type: 1 },
    11: { name: 'Bati 801RR', price: 2, value: 1, type: 1 },
    12: { name: 'BF400', price: 1, value: 0.5, type: 0 },
    13: { name: 'Carbon RS', price: 1, value: 0.5, type: 0 },
    14: { name: 'Zombie Chopper', price: 1, value: 0.5, type: 0 },
    15: { name: 'Chimera', price: 1, value: 0.5, type: 0 },
    16: { name: 'Cliffhanger', price: 1, value: 0.5, type: 0 },
    17: { name: 'Deamon', price: 1, value: 0.5, type: 0 },
    18: { name: 'Deamon (Lost)', price: 1, value: 0.5, type: 1 },
    19: { name: 'Defiler', price: 3, value: 2, type: 1 },
    20: { name: 'Diabolus', price: 2, value: 1, type: 0 },
    21: { name: 'Diabolus Custom', price: 3, value: 2, type: 0 },
    22: { name: 'Double T', price: 1, value: 0.5, type: 0 },
    23: { name: 'Enduro', price: 1, value: 0.5, type: 0 },
    24: { name: 'Esskey', price: 1, value: 0.5, type: 0 },
    25: { name: 'Faggio', price: 1, value: 0.5, type: 0 },
    26: { name: 'Faggio Mod', price: 1, value: 0.5, type: 0 },
    27: { name: 'Faggio Sport', price: 2, value: 1, type: 0 },
    28: { name: 'FCR 1000', price: 2, value: 1, type: 0 },
    29: { name: 'FCR 1000 Custom', price: 2, value: 2, type: 0 },
    30: { name: 'Gargoyle', price: 1, value: 0.5, type: 1 },
    31: { name: 'Hakuchou', price: 2, value: 1, type: 1 },
    32: { name: 'Hakuchou Drag', price: 3, value: 2, type: 1 },
    33: { name: 'Hexer', price: 1, value: 0.5, type: 0 },
    34: { name: 'Innovation', price: 1, value: 0.5, type: 0 },
    35: { name: 'Lectro', price: 1, value: 0.5, type: 0 },
    36: { name: 'Manchez', price: 1, value: 0.5, type: 0 },
    37: { name: 'Nemesis', price: 1, value: 0.5, type: 1 },
    38: { name: 'Nightblade', price: 1, value: 0.5, type: 0 },
    39: { name: 'Oppressor', price: 3, value: 2, type: 1 },
    40: { name: 'PCJ 600', price: 2, value: 1, type: 1 },
    41: { name: 'Rat Bike', price: 1, value: 0.5, type: 0 },
    42: { name: 'Ruffian', price: 1, value: 0.5, type: 0 },
    43: { name: 'Sanchez', price: 1, value: 0.5, type: 0 },
    44: { name: 'Sanctus', price: 2, value: 1, type: 0 },
    45: { name: 'Shotaro', price: 3, value: 2, type: 0 },
    46: { name: 'Sovereign', price: 1, value: 0.5, type: 0 },
    47: { name: 'Thrust', price: 3, value: 2, type: 0 },
    48: { name: 'Vader', price: 1, value: 0.5, type: 0 },
    49: { name: 'Vindicator', price: 2, value: 1, type: 0 },
    50: { name: 'Vortex', price: 1, value: 0.5, type: 0 },
    51: { name: 'Wolfsbane', price: 1, value: 0.5, type: 1 },
    52: { name: 'Zombie Bobber', price: 1, value: 0.5, type: 1 }, //END OF TYPE 2
    53: { name: '190z', price: 3, value: 2, type: 1 },
    54: { name: 'Ardent', price: 1, value: 0.5, type: 1 },
    55: { name: 'Casco', price: 1, value: 0.5, type: 1 },
    56: { name: 'Cheetah Classic', price: 1, value: 0.5, type: 1 },
    57: { name: 'Coquette Classic', price: 1, value: 0.5, type: 1 },
    58: { name: 'Deluxo', price: 2, value: 1, type: 0 },
    59: { name: 'Fagaloa', price: 1, value: 0.5, type: 0 },
    60: { name: 'Franken Stange', price: 1, value: 0.5, type: 0 },
    61: { name: 'GT500', price: 3, value: 2, type: 0 },
    62: { name: 'Infernus Classic', price: 3, value: 2, type: 0 },
    63: { name: 'JB 700', price: 1, value: 0.5, type: 0 },
    64: { name: 'Mamba', price: 1, value: 0.5, type: 0 },
    65: { name: 'Manana', price: 1, value: 0.5, type: 0 },
    66: { name: 'Monroe', price: 1, value: 0.5, type: 0 },
    67: { name: 'Peyote', price: 1, value: 0.5, type: 0 },
    68: { name: 'Pigalle', price: 1, value: 0.5, type: 0 },
    69: { name: 'Rapid GT Classic', price: 3, value: 2, type: 0 },
    70: { name: 'Retinue', price: 1, value: 0.5, type: 0 },
    71: { name: 'Roosevelt', price: 1, value: 0.5, type: 0 },
    72: { name: 'Roosevelt Valor', price: 1, value: 0.5, type: 0 },
    73: { name: 'Savestra', price: 1, value: 0.5, type: 0 },
    74: { name: 'Stinger', price: 2, value: 1, type: 0 },
    75: { name: 'Stinger GT', price: 3, value: 2, type: 0 },
    76: { name: 'Stromberg', price: 3, value: 2, type: 0 },
    77: { name: 'Torero', price: 3, value: 2, type: 0 },
    78: { name: 'Tornado', price: 1, value: 0.5, type: 0 },
    79: { name: 'Tornado (Beater)', price: 1, value: 0.5, type: 0 },
    80: { name: 'Tornado (Mariachi)', price: 1, value: 0.5, type: 0 },
    81: { name: 'Tornado Custom', price: 1, value: 0.5, type: 1 },
    82: { name: 'Tornado Rat Rod', price: 1, value: 0.5, type: 0 },
    83: { name: 'Turismo Classic', price: 3, value: 2, type: 1 },
    84: { name: 'Viseris', price: 5, value: 1, type: 1 },
    85: { name: 'Z-Type', price: 3, value: 2, type: 1 },
    86: { name: 'Stirling GT', price: 3, value: 2, type: 1 }, //END OF TYPE 3
    87: { name: '9F', price: 1, value: 1, type: 0 },
    88: { name: '9F Cabrio', price: 1, value: 1, type: 0 },
    89: { name: 'Alpha', price: 1, value: 1, type: 1 },
    90: { name: 'Banshee', price: 1, value: 1, type: 1 },
    91: { name: 'Bestia GTS', price: 2, value: 1.5, type: 1 },
    92: { name: 'Blista Compact', price: 1, value: 1, type: 0 },
    93: { name: 'Buffalo', price: 1, value: 1, type: 0 },
    94: { name: 'Buffalo S', price: 2, value: 1.5, type: 0 },
    95: { name: 'Carbonizzare', price: 1, value: 1, type: 1 },
    96: { name: 'Comet', price: 3, value: 2, type: 1 },
    97: { name: 'Comet Retro Custom', price: 3, value: 2, type: 1 },
    98: { name: 'Comet Safari', price: 2, value: 1.5, type: 0 },
    99: { name: 'Comet SR', price: 3, value: 2, type: 1 },
    100: { name: 'Coquette', price: 1, value: 1, type: 1 },
    101: { name: 'Drift Tampa', price: 3, value: 2, type: 1 },
    102: { name: 'Elegy RH8', price: 2, value: 1.5, type: 1 },
    103: { name: 'Elegy Retro Custom', price: 3, value: 2, type: 1 },
    104: { name: 'Feltzer', price: 3, value: 2, type: 0 },
    105: { name: 'Furore GT', price: 3, value: 2, type: 0 },
    106: { name: 'Fusilade', price: 3, value: 2, type: 0 },
    107: { name: 'Futo', price: 3, value: 2, type: 0 },
    108: { name: 'GB200', price: 1, value: 1, type: 1 },
    109: { name: 'Go Go Monkey Blista', price: 1, value: 1, type: 1 },
    110: { name: 'Hotring Sabre', price: 3, value: 2, type: 1 },
    111: { name: 'Jester', price: 1, value: 1, type: 0 },
    112: { name: 'Jester (Racecar)', price: 2, value: 1.5, type: 0 },
    113: { name: 'Khamelion', price: 2, value: 1.5, type: 1 },
    114: { name: 'Kuruma', price: 1, value: 1, type: 1 },
    115: { name: 'Kuruma (Armored)', price: 2, value: 1.5, type: 1 },
    116: { name: 'Lynx', price: 3, value: 2, type: 1 },
    117: { name: 'Massacro', price: 1, value: 1, type: 1 },
    118: { name: 'Massacro (Racecar)', price: 2, value: 1.5, type: 1 },
    119: { name: 'Neon', price: 3, value: 2, type: 1 },
    120: { name: 'Omnis', price: 1, value: 1, type: 0 },
    121: { name: 'Pariah', price: 3, value: 2, type: 1 },
    122: { name: 'Penumbra', price: 1, value: 1, type: 0 },
    123: { name: 'Raiden', price: 2, value: 1.5, type: 1 },
    124: { name: 'Rapid GT', price: 2, value: 1.5, type: 0 },
    125: { name: 'Rapid GT (Convertible)', price: 3, value: 2, type: 1 },
    126: { name: 'Raptor', price: 1, value: 1, type: 0 },
    127: { name: 'Revolter', price: 3, value: 2, type: 1 },
    128: { name: 'Ruston', price: 1, value: 1, type: 0 },
    129: { name: 'Schafter LWB', price: 2, value: 1.5, type: 1 },
    130: { name: 'Schafter V12', price: 3, value: 2, type: 1 },
    131: { name: 'Schwartzer', price: 1, value: 1, type: 1 },
    132: { name: 'Sentinel Classic', price: 1, value: 1, type: 1 },
    133: { name: 'Seven-70', price: 1, value: 1, type: 1 },
    134: { name: 'Specter', price: 2, value: 1.5, type: 1 },
    135: { name: 'Specter Custom', price: 3, value: 2, type: 1 },
    136: { name: 'Sprunk Buffalo', price: 1, value: 1, type: 1 },
    137: { name: 'Streiter', price: 1, value: 1, type: 1 },
    138: { name: 'Sultan', price: 2, value: 1.5, type: 1 },
    139: { name: 'Surano', price: 1, value: 1, type: 0 },
    140: { name: 'Tropos Rallye', price: 1, value: 1, type: 0 },
    141: { name: 'Verlierer', price: 2, value: 1.5, type: 0 },
    142: { name: 'Flash GT', price: 3, value: 2, type: 0 }, // END OF TYPE 4
    143: { name: '811', price: 3, value: 2, type: 0 },
    144: { name: 'Adder', price: 3, value: 2, type: 0 },
    145: { name: 'Autarch', price: 3, value: 2, type: 1 },
    146: { name: 'Banshee 900R', price: 3, value: 2, type: 0 },
    147: { name: 'Bullet', price: 3, value: 2, type: 0 },
    148: { name: 'Cheetah', price: 3, value: 2, type: 0 },
    149: { name: 'Cyclone', price: 3, value: 2, type: 1 },
    150: { name: 'Entity XF', price: 3, value: 2, type: 1 },
    151: { name: 'Entity XXR', price: 3, value: 2, type: 1 },
    152: { name: 'ETR1', price: 3, value: 2, type: 0 },
    153: { name: 'FMJ', price: 3, value: 2, type: 1 },
    154: { name: 'GP1', price: 3, value: 2, type: 0 },
    155: { name: 'Infernus', price: 3, value: 2, type: 0 },
    156: { name: 'Itali GTB', price: 3, value: 2, type: 0 },
    157: { name: 'Itali GTB Custom', price: 3, value: 2, type: 0 },
    158: { name: 'Nero', price: 3, value: 2, type: 1 },
    159: { name: 'Nero Custom', price: 3, value: 2, type: 1 },
    160: { name: 'Osiris', price: 3, value: 2, type: 1 },
    161: { name: 'Penetrator', price: 3, value: 2, type: 0 },
    162: { name: 'RE-7B', price: 3, value: 2, type: 0 },
    163: { name: 'Reaper', price: 3, value: 2, type: 0 },
    164: { name: 'Rocket Voltic', price: 3, value: 2, type: 0 },
    165: { name: 'SC1', price: 3, value: 2, type: 0 },
    166: { name: 'Sultan RS', price: 3, value: 2, type: 0 },
    167: { name: 'T20', price: 3, value: 2, type: 1 },
    168: { name: 'Taipan', price: 3, value: 2, type: 1 },
    169: { name: 'Tempesta', price: 3, value: 2, type: 0 },
    170: { name: 'Tezeract', price: 3, value: 2, type: 1 },
    171: { name: 'Turismo R', price: 3, value: 2, type: 1 },
    172: { name: 'Tyrant', price: 3, value: 2, type: 1 },
    173: { name: 'Tyrus', price: 3, value: 2, type: 1 },
    174: { name: 'Vacca', price: 3, value: 2, type: 0 },
    175: { name: 'Vagner', price: 3, value: 2, type: 1 },
    176: { name: 'Visione', price: 3, value: 2, type: 1 },
    177: { name: 'Vigilante', price: 3, value: 2, type: 0 },
    178: { name: 'Voltic', price: 3, value: 2, type: 0 },
    179: { name: 'XA-21', price: 3, value: 2, type: 1 },
    180: { name: 'X80 Proto', price: 3, value: 2, type: 0 },
    181: { name: 'Zentorno', price: 3, value: 2, type: 1 }, //END OF TYPE 5
};

var success = {
    0: { name: "A fresh start", desc: "Successfully completed the tutorial.", type: 0, },
    1: { name: "The first dollar", desc: "obtained $1.", type: 1, value: 1, },
    2: { name: "A whole handful", desc: "obtained $10.", type: 1, value: 10, },
    3: { name: "A well filled bag", desc: "obtained $100.", type: 1, value: 100, },
    4: { name: "A whole suitcase", desc: "obtained $1,000.", type: 1, value: 1000, },
    5: { name: "The army of 10,000", desc: "obtained $10,000.", type: 1, value: 10000, },
    6: { name: "the beginning of wealth", desc: "obtained $100,000.", type: 1, value: 100000, },
    7: { name: "the millionaire", desc: "obtained $1M.", type: 1, value: 1000000, },
    8: { name: "prestige", desc: "obtained $10M.", type: 1, value: 10000000, },
    9: { name: "the billionaire", desc: "obtained $1b.", type: 1, value: 1000000000, },
    10: { name: "the billiardaire", desc: "obtained $1t.", type: 1, value: 1000000000000, },
    11: { name: "the trilliard", desc: "obtained $1q.", type: 1, value: 1000000000000000, },
    12: { name: "Pickpocket", desc: "hired 100 pickpockets.", type: 2, value: 100, value2: 0, },
    13: { name: "grocery stalker", desc: "rob 100 grocery stores.", type: 2, value: 100, value2: 1, }, //END OF TYPE 1
    14: { name: "armored van stalker", desc: "rob 100 armored vans.", type: 2, value: 100, value2: 2, },
    15: { name: "street boss", desc: "win 100 street races.", type: 2, value: 100, value2: 3, },
    16: { name: "manufacturer of false papers", desc: "buy 100 false papers factories.", type: 2, value: 100, value2: 4, },
    17: { name: "weed dealer", desc: "buy 100 weed farms.", type: 2, value: 100, value2: 5, },
    18: { name: "manufacturer of false money", desc: "buy 100 false money factories.", type: 2, value: 100, value2: 6, },
    19: { name: "breaking five", desc: "buy a total of 100 meth workshops.", type: 2, value: 100, value2: 7, },
    20: { name: "cocaine manufacturer", desc: "buy a total of 100 cocaine workshops.", type: 2, value: 100, value2: 8, },
    21: { name: "the eagle nest", desc: "buy a total of 100 hangars.", type: 2, value: 100, value2: 9, },
    22: { name: "zombie apocalypse preparation", desc: "buy a total of 100 bunkers.", type: 2, value: 100, value2: 10, },
    23: { name: "professionnal car dealer", desc: "Steal 100 vehicles.", type: 2, value: 100, value2: 11, },
    24: { name: "the big score", desc: "rob the union depository a hundred times.", type: 2, value: 100, value2: 12, }, //END OF TYPE 2
    25: { name: "all bikes bought", desc: "bought all vehicles of this category.", type: 3, value: 7, value2: 0, },
    26: { name: "all motorcycles bought", desc: "bought all vehicles of this category.", type: 3, value: 46, value2: 1, },
    27: { name: "all classics sports cars bought", desc: "bought all vehicles of this category.", type: 3, value: 34, value2: 2, },
    28: { name: "all sports cars bought", desc: "bought all vehicles of this category.", type: 3, value: 56, value2: 3, },
    29: { name: "all super cars bought", desc: "bought all vehicles of this category.", type: 3, value: 39, value2: 4, },
    30: { name: "all muscles cars bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 5, },
    31: { name: "all compacts cars bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 6, },
    32: { name: "all sedans cars bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 7, },
    33: { name: "all off-road cars boughts", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 8, },
    34: { name: "all coupes cars bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 9, },
    35: { name: "all emergencies vehicles bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 10, },
    36: { name: "all boats bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 11, },
    37: { name: "all SUVs bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 12, },
    38: { name: "all helicopters bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 13, },
    39: { name: "all military vehicles bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 14, },
    40: { name: "all commercial cars bought", desc: "bought all vehicles of this category.", type: 3, value: 0, value2: 15, }, //END OF TYPE 3
    41: { name: "<font class='Bronze'>1</font>", desc: "reached this level.", type: 4, value: 1, },
    42: { name: "<font class='Silver'>100</font>", desc: "reached this level.", type: 4, value: 100, },
    43: { name: "<font class='Gold'>700</font>", desc: "reached this level.", type: 4, value: 700, },
    44: { name: "<font class='Platinum'>1300</font>", desc: "reached this level.", type: 4, value: 1300, }, //END OF TYPE 4
    45: { name: "Character 2", desc: "You have unlocked the character number 2.", type: 5, value: 2, },
    46: { name: "Character 3", desc: "You have unlocked the character number 3.", type: 5, value: 3, },
    47: { name: "Character 4", desc: "You have unlocked the character number 4.", type: 5, value: 4, },
    48: { name: "Character 5", desc: "You have unlocked the character number 5.", type: 5, value: 5, },
    49: { name: "Character 6", desc: "You have unlocked the character number 6.", type: 5, value: 6, },
    50: { name: "Character 7", desc: "You have unlocked the character number 7.", type: 5, value: 7, },
    51: { name: "Character 8", desc: "You have unlocked the character number 8.", type: 5, value: 8, },
    52: { name: "Character 9", desc: "You have unlocked the character number 9.", type: 5, value: 9, },
    53: { name: "Character 10", desc: "You have unlocked the character number 10.", type: 5, value: 10, }, //END OF TYPE 5
};

var tutorialtexts = {
    0: { title: "Presentation", text: "First of all, hello to you.<br /> I want to thank you for playing this little game that i created.<br /> IdleFive is a GTA-Like game that aims to look like Grand Theft Auto V.<br /> But, with a different vision and a different gameplay of the original game.", },
    1: { title: "Objective", text: "The main goal of the game is to buy every cars and weapons in the game.<br /> To do that, you have to get <div class='money'></div> by using your weapons or by doing missions.", },
    2: { title: "How to play ?", text: "You can start by clicking on the fist to make some money.<br /> After you got some cash, you can buy a weapon or start a mission to gain a lot more <div class='money'></div>.<br /> Buying an Activity will increase your rank and you need that to change your character.", },
    3: { title: "Missions", text: "This is the main mechanic of the game, they are used to automatise the game.<br /> The more you have the more you get <div class='money'></div> and <div class='level'></div> but it will become more expensive.", },
    4: { title: "Weapons", text: "Weapons are used to do more damage and get 'manually' an amount of <div class='money'></div>,<br /> there is also a random quality system applied to the weapons that can raise or lower the power of the weapon.", },
    5: { title: "Character", text: "This is the prestige system of the game.<br /> Once you have the required <div class='money'></div> and <div class='level'></div>,<br /> you can change your character and get Character Points (CP)<br /> It will cost all your Weapons, Money and Missions but you keep all your Vehicles.", },
    6: { title: "Vehicles", text: "They are used to upgrades your cash or damage multiplier,<br /> to buy them you need Character Points (CP).", },
};

var textsENG = {
    menus: ["Character", "Success", "Save & Stats", "Guide", "Chat", "Weapons", "Missions", "Vehicles"],
    weapons: ["Price", "Modification", "Damage", "Buy this weapon", "Try to modify this weapon", "Use this weapon (normal)"],
    missions: ["Buy", "Sell", "Level", "Value", "product" , "per level", "and currently", "/s"],
    vehicles: ["Price", "adds", "of", "cash", "damage", "multiplier", "Purchase", "IN YOUR GARAGE"],
    infos: ["Weapon", "Damage", "A new character slot is available.", "Nothing to report at the moment.", "You have", "A player just killed you, he stole", "in your pockets !", "Level"],
    character: ["Change character", "You are actually using the character number", "You must reach the level", "and get", "to switch to another character.", "You can currently get", "Character Points (CP).", "Your actual multiplier is at", "on the money earned."],
    guide: ["Tutorial", "Next", "Previous", "Close tutorial"],
};

var textsFRA = {
    menus: ["Personnage", "Succès", "Sauvegarde & Stats", "Guide", "Chat", "Armes", "Missions", "Vehicules"],
    weapons: ["Prix", "Modification", "Dégats", "Acheter cette arme", "Essayer de modifier cette arme", "Utiliser cette arme (normal)"],
    missions: ["Acheter", "Vendre", "Niveau", "Valeur", "produit" , "par niveau", "et actuellement", "/s"],
    vehicles: ["Prix", "ajoute", "au multiplicateur de", "cash", "dégats", "", "Acheter", "DANS VOTRE GARAGE"],
    infos: ["Arme", "Dégats", "Un emplacement pour un autre personnage est disponible.", "Rien à signaler pour le moment.", "Vous avez", "Un joueur viens de vous tuer, il a volé ", "dans vos poches !", "Niveau"],
    character: ["Changer de personnage", "Vous utilisez actuellement le personnage numéro", "Vous devez atteindre le niveau", "et obtenir", "pour passer à un autre personnage.", "Vous pouvez actuellement obtenir", "points de personnage (CP).", "Votre bonus actuel est de", "sur l'argent gagné."],
    guide: ["Tutoriel", "Suivant", "Précédent", "Fermer le tutoriel"],
};