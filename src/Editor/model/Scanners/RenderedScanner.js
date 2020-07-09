import * as scanners from "./scanners"
import AbstractScanner from "./AbstractScanner"

// Describes a rendered reader; implements scan.
//
// const scanner = new RenderedScanner()
// scanner.scan(tree)
//
class RenderedScanner extends AbstractScanner {
	constructor() {
		super()
		Object.assign(this, {
			scanner: scanners.rendered,
		})
	}
}

export default RenderedScanner
