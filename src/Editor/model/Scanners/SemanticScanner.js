import AbstractScanner from "./AbstractScanner"
import semantic from "./semantic"

// Describes a semantic scanner; implements scan.
//
// const scanner = new SemanticScanner()
// scanner.scan(tree)
//
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
