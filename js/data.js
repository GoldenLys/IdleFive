var missions = {
    0: { name: 'Pickpocketing', price: 10, modifier: 1.05, value: 0.1, level: 0 },
    1: { name: 'Grocery Store Robbery', price: 50, modifier: 1.05, value: 0.5, level: 5 },
    2: { name: 'Fleeca Heist', price: 100, modifier: 1.05, value: 1, level: 20 },
    3: { name: 'Security Van Heist', price: 500, modifier: 1.05, value: 5, level: 50 },

    4: { name: 'Street Race', price: 1000, modifier: 1.05, value: 10, level: 100 },
    5: { name: 'Gang Attack', price: 5000, modifier: 1.05, value: 50, level: 200 },
    6: { name: 'Document Forgery', price: 25000, modifier: 1.05, value: 250, level: 300 },
    7: { name: 'Weed Farm', price: 100000, modifier: 1.05, value: 1000, level: 400 },
    8: { name: 'Time Trial', price: 500000, modifier: 1.05, value: 5000, level: 500 },

    9: { name: 'Counterfeit Cash', price: 750000, modifier: 1.05, value: 7500, level: 600 },
    10: { name: 'Prison Break Heist', price: 1250000, modifier: 1.05, value: 12500, level: 700 },
    11: { name: 'Meth', price: 3500000, modifier: 1.05, value: 35000, level: 800 },
    12: { name: 'Cocaine', price: 5000000, modifier: 1.05, value: 50000, level: 900 },
    13: { name: 'Hangar', price: 10000000, modifier: 1.05, value: 100000, level: 1000 },

    14: { name: 'Humane Labs Raid', price: 25000000, modifier: 1.05, value: 250000, level: 1100 },
    15: { name: 'Series A Funding Heist', price: 75000000, modifier: 1.05, value: 750000, level: 1200 },
    16: { name: 'Bunker', price: 150000000, modifier: 1.05, value: 1500000, level: 1300 },
    17: { name: 'Vehicle Trafficking', price: 500000000, modifier: 1.05, value: 5000000, level: 1400 },

    18: { name: 'Pacific Standard Heist', price: 1000000000, modifier: 1.05, value: 10000000, level: 1500 },
    19: { name: 'Doomsday Heist', price: 2500000000, modifier: 1.05, value: 25000000, level: 1600 },
    20: { name: 'Union Depository Heist', price: 10000000000, modifier: 1.05, value: 100000000, level: 1700 },
    21: { name: 'Casino Heist', price: 15000000000, modifier: 1.05, value: 150000000, level: 2000 },
};

