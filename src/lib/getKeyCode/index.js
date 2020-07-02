// ASCII map; maps keys to key codes.
//
// https://keycode.info
const keyMap = {
	"Escape":     27,

	"`":          192,
	"1":          49,
	"2":          50,
	"3":          51,
	"4":          52,
	"5":          53,
	"6":          54,
	"7":          55,
	"8":          56,
	"9":          57,
	"0":          48,
	"-":          189,
	"=":          187,
	"Backspace":  8,
	"Delete":     46,

	"Tab":        9,
	"Q":          81,
	"W":          87,
	"E":          69,
	"R":          82,
	"T":          84,
	"Y":          89,
	"U":          85,
	"I":          73,
	"O":          79,
	"P":          80,
	"[":          219,
	"]":          221,
	"\\":         220,

	"CapsLock":   20,
	"A":          65,
	"S":          83,
	"D":          68,
	"F":          70,
	"G":          71,
	"H":          72,
	"J":          74,
	"K":          75,
	"L":          76,
	";":          186,
	"'":          222,
	"Enter":      13,

	"Shift":      16,
	"Z":          90,
	"X":          88,
	"C":          67,
	"V":          86,
	"B":          66,
	"N":          78,
	"M":          77,
	",":          188,
	".":          190,
	"/":          191,

	"Control":    17,
	"Alt":        18,
	"Meta":       91,
	"Space":      32,
	"ArrowLeft":  37,
	"ArrowUp":    38,
	"ArrowDown":  40,
	"ArrowRight": 39,
}

// Accesses keyMap for a key.
function getKeyCode(key) {
	const keyCode = keyMap[key]
	if (keyCode === undefined) {
		throw new Error(`getKeyCode: no such key; key=${key}`)
	}
	return keyCode
}

export default getKeyCode
