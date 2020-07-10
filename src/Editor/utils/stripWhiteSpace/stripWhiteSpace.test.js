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
		<a href="https://google.com">
			world
		</a>
		!
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><p>Hello, <a href=\"https://google.com\">world</a>!</p></div>")
})

test("<p>...</p><ul><li>...</li></ul><p>...</p>", () => {
	const tree = parseTree(`
<div>
	<p>
		Hello,\u0020
		<a href="https://google.com">
			world
		</a>
		!
	</p>
	<ul>
		<li>
			Hello,\u0020
			<a href="https://google.com">
				world
			</a>
			!
		</li>
	</ul>
	<p>
		Hello,\u0020
		<a href="https://google.com">
			world
		</a>
		!
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe((
		"<div>" +
			"<p>Hello, <a href=\"https://google.com\">world</a>!</p>" +
			"<ul><li>Hello, <a href=\"https://google.com\">world</a>!</li></ul>" +
			"<p>Hello, <a href=\"https://google.com\">world</a>!</p>" +
		"</div>"
	))
})
