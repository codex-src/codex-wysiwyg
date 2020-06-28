import types from "./types"

import { // Do not sort
	Em,
	Strong,
	Strike,
	Code,
	A,
} from "./components-text"

import { // Do not sort
	P,
	// ...
} from "./components"

const typeMap = {
	[types.em]:     Em,
	[types.strong]: Strong,
	[types.strike]: Strike,
	[types.code]:   Code,
	[types.a]:      A,

	[types.p]: P,
}

export default typeMap
