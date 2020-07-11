import AbstractScanner from "./AbstractScanner"
import semantic from "./semantic"

// Describes a semantic scanner; implements scanChildren and
// scanElements.
class SemanticScanner extends AbstractScanner {
	constructor() {
		super()
		const scanner = semantic
		Object.assign(this, {
			scanner,
		})
	}
}

export default SemanticScanner
