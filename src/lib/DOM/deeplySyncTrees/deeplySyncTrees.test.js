import deeplySyncTrees from "./deeplySyncTrees"
import React from "react"
import renderTree from "lib/DOM/renderTree"

test("<div>{/* ... */}</div>", () => {
	const src = renderTree((
		<div id="a">
			{/* ... */}
		</div>
	))
	const dst = renderTree((
		<div id="b">
			{/* ... */}
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div><br></div> (1 of 3)", () => {
	const src = renderTree((
		<div id="a">
			<br />
		</div>
	))
	const dst = renderTree((
		<div id="b">
			{/* ... */}
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div><br></div> (2 of 3)", () => {
	const src = renderTree((
		<div id="a">
			{/* ... */}
		</div>
	))
	const dst = renderTree((
		<div id="b">
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div><br></div> (3 of 3)", () => {
	const src = renderTree((
		<div id="a">
			<br />
		</div>
	))
	const dst = renderTree((
		<div id="b">
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, world!</div> (1 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello, world!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, world!</div> (2 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello, world!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, world!</div> (3 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello, world!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			Hello, world!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <code>world</code> (1 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <code>world</code> (2 of 3)", () => {
	const src = renderTree((
		<div id="a">
			<br />
		</div>
	))
	const dst = renderTree((
		<div id="b">
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <code>world</code> (3 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <a href='foo'><code>world</code></a>!</div> (1 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello,{" "}
			<a href="foo">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <a href='foo'><code>world</code></a>!</div> (2 of 3)", () => {
	const src = renderTree((
		<div id="a">
			<br />
		</div>
	))
	const dst = renderTree((
		<div id="b">
			Hello,{" "}
			<a href="foo">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <a href='foo'><code>world</code></a>!</div> (3 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello,{" "}
			<a href="foo">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			Hello,{" "}
			<a href="foo">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <a href='foo'><code ...>world</code></a>!</div> (1 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello,{" "}
			<a href="foo">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <a href='foo'><code ...>world</code></a>!</div> (2 of 3)", () => {
	const src = renderTree((
		<div id="a">
			<br />
		</div>
	))
	const dst = renderTree((
		<div id="b">
			Hello,{" "}
			<a href="foo">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})

test("<div>Hello, <a href='foo'><code ...>world</code></a>!</div> (3 of 3)", () => {
	const src = renderTree((
		<div id="a">
			Hello,{" "}
			<a href="foo">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderTree((
		<div id="b">
			Hello,{" "}
			<a href="foo">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.innerHTML).toEqual(dst.innerHTML)
})
