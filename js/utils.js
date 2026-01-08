const suffixes = [
	{ value: "1e3", symbol: "k", full: "thousand" }, // thousand
	{ value: "1e6", symbol: "M", full: "million" }, // million
	{ value: "1e9", symbol: "B", full: "billion" }, // billion
	{ value: "1e12", symbol: "T", full: "trillion" }, // trillion
	{ value: "1e15", symbol: "Qa", full: "quadrillion" }, // quadrillion
	{ value: "1e18", symbol: "Qi", full: "quintillion" }, // quintillion
	{ value: "1e21", symbol: "Sx", full: "sextillion" }, // sextillion
	{ value: "1e24", symbol: "Sp", full: "septillion" }, // septillion
	{ value: "1e27", symbol: "Oc", full: "octillion" }, // octillion
	{ value: "1e30", symbol: "No", full: "nonillion" }, // nonillion
	{ value: "1e33", symbol: "De", full: "decillion" }, // decillion
	{ value: "1e36", symbol: "Un", full: "undecillion" }, // undecillion
	{ value: "1e39", symbol: "Du", full: "duodecillion" }, // duodecillion
	{ value: "1e42", symbol: "Td", full: "tredecillion" }, // tredecillion
	{ value: "1e45", symbol: "QaD", full: "quattuordecillion" }, // quattuordecillion
	{ value: "1e48", symbol: "Qid", full: "quindecillion" }, // quindecillion
	{ value: "1e51", symbol: "SxD", full: "sexdecillion" }, // sexdecillion
	{ value: "1e54", symbol: "SpD", full: "septendecillion" }, // septendecillion
	{ value: "1e57", symbol: "oD", full: "octodecillion" }, // octodecillion
	{ value: "1e60", symbol: "nD", full: "novemdecillion" }, // novemdecillion
	{ value: "1e63", symbol: "V", full: "vigintillion" }, // vigintillion
	{ value: "1e66", symbol: "uV", full: "unvigintillion" }, // unvigintillion
	{ value: "1e69", symbol: "DV", full: "duovigintillion" }, // duovigintillion
	{ value: "1e72", symbol: "tV", full: "trivigintillion" }, // trivigintillion
	{ value: "1e75", symbol: "qV", full: "quattuorvigintillion" }, // quattuorvigintillion
	{ value: "1e78", symbol: "QV", full: "quinvigintillion" }, // quinvigintillion
	{ value: "1e81", symbol: "SV", full: "sexvigintillion" }, // sexvigintillion
	{ value: "1e84", symbol: "SV", full: "septenvigintillion" }, // septenvigintillion
	{ value: "1e87", symbol: "OV", full: "octovigintillion" }, // octovigintillion
	{ value: "1e90", symbol: "NV", full: "novemvigintillion" }, // novemvigintillion
	{ value: "1e93", symbol: "Dc", full: "decvigintillion" }, // decvigintillion
	{ value: "1e96", symbol: "UV", full: "undecvigintillion" }, // undecvigintillion
	{ value: "1e99", symbol: "DV", full: "duodecvigintillion" }, // duodecvigintillion
];

function formatBigNumberAbbrev(raw, decimals = 2) {
	const bn = new BigNumber(raw);

	const match = [...suffixes].reverse().find(s =>
		bn.gte(new BigNumber(s.value))
	);

	if (!match) return bn.toFixed(decimals); // no abbreviation

	const divided = bn.div(new BigNumber(match.value));
	return `${divided.toFixed(decimals)} ${match.symbol}`;
}

function formatBigNumberFull(raw, decimals = 2) {
	const bn = new BigNumber(raw);

	const match = [...suffixes].reverse().find(s =>
		bn.gte(new BigNumber(s.value))
	);

	if (!match) return bn.toFixed(decimals); // no abbreviation

	const divided = bn.div(new BigNumber(match.value));
	return `${divided.toFixed(decimals)} ${match.full}`;
}

