import parseTree from "./index"
import stripWhitespace from "lib/DOM/stripWhitespace"

test("parseTree(...)", () => {
	const tree = parseTree(`
<h1>
	Hello,\u0020
	<code>
		world
	</code>
	!
</h1>
`, stripWhitespace)
	expect(tree.outerHTML).toBe("<h1>Hello, <code>world</code>!</h1>")
})
