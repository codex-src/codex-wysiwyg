import parseTree from "lib/parseTree"
import stripWhiteSpace from "./stripWhiteSpace"

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

test("<p>...</p> (1 of 2)", () => {
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

test("<p>...</p> (2 of 2)", () => {
	const tree = parseTree(`
<div>
	<p>
		Hello,\u0020
		world
		!
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
		world
		!
	</p>
	<ul>
		<li>
			Hello,\u0020
			world
			!
		</li>
	</ul>
	<p>
		Hello,\u0020
		world
		!
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><p>Hello, world!</p><ul><li>Hello, world!</li></ul><p>Hello, world!</p></div>")
})
