import domUtils from "./index"
import newHashID from "lib/newHashID"
import React from "react"
import renderDOMTree from "lib/renderDOMTree"

test("ascendElement", () => {
	const tree1 = renderDOMTree((
		<div id={newHashID(8)}>
			<span>
				<br />
			</span>
		</div>
	))
	expect(domUtils.ascendElement(tree1.childNodes[0].childNodes[0])).toBe(tree1.childNodes[0].childNodes[0])
	const tree2 = renderDOMTree((
		<div id={newHashID(8)}>
			<span>
				Hello, world!
			</span>
		</div>
	))
	expect(domUtils.ascendElement(tree2.childNodes[0].childNodes[0])).toBe(tree2.childNodes[0])
})

test("ascendElementID", () => {
	const tree1 = renderDOMTree((
		<div id={newHashID(8)}>
			<span>
				<br />
			</span>
		</div>
	))
	expect(domUtils.ascendElementID(tree1.childNodes[0].childNodes[0])).toBe(tree1)
	const tree2 = renderDOMTree((
		<div id={newHashID(8)}>
			<span>
				Hello, world!
			</span>
		</div>
	))
	expect(domUtils.ascendElementID(tree2.childNodes[0].childNodes[0])).toBe(tree2)
})

test("nodeName", () => {
	expect(domUtils.nodeName(renderDOMTree(<br />))).toBe("br")
	expect(domUtils.nodeName(renderDOMTree("Hello, world!"))).toBe("#text")
	expect(domUtils.nodeName(renderDOMTree(<span />))).toBe("span")
	expect(domUtils.nodeName(renderDOMTree(<div />))).toBe("div")
})

test("isTextNode", () => {
	expect(domUtils.isTextNode(renderDOMTree(<br />))).not.toBeTruthy()
	expect(domUtils.isTextNode(renderDOMTree("Hello, world!"))).toBeTruthy()
	expect(domUtils.isTextNode(renderDOMTree(<span />))).not.toBeTruthy()
	expect(domUtils.isTextNode(renderDOMTree(<div />))).not.toBeTruthy()
})

test("isElement", () => {
	expect(domUtils.isElement(renderDOMTree(<br />))).toBeTruthy()
	expect(domUtils.isElement(renderDOMTree("Hello, world!"))).not.toBeTruthy()
	expect(domUtils.isElement(renderDOMTree(<span />))).toBeTruthy()
	expect(domUtils.isElement(renderDOMTree(<div />))).toBeTruthy()
})

test("isBrElement", () => {
	expect(domUtils.isBrElement(renderDOMTree(<br />))).toBeTruthy()
	expect(domUtils.isBrElement(renderDOMTree("Hello, world!"))).not.toBeTruthy()
	expect(domUtils.isBrElement(renderDOMTree(<span />))).not.toBeTruthy()
	expect(domUtils.isBrElement(renderDOMTree(<div />))).not.toBeTruthy()
})

test("isTextNodeOrBrElement", () => {
	expect(domUtils.isTextNodeOrBrElement(renderDOMTree(<br />))).toBeTruthy()
	expect(domUtils.isTextNodeOrBrElement(renderDOMTree("Hello, world!"))).toBeTruthy()
	expect(domUtils.isTextNodeOrBrElement(renderDOMTree(<span />))).not.toBeTruthy()
	expect(domUtils.isTextNodeOrBrElement(renderDOMTree(<div />))).not.toBeTruthy()
})
