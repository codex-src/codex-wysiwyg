import domUtils from "./index"
import hash from "lib/hash"
import React from "react"
import renderTree from "lib/renderTree"

test("ascendElement", () => {
	const domTree1 = renderTree((
		<div id={hash(8)}>
			<span>
				<br />
			</span>
		</div>
	))
	expect(domUtils.ascendElement(domTree1.childNodes[0].childNodes[0])).toBe(domTree1.childNodes[0].childNodes[0])
	const domTree2 = renderTree((
		<div id={hash(8)}>
			<span>
				Hello, world!
			</span>
		</div>
	))
	expect(domUtils.ascendElement(domTree2.childNodes[0].childNodes[0])).toBe(domTree2.childNodes[0])
})

test("ascendElementID", () => {
	const domTree1 = renderTree((
		<div id={hash(8)}>
			<span>
				<br />
			</span>
		</div>
	))
	expect(domUtils.ascendElementID(domTree1.childNodes[0].childNodes[0])).toBe(domTree1)
	const domTree2 = renderTree((
		<div id={hash(8)}>
			<span>
				Hello, world!
			</span>
		</div>
	))
	expect(domUtils.ascendElementID(domTree2.childNodes[0].childNodes[0])).toBe(domTree2)
})

test("nodeName", () => {
	expect(domUtils.nodeName(renderTree(<br />))).toBe("br")
	expect(domUtils.nodeName(renderTree("Hello, world!"))).toBe("#text")
	expect(domUtils.nodeName(renderTree(<span />))).toBe("span")
	expect(domUtils.nodeName(renderTree(<div />))).toBe("div")
})

test("isTextNode", () => {
	expect(domUtils.isTextNode(renderTree(<br />))).not.toBeTruthy()
	expect(domUtils.isTextNode(renderTree("Hello, world!"))).toBeTruthy()
	expect(domUtils.isTextNode(renderTree(<span />))).not.toBeTruthy()
	expect(domUtils.isTextNode(renderTree(<div />))).not.toBeTruthy()
})

test("isElement", () => {
	expect(domUtils.isElement(renderTree(<br />))).toBeTruthy()
	expect(domUtils.isElement(renderTree("Hello, world!"))).not.toBeTruthy()
	expect(domUtils.isElement(renderTree(<span />))).toBeTruthy()
	expect(domUtils.isElement(renderTree(<div />))).toBeTruthy()
})

test("isBrElement", () => {
	expect(domUtils.isBrElement(renderTree(<br />))).toBeTruthy()
	expect(domUtils.isBrElement(renderTree("Hello, world!"))).not.toBeTruthy()
	expect(domUtils.isBrElement(renderTree(<span />))).not.toBeTruthy()
	expect(domUtils.isBrElement(renderTree(<div />))).not.toBeTruthy()
})

test("isTextNodeOrBrElement", () => {
	expect(domUtils.isTextNodeOrBrElement(renderTree(<br />))).toBeTruthy()
	expect(domUtils.isTextNodeOrBrElement(renderTree("Hello, world!"))).toBeTruthy()
	expect(domUtils.isTextNodeOrBrElement(renderTree(<span />))).not.toBeTruthy()
	expect(domUtils.isTextNodeOrBrElement(renderTree(<div />))).not.toBeTruthy()
})
