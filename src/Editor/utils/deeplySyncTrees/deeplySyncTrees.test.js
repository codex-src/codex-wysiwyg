import deeplySyncTrees from "./deeplySyncTrees"
import React from "react"
import renderTree from "lib/renderTree"

test("", () => {
	const src = renderTree((
		<div>
			{/* ... */}
		</div>
	))
	const dst = renderTree((
		<div>
			{/* ... */}
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			<br />
		</div>
	))
	const dst = renderTree((
		<div>
			{/* ... */}
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			{/* ... */}
		</div>
	))
	const dst = renderTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			<br />
		</div>
	))
	const dst = renderTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			Hello, world!
		</div>
	))
	const dst = renderTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			Hello, world!
		</div>
	))
	const dst = renderTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			Hello, world!
		</div>
	))
	const dst = renderTree((
		<div>
			Hello, world!
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	const dst = renderTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			<br />
		</div>
	))
	const dst = renderTree((
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
	const src = renderTree((
		<div>
			Hello,{" "}
			<code>
				world
			</code>
			!
		</div>
	))
	const dst = renderTree((
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
	const src = renderTree((
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
	const dst = renderTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			<br />
		</div>
	))
	const dst = renderTree((
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
	const src = renderTree((
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
	const dst = renderTree((
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
	const src = renderTree((
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
	const dst = renderTree((
		<div>
			<br />
		</div>
	))
	deeplySyncTrees(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree((
		<div>
			<br />
		</div>
	))
	const dst = renderTree((
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
	const src = renderTree((
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
	const dst = renderTree((
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
