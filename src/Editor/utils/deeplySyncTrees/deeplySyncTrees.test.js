import deeplySyncTrees from "./deeplySyncTrees"
import React from "react"
import renderTree from "lib/renderTree"

describe("<div>{/* ... */}</div>", () => {
	test("", () => {
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
})

describe("<div><br></div>", () => {
	test("", () => {
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
	test("", () => {
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
	test("", () => {
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
})

describe("<div>Hello, world!</div>", () => {
	test("", () => {
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
	test("", () => {
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
	test("", () => {
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
})

describe("<div>Hello, <code>world</code>!</div>", () => {
	test("", () => {
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
	test("", () => {
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
	test("", () => {
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
})

describe("<div>Hello, <a href='foo'><code>world</code></a>!</div>", () => {
	test("", () => {
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
	test("", () => {
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
	test("", () => {
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
})

describe("<div>Hello, <a href='foo'><code ...>world</code></a>!</div>", () => {
	test("", () => {
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
	test("", () => {
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
	test("", () => {
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
})
