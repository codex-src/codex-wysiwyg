import { // Unsorted
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "./components-text"

import { // Unsorted
	P,
} from "./components"

// Maps types to components.
const componentMap = {
	"em":     Em,
	"strong": Strong,
	"code":   Code,
	"strike": Strike,
	"a":      A,

	"p": P,
}

export default componentMap