var weapons = {
    0: { name: "Fist", power: 0.5, price: 0, type: 0 },
    1: { name: "Brass Knuckles", power: 1, price: 10, type: 1 },
    2: { name: "Knife", power: 2, price: 150, type: 1 },
    3: { name: "Nightstick", power: 5, price: 450, type: 1 },
    4: { name: "Baseball Bat", power: 10, price: 950, type: 1 },
    5: { name: "Golf Club", power: 15, price: 1450, type: 1 },
    6: { name: "Battle Axe", power: 20, price: 1950, type: 1 },
    7: { name: "Machete", power: 25, price: 2450, type: 1 },
    8: { name: "Wrench", power: 30, price: 2950, type: 1 }, //END OF MELEE WEAPONS
    9: { name: "Stun Gun", power: 100, price: 5000, type: 2 },
    10: { name: "SNS Pistol Mk II", power: 500, price: 25000, type: 2 },
    11: { name: "Pistol Mk II", power: 1000, price: 50000, type: 2 },
    12: { name: "AP Pistol", power: 1500, price: 75000, type: 2 },
    13: { name: "Heavy Pistol", power: 2500, price: 125000, type: 2 },
    14: { name: "Pistol .50", power: 4500, price: 225000, type: 2 },
    15: { name: "Heavy Revolver Mk II", power: 5000, price: 250000, type: 2 },
    16: { name: "Up-n-Atomizer", power: 7500, price: 375000, type: 2 }, //END OF PISTOLS
    17: { name: "Bullpup Shotgun", power: 6500, price: 325000, type: 3 },
    18: { name: "Double Barrel Shotgun", power: 7000, price: 350000, type: 3 },
    19: { name: "Heavy Shotgun", power: 8000, price: 400000, type: 3 },
    20: { name: "Musket", power: 9000, price: 450000, type: 3 },
    21: { name: "Sawed-Off Shotgun", power: 10000, price: 500000, type: 3 },
    22: { name: "Assault Shotgun", power: 12500, price: 625000, type: 3 },
    23: { name: "Pump Shotgun Mk II", power: 15000, price: 750000, type: 3 }, //END OF SHOTGUNS
    24: { name: "Assault SMG", power: 200000, price: 10000000, type: 4 },
    25: { name: "Gusenberg Sweeper", power: 250000, price: 12500000, type: 4 },
    26: { name: "Machine Pistol", power: 300000, price: 15000000, type: 4 },
    27: { name: "Unholy Hellbringer", power: 350000, price: 17500000, type: 4 },
    28: { name: "Micro SMG", power: 400000, price: 20000000, type: 4 },
    29: { name: "SMG Mk II", power: 450000, price: 22500000, type: 4 },
    30: { name: "Combat MG Mk II", power: 500000, price: 25000000, type: 4 }, //END OF MACHINE GUNS
    31: { name: "Advanced Rifle", power: 750000, price: 37500000, type: 5 },
    32: { name: "Assault Riffle Mk II", power: 800000, price: 40000000, type: 5 },
    33: { name: "Bullpup Rifle Mk II", power: 850000, price: 42500000, type: 5 },
    34: { name: "Carbine Rifle Mk II", power: 900000, price: 450000000, type: 5 },
    35: { name: "Compact Rifle", power: 950000, price: 47500000, type: 5 },
    36: { name: "Special Carbine Mk II", power: 1000000, price: 500000000, type: 5 }, //END ASSAULT RIFLES
    37: { name: "Sniper Rifle", power: 5000000, price: 250000000, type: 6 },
    38: { name: "Marksman Rifle Mk II", power: 10000000, price: 500000000, type: 6 },
    39: { name: "Heavy Sniper Mk II", power: 50000000, price: 2500000000, type: 6 }, //END OF SNIPERS
    40: { name: "Widowmaker", power: 250000000, price: 12500000000, type: 7 },
    41: { name: "Grenade Launcher", power: 500000000, price: 25000000000, type: 7 },
    42: { name: "Homing Launcher", power: 750000000, price: 37500000000, type: 7 },
    43: { name: "Minigun", power: 1250000000, price: 62500000000, type: 7 },
    44: { name: "Railgun", power: 1500000000, price: 75000000000, type: 7 }, //END OF HEAVY WEAPONS
};

var vehicules = {
    0: { name: 'Stamina', price: 1, value: 0.1, type: 0 },
    1: { name: 'Strength', price: 1, value: 0.1, type: 1 },
};

