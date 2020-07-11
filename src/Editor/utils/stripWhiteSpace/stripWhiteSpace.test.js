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

test("<p>Hello, world!</p>", () => {
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

test("<p>Hello, <a href='foo'>world</a>!</p>", () => {
	const tree = parseTree(`
<div>
	<p>
		Hello,\u0020
		<a href="foo">
			world
		</a>
		!
	</p>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><p>Hello, <a href=\"foo\">world</a>!</p></div>")
})

test("<ul><li>Hello, <a href='foo'>world</a>!</li></ul>", () => {
	const tree = parseTree(`
<div>
	<ul>
		<li>
			Hello,\u0020
			<a href="foo">
				world
			</a>
			!
		</li>
	</ul>
</div>
`)
	stripWhiteSpace(tree)
	expect(tree.outerHTML).toBe("<div><ul><li>Hello, <a href=\"foo\">world</a>!</li></ul></div>")
})
