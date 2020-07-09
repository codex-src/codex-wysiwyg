import * as scanners from "./scanners"
import AbstractScanner from "./AbstractScanner"

// Describes a rendered scanner; implements scan.
//
// const scanner = new RenderedScanner()
// scanner.scan(tree)
//
class RenderedScanner extends AbstractScanner {
	constructor() {
		super()
		const scanner = scanners.rendered
		Object.assign(this, {
			scanner,
		})
	}
}

export default RenderedScanner
