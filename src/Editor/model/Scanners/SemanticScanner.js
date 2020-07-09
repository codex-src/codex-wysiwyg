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
		Object.assign(this, {
			scanner: scanners.semantic,
		})
	}
}

export default SemanticScanner