function fix(number_raw, type) {
	const number = new BigNumber(number_raw);
	const numStr = number.toString();

	if (type == 0) return numeral(numStr).format("0");

	if (type == 1)
		if (number.eq(0.5)) {
			return "0.5";
		} else return formatBigNumberAbbrev(numStr, 2);

	if (type == 2) return formatBigNumberAbbrev(numStr, 2);

	if (type == 3) return numeral(numStr).format("0,0");
	if (type == 4) return formatBigNumberAbbrev(numStr, 0);

	if (type == 5) {
		if (number.lt(1000)) return formatBigNumberAbbrev(numStr, 0);
		else return formatBigNumberAbbrev(numStr, 1);
	}

	if (type == 6) {
		if (number.lte(1000)) return formatBigNumberAbbrev(numStr, 0);
		if (number.gt(10000)) return formatBigNumberAbbrev(numStr, 2);
		return formatBigNumberAbbrev(numStr, 1);
	}

	if (type == 7) return formatBigNumberAbbrev(numStr, 1);
	if (type == 8) return numeral(numStr).format("0.00%");
	if (type == 9) return numeral(numStr).format("0%");
	if (type == 10) return numeral(numStr).format("0.0%");

	if (type == "dynamic") {
		if (number_raw != Math.round(number_raw)) VALUE = numeral(number_raw).format("0,0.0");
		else VALUE = numeral(number_raw).format("0,0");
		return VALUE;
	}

	if (type == "full") return formatBigNumberFull(numStr, 2);
}

