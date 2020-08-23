import {
	// MemoH1,
	// MemoH2,
	// MemoH3,
	// MemoH4,
	// MemoH5,
	// MemoH6,
	MemoParagraph,
} from "./Block"

import {
	A,
	Code,
	Em,
	Strike,
	Strong,
} from "./Inline"

// Maps types to components.
const componentMap = {
	// "h1": MemoH1,
	// "h2": MemoH2,
	// "h3": MemoH3,
	// "h4": MemoH4,
	// "h5": MemoH5,
	// "h6": MemoH6,
	"p":  MemoParagraph,

	"em":     Em,
	"strong": Strong,
	"code":   Code,
	"strike": Strike,
	"a":      A,
}

export default componentMap
