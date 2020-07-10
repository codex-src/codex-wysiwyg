import { // Unsorted
	Em,
	Strong,
	Strike,
	Code,
	A,
} from "./components-text"

import { // Unsorted
	P,
} from "./components"

// Maps types to components.
const renderMap = {
	"em":     Em,
	"strong": Strong,
	"strike": Strike,
	"code":   Code,
	"a":      A,

	"p": P,
}

export default renderMap