var success = {
    0: { name: "A fresh start", desc: "Successfully completed the tutorial.", type: 0, },
    1: { name: "The first dollar", desc: "You've gained $1.", type: 1, value: 1, },
    2: { name: "A whole handful", desc: "You've gained $10.", type: 1, value: 10, },
    3: { name: "A well filled bag", desc: "You've gained $100.", type: 1, value: 100, },
    4: { name: "A whole suitcase", desc: "You've gained $1,000.", type: 1, value: 1000, },
    5: { name: "The army of 10,000", desc: "You've gained $10,000.", type: 1, value: 10000, },
    6: { name: "The beginning of wealth", desc: "You've gained $100,000.", type: 1, value: 100000, },
    7: { name: "The millionaire", desc: "You've gained $1M.", type: 1, value: 1000000, },
    8: { name: "Prestige", desc: "You've gained $10M.", type: 1, value: 10000000, },
    9: { name: "The billionaire", desc: "You've gained $1B.", type: 1, value: 1000000000, },
    10: { name: "The billiardaire", desc: "You've gained $1t.", type: 1, value: 1000000000000, },
    11: { name: "The trilliard", desc: "You've gained $1q.", type: 1, value: 1000000000000000, }, //END OF TYPE 1
    12: { name: "Pickpocket", desc: "hired 100 pickpockets.", type: 2, value: 100, value2: 0, },
    13: { name: "Grocery stalker", desc: "rob 100 grocery stores.", type: 2, value: 100, value2: 1, },
    14: { name: "The fleeca Bank", desc: "rob the fleeca bank a hundred times..", type: 2, value: 100, value2: 2, },
    15: { name: "Armored van stalker", desc: "rob 100 armored vans.", type: 2, value: 100, value2: 3, },
    16: { name: "Street boss", desc: "win 100 street races.", type: 2, value: 100, value2: 4, },
    17: { name: "The punisher", desc: "Attack 100 gangs.", type: 2, value: 100, value2: 5, },
    18: { name: "Manufacturer of false papers", desc: "buy 100 false papers factories.", type: 2, value: 100, value2: 6, },
    19: { name: "Weed dealer", desc: "buy 100 weed farms.", type: 2, value: 100, value2: 7, },
    20: { name: "Fast & Furious", desc: "Complete 100 time trials.", type: 2, value: 100, value2: 8, },
    21: { name: "Manufacturer of false money", desc: "buy 100 false money factories.", type: 2, value: 100, value2: 9, },
    22: { name: "Prison Break", desc: "Evade the prison a hundred times.", type: 2, value: 100, value2: 10, },
    23: { name: "Breaking five", desc: "Buy a total of 100 meth workshops.", type: 2, value: 100, value2: 11, },
    24: { name: "Cocaine manufacturer", desc: "Buy a total of 100 cocaine workshops.", type: 2, value: 100, value2: 12, },
    25: { name: "The eagle nest", desc: "Buy a total of 100 hangars.", type: 2, value: 100, value2: 13, },
    26: { name: "Human Labs", desc: "Rob a hundred times human labs.", type: 2, value: 100, value2: 14, },
    27: { name: "Series A Funding", desc: "Do series a funding a hundred times.", type: 2, value: 100, value2: 15, },
    28: { name: "Zombie apocalypse", desc: "Buy a total of 100 bunkers.", type: 2, value: 100, value2: 16, },
    29: { name: "Professionnal car dealer", desc: "Steal 100 vehicles.", type: 2, value: 100, value2: 17, },
    30: { name: "Pacific Standard", desc: "Do the pacific standard heist a hundred times.", type: 2, value: 100, value2: 18, },
    31: { name: "Doomsday Heist", desc: "Do the doomsday heist a hundred times.", type: 2, value: 100, value2: 19, },
    32: { name: "The big score", desc: "Rob the union depository a hundred times.", type: 2, value: 100, value2: 20, }, //END OF TYPE 2OF TYPE 3
    33: { name: "Rank 1", desc: "Reached rank 1.", type: 4, value: 1, },
    34: { name: "Rank 10", desc: "Reached rank 10.", type: 4, value: 10, },
    35: { name: "Rank 25", desc: "Reached rank 25.", type: 4, value: 25, },
    36: { name: "Rank 50", desc: "Reached rank 50.", type: 4, value: 50, },
    37: { name: "Rank 75", desc: "Reached rank 75.", type: 4, value: 75, },
    38: { name: "Rank 100", desc: "Reached rank 100.", type: 4, value: 100, },
    39: { name: "Rank 200", desc: "Reached rank 200.", type: 4, value: 200, },
    40: { name: "Rank 300", desc: "Reached rank 300.", type: 4, value: 300, },
    41: { name: "Rank 400", desc: "Reached rank 400.", type: 4, value: 400, },
    42: { name: "Rank 500", desc: "Reached rank 500.", type: 4, value: 500, },
    43: { name: "Rank 600", desc: "Reached rank 600.", type: 4, value: 600, },
    44: { name: "Rank 700", desc: "Reached rank 700.", type: 4, value: 700, },
    45: { name: "Rank 800", desc: "Reached rank 800.", type: 4, value: 800, },
    46: { name: "Rank 900", desc: "Reached rank 900.", type: 4, value: 900, },
    47: { name: "Rank 1000", desc: "Reached rank 1000.", type: 4, value: 1000, },
    48: { name: "Rank 5000", desc: "Reached rank 5000.", type: 4, value: 5000, },
    49: { name: "Rank 10000", desc: "Reached rank 10000.", type: 4, value: 10000, }, //END OF TYPE 4
    50: { name: "Character 2", desc: "You have unlocked the character number 2.", type: 5, value: 2, },
    51: { name: "Character 3", desc: "You have unlocked the character number 3.", type: 5, value: 3, },
    52: { name: "Character 4", desc: "You have unlocked the character number 4.", type: 5, value: 4, },
    53: { name: "Character 5", desc: "You have unlocked the character number 5.", type: 5, value: 5, },
    54: { name: "Character 6", desc: "You have unlocked the character number 6.", type: 5, value: 6, },
    55: { name: "Character 7", desc: "You have unlocked the character number 7.", type: 5, value: 7, },
    56: { name: "Character 8", desc: "You have unlocked the character number 8.", type: 5, value: 8, },
    57: { name: "Character 9", desc: "You have unlocked the character number 9.", type: 5, value: 9, },
    58: { name: "Character 10", desc: "You have unlocked the character number 10.", type: 5, value: 10, }, //END OF TYPE 5
};