function getDate() {
	var today = new Date();
	var date = today.toLocaleDateString();
	var time = today.toLocaleTimeString();
	CurrentDate = date + " at " + time;
	return CurrentDate;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHHMMSS(id) {
	var sec_num = parseInt(id, 10);
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	var seconds = sec_num - hours * 3600 - minutes * 60;
	var secondstext = 0;
	var minutestext = 0;
	var hourstext = 0;
	if (hours > 0) {
		hourstext = hours + " hours ";
	} else {
		hourstext = "";
	}
	if (minutes > 0) {
		minutestext = minutes + " minutes ";
	} else {
		minutestext = "";
	}
	if (seconds > 0) {
		secondstext = seconds + " seconds ";
	} else {
		if (minutes > 0) {
			secondstext = "";
		} else {
			secondstext = "0 seconds";
		}
	}
	if (hours == 1) {
		hourstext = hours + " hour ";
	}
	if (minutes == 1) {
		minutestext = minutes + " minute ";
	}
	if (seconds == 1) {
		secondstext = seconds + " second ";
	}
	var time = hourstext + minutestext + secondstext;
	return time;
}

// Save and load functions
var canSave = 1;

var save = function () {
	if (canSave) {
		localStorage.setItem("idleFive5", JSON.stringify(p));
	}
};

function load() {
	const raw = localStorage.getItem("idleFive5");
	if (!raw) {
		// No save: start with a fresh clone of DEFAULT
		p = structuredClone(DEFAULT); // or JSON.parse(JSON.stringify(DEFAULT)) if structuredClone not available
		UpdateUI();
		return;
	}

	let savegame;
	try {
		savegame = JSON.parse(raw);
	} catch (e) {
		console.error("Failed to parse save:", e);
		// fallback: reset to defaults
		p = structuredClone(DEFAULT);
		UpdateUI();
		return;
	}

	// Clone DEFAULT so we don't mutate it
	const base = (typeof structuredClone === 'function')
		? structuredClone(DEFAULT)
		: JSON.parse(JSON.stringify(DEFAULT));

	// Merge save into base (save values overwrite defaults)
	p = deepMerge(base, savegame || {});

	// Optional: run migrations here if you need to rename fields or transform old formats
	runMigrations(p);

	UpdateUI();
}


function exportSave() {
	$("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(p)) + "</textarea>");
	var copyText = document.getElementById("saveCode");
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
	MESSAGE("Save Exported", "Your save has been copied into you clipboard.");
	$("#exportBody").html("");
}

var importSave = function () {
	var save = prompt("Paste the code previously obtained here");
	if (save) {
		restoreSave(save);
	}
};

var restoreSave = function (save) {
	try {
		var decoded = atob(save);
		JSON.parse(decoded);
		if (decoded) {
			localStorage.setItem("idleFive5", decoded);
			canSave = 0;
			location.reload();
		} else {
			$("#debugtext").html("ERROR: Invalid Save Data");
		}
	} catch (err) {
		$("#debugtext").html("ERROR: Invalid Save Data");
	}
};

var confirmReset = function () {
	var r = confirm("Do you really want to reset all your stats ?");
	if (r == true) {
		canSave = 0;
		localStorage.clear();
		location.reload();
	}
};

function truncate2(num) {
	let s = String(num);

	// If scientific notation, convert to full string
	if (s.includes("e") || s.includes("E")) {
		return num;
	}

	const dot = s.indexOf(".");
	if (dot === -1) return num;

	return Number(s.slice(0, dot + 3));
}

// Utility: deep merge where objects are merged, arrays are replaced
function deepMerge(target, source) {
	if (source == null) return target;

	for (const key of Object.keys(source)) {
		const srcVal = source[key];
		const tgtVal = target[key];

		// If both are plain objects, merge recursively
		if (isPlainObject(tgtVal) && isPlainObject(srcVal)) {
			target[key] = deepMerge({ ...tgtVal }, srcVal);
			continue;
		}

		// If source is an array, replace target with source array
		if (Array.isArray(srcVal)) {
			target[key] = srcVal.slice();
			continue;
		}

		// Otherwise use source value (covers primitives, null, functions)
		target[key] = srcVal;
	}

	return target;
}

function isPlainObject(v) {
	return v && typeof v === 'object' && !Array.isArray(v);
}

function runMigrations(state) {
  if (!state || typeof state !== 'object') return;

  state.stats = state.stats || {};

  function toNumberSafe(v) {
    if (v === null || v === undefined) return undefined;
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    if (typeof v === 'string') {
      const cleaned = v.replace(/,/g, '').trim();
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : undefined;
    }
    if (typeof v === 'boolean') return v ? 1 : 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }

  // Generic move-and-sum for keys where we want to add legacy into stats
  function moveAndSum(legacyKey, statsKey) {
    const legacyVal = toNumberSafe(state.hasOwnProperty(legacyKey) ? state[legacyKey] : undefined);
    const statsVal = toNumberSafe(state.stats.hasOwnProperty(statsKey) ? state.stats[statsKey] : undefined) || 0;

    if (legacyVal !== undefined) {
      state.stats[statsKey] = statsVal + legacyVal;
      delete state[legacyKey];
    } else if (statsVal !== undefined) {
      state.stats[statsKey] = statsVal;
    }
  }

  // Move/sum the keys you requested
  moveAndSum('TotalClicks', 'totalclicks');
  moveAndSum('CompletedQuests', 'completedquests');

  // For playTime we explicitly add legacy playTime into stats.totalplaytime
  const legacyPlay = toNumberSafe(state.hasOwnProperty('playTime') ? state.playTime : undefined);
  const curPlay = toNumberSafe(state.stats.totalplaytime) || 0;
  if (legacyPlay !== undefined) {
    state.stats.totalplaytime = curPlay + legacyPlay;
    delete state.playTime;
  } else {
    // ensure numeric if only stats value exists
    state.stats.totalplaytime = curPlay;
  }

  // spentpoints (legacy key name exactly as you specified)
  moveAndSum('spentpoints', 'spentpoints');

  // Ensure every key from DEFAULT.stats exists and is numeric
  for (const key in DEFAULT.stats) {
    if (!Object.prototype.hasOwnProperty.call(DEFAULT.stats, key)) continue;
    const cur = toNumberSafe(state.stats[key]);
    if (cur === undefined) {
      const def = toNumberSafe(DEFAULT.stats[key]);
      state.stats[key] = def !== undefined ? def : 0;
    } else {
      state.stats[key] = cur;
    }
  }

  // Basic invariants
  if (state.stats.totalclicks < 0) state.stats.totalclicks = 0;
  if (state.stats.completedquests < 0) state.stats.completedquests = 0;
  if (state.stats.totalplaytime < 0) state.stats.totalplaytime = 0;
  if (state.stats.spentpoints < 0) state.stats.spentpoints = 0;
}