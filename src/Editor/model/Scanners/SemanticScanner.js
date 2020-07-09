import * as scanners from "./scanners"
import AbstractScanner from "./AbstractScanner"

// Describes a semantic reader; implements scan.
//
// const scanner = new SemanticScanner()
// scanner.scan(tree)
//
class SemanticScanner extends AbstractScanner {
	constructor() {
		super()
		const scanner = scanners.semantic
		Object.assign(this, {
			scanner,
		})
	}
}

export default SemanticScanner
