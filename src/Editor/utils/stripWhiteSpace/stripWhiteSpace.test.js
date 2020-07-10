import parseTree from "lib/parseTree"
import stripWhiteSpace from "./stripWhiteSpace"

test("<!-- ... -->", () => {
	const tree = parseTree(`
<div>
	<!-- ... -->
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><!-- ... --></div>")
})

test("<p><!-- ... --></p>", () => {
	const tree = parseTree(`
<div>
	<p>
		<!-- ... -->
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><p><!-- ... --></p></div>")
})

test("<p><br></p>", () => {
	const tree = parseTree(`
<div>
	<p>
		<br>
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><p><br></p></div>")
})

test("<p>...</p>", () => {
	const tree = parseTree(`
<div>
	<p>
		Hello, world!
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><p>Hello, world!</p></div>")
})

test("<p>...</p><ul><li>...</li></ul><p>...</p>", () => {
	const tree = parseTree(`
<div>
	<p>
		Hello,\u0020
	</p>
	<ul>
		<li>
			world
		</li>
	</ul>
	<p>
		!
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><p>Hello, </p><ul><li>world</li></ul><p>!</p></div>")
})
