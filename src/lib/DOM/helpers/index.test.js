import helpers from "./index"
import newHash from "lib/x/newHash"
import React from "react"
import renderTree from "lib/DOM/renderTree"

test("ascendElement(...)", () => {
	const domTree1 = renderTree((
		<div id={newHash()}>
			<span>
				<br />
			</span>
		</div>
	))
	expect(helpers.ascendElement(domTree1.childNodes[0].childNodes[0])).toBe(domTree1.childNodes[0].childNodes[0])
	const domTree2 = renderTree((
		<div id={newHash()}>
			<span>
				Hello, world!
			</span>
		</div>
	))
	expect(helpers.ascendElement(domTree2.childNodes[0].childNodes[0])).toBe(domTree2.childNodes[0])
})

test("ascendElementID(...)", () => {
	const domTree1 = renderTree((
		<div id={newHash()}>
			<span>
				<br />
			</span>
		</div>
	))
	expect(helpers.ascendElementID(domTree1.childNodes[0].childNodes[0])).toBe(domTree1)
	const domTree2 = renderTree((
		<div id={newHash()}>
			<span>
				Hello, world!
			</span>
		</div>
	))
	expect(helpers.ascendElementID(domTree2.childNodes[0].childNodes[0])).toBe(domTree2)
})

test("nodeName(...)", () => {
	expect(helpers.nodeName(renderTree(<br />))).toBe("br")
	expect(helpers.nodeName(renderTree("Hello, world!"))).toBe("#text")
	expect(helpers.nodeName(renderTree(<span />))).toBe("span")
	expect(helpers.nodeName(renderTree(<div />))).toBe("div")
})

test("isTextNode(...)", () => {
	expect(helpers.isTextNode(renderTree(<br />))).not.toBeTruthy()
	expect(helpers.isTextNode(renderTree("Hello, world!"))).toBeTruthy()
	expect(helpers.isTextNode(renderTree(<span />))).not.toBeTruthy()
	expect(helpers.isTextNode(renderTree(<div />))).not.toBeTruthy()
})

test("isElement(...)", () => {
	expect(helpers.isElement(renderTree(<br />))).toBeTruthy()
	expect(helpers.isElement(renderTree("Hello, world!"))).not.toBeTruthy()
	expect(helpers.isElement(renderTree(<span />))).toBeTruthy()
	expect(helpers.isElement(renderTree(<div />))).toBeTruthy()
})

test("isBrElement(...)", () => {
	expect(helpers.isBrElement(renderTree(<br />))).toBeTruthy()
	expect(helpers.isBrElement(renderTree("Hello, world!"))).not.toBeTruthy()
	expect(helpers.isBrElement(renderTree(<span />))).not.toBeTruthy()
	expect(helpers.isBrElement(renderTree(<div />))).not.toBeTruthy()
})

test("isTextNodeOrBrElement(...)", () => {
	expect(helpers.isTextNodeOrBrElement(renderTree(<br />))).toBeTruthy()
	expect(helpers.isTextNodeOrBrElement(renderTree("Hello, world!"))).toBeTruthy()
	expect(helpers.isTextNodeOrBrElement(renderTree(<span />))).not.toBeTruthy()
	expect(helpers.isTextNodeOrBrElement(renderTree(<div />))).not.toBeTruthy()
})
