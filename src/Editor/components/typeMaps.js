import iota from "lib/iota"

import {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	P,
	HR,
} from "./components"

import {
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "./text-components"

// Sorted based on render precedence.
export const typeEnum = {
	"h1": "h1",
	"h2": "h2",
	"h3": "h3",
	"h4": "h4",
	"h5": "h5",
	"h6": "h6",
	"p":  "p",
	"hr": "hr",

	"a":      "a",
	"code":   "code",
	"strike": "strike",
	"strong": "strong",
	"em":     "em",
}

// Sorted based on render precedence.
export const typeMap = {
	[typeEnum.h1]: H1,
	[typeEnum.h2]: H2,
	[typeEnum.h3]: H3,
	[typeEnum.h4]: H4,
	[typeEnum.h5]: H5,
	[typeEnum.h6]: H6,
	[typeEnum.p]:  P,
	[typeEnum.hr]: HR,

	[typeEnum.a]:      A,
	[typeEnum.code]:   Code,
	[typeEnum.strike]: Strike,
	[typeEnum.strong]: Strong,
	[typeEnum.em]:     Em,
}

const i = iota()

// Sorted based on render precedence.
export const sortedTypeMap = {
	[typeEnum.h1]: i(),
	[typeEnum.h2]: i(),
	[typeEnum.h3]: i(),
	[typeEnum.h4]: i(),
	[typeEnum.h5]: i(),
	[typeEnum.h6]: i(),
	[typeEnum.p]:  i(),
	[typeEnum.hr]: i(),

	// Sorted based on render precedence.
	[typeEnum.a]:      i(),
	[typeEnum.code]:   i(),
	[typeEnum.strike]: i(),
	[typeEnum.strong]: i(),
	[typeEnum.em]:     i(),
}
