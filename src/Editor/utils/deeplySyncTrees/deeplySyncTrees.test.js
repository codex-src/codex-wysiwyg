import deeplySyncTrees from "./deeplySyncTrees"
import React from "react"
import renderDOMTree from "lib/renderDOMTree"

test("", () => {
	const src = renderDOMTree((
		<div>
			{/* ... */}
		</div>
	))
	const dst = renderDOMTree((
		<div>
			{/* ... */}
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			<br />
		</div>
	))
	const dst = renderDOMTree((
		<div>
			{/* ... */}
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			{/* ... */}
		</div>
	))
	const dst = renderDOMTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			<br />
		</div>
	))
	const dst = renderDOMTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello, world!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello, world!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello, world!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			Hello, world!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			<br />
		</div>
	))
	const dst = renderDOMTree((
		<div>
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			<br />
		</div>
	))
	const dst = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code>
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			<br />
		</div>
	))
	const dst = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	const dst = renderDOMTree((
		<div>
			Hello,{" "}
			<a href="https://google.com">
				<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false">
					world
				</code>
			</a>
			!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})