var tutorialtexts = {
    0: { title: "Presentation", text: "First of all, welcome to idleFive.<br /> I want to thank you for playing this little game that i created.<br /> IdleFive is a GTA-Like game but inside an idle game environnement.<br /> But, with a different vision and a different gameplay of the original game.", },
    1: { title: "Objective", text: "The main goal of the game is to buy every cars and weapons in the game.<br /> To do that, you have to get <div class='money'></div> by using your weapons or by doing missions.", },
    2: { title: "How to play ?", text: "You can start by clicking on the fist to make some money.<br /> After you got some cash, you can buy a weapon or start a mission to gain a lot more <div class='money'></div>.<br /> Buying an Activity will increase your rank and you need that to change your character.", },
    3: { title: "Missions", text: "This is the main mechanic of the game, they are used to automate the game.<br /> The more you have the more you get <div class='money'></div> and <div class='level'></div> but it will become more expensive.", },
    4: { title: "Weapons", text: "Weapons are used to do more damage and get 'manually' an amount of <div class='money'></div>,<br /> there is also a random quality system applied to the weapons that can raise or lower the power of the weapon.", },
    5: { title: "Character", text: "This is the prestige system of the game.<br /> Once you have the required <div class='money'></div> and rank,<br /> you can change your character and get Character Points (CP)<br /> It will cost all your Weapons, Money and Missions but you keep all your Vehicles.", },
    6: { title: "Character Skills", text: "They are used to increase your cash and damage multipliers,<br /> you need Character Points (CP) to upgrade them.", },
};

var texts = {
    sidebar: ["Success", "Statistics", "Guide", "Save", "Donate"],
    menu: ["Menu", "Weapons", "Missions", "Character", "Objectives"],
    weapons: ["Weapon", "Price", "Base Damage", "Purchase", "Roll stats", "Equip", "Equipped", "Actions"],
    missions: ["Buy", "Sell", "Level", "Value", "produce", "/s"],
    vehicles: ["Price", "adds", "of", "cash", "damage", "multiplier", "Purchase"],
    infos: ["New character slot available."],
    character: ["Change character", "You are actually using the character number", "You must reach the rank", "and get", "to switch to another character.", "You can currently get", "Character Points (CP) for your new character.", "Current prestige multiplier at", "for earnt cash & damages."],
    weapontype: ["", "Melee Weapons", "Handguns", "Shotguns", "Machine Guns", "Assault Rifles", "Sniper Rifles", "Heavy Weapons"],
    success: ["success obtained.", "Player", "Cash", "Missions", "Vehicles", "Close"],
    stats: ["Save", "Statistics", "Export", "Import", "New Account", "Close", "in your pockets.", "per second.", "per click.", "bought", "You started the", "and played for", "Current version", "Options", "Toggle backgrounds"],
};