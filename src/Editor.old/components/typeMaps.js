import iota from "lib/iota"

import { // Do not sort
	Header,
	P,
	HR,
} from "./Elements"

import { // Do not sort
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "./Spans"

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
	[typeEnum.h1]: Header,
	[typeEnum.h2]: Header,
	[typeEnum.h3]: Header,
	[typeEnum.h4]: Header,
	[typeEnum.h5]: Header,
	[typeEnum.h6]: Header,
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
