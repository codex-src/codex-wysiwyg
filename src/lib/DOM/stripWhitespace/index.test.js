import parseTree from "lib/DOM/parseTree"
import stripWhitespace from "./index"

test("<p><!-- ... --></p>", () => {
	const tree = parseTree(`
<article>
	<p>
		<!-- ... -->
	</p>
</article>
`)
	stripWhitespace(tree)
	expect(tree.outerHTML).toBe("<article><p><!-- ... --></p></article>")
})

test("<p><br></p>", () => {
	const tree = parseTree(`
<article>
	<p>
		<br>
	</p>
</article>
`)
	stripWhitespace(tree)
	expect(tree.outerHTML).toBe("<article><p><br></p></article>")
})

test("<p>Hello, world!</p>", () => {
	const tree = parseTree(`
<article>
	<p>
		Hello, world!
	</p>
</article>
`)
	stripWhitespace(tree)
	expect(tree.outerHTML).toBe("<article><p>Hello, world!</p></article>")
})

test("<p>Hello, <a href='foo'>world</a>!</p>", () => {
	const tree = parseTree(`
<article>
	<p>
		Hello,\u0020
		<a href="foo">
			world
		</a>
		!
	</p>
</article>
`)
	stripWhitespace(tree)
	expect(tree.outerHTML).toBe("<article><p>Hello, <a href=\"foo\">world</a>!</p></article>")
})

test("<ul><li>Hello, <a href='foo'>world</a>!</li></ul>", () => {
	const tree = parseTree(`
<article>
	<ul>
		<li>
			Hello,\u0020
			<a href="foo">
				world
			</a>
			!
		</li>
	</ul>
</article>
`)
	stripWhitespace(tree)
	expect(tree.outerHTML).toBe("<article><ul><li>Hello, <a href=\"foo\">world</a>!</li></ul></article>")
})
