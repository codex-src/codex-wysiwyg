import AbstractScanner from "./AbstractScanner"
import rendered from "./rendered"

// Describes a rendered scanner; implements scanChildren and
// scanElements.
class RenderedScanner extends AbstractScanner {
	constructor() {
		super()
		const scanner = rendered
		Object.assign(this, {
			scanner,
		})
	}
}

export default RenderedScanner
