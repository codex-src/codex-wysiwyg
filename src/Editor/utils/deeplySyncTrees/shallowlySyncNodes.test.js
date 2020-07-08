import React from "react"
import renderDOMTree from "lib/renderDOMTree"
import shallowlySyncNodes from "./shallowlySyncNodes"

// NOTE: Uses <div>...</div> to persist references.
test("", () => {
	const src = renderDOMTree(<div><br /></div>)
	const dst = renderDOMTree(<div><br /></div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<div>Hello, world!</div>)
	const dst = renderDOMTree(<div><br /></div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<div><br /></div>)
	const dst = renderDOMTree(<div>Hello, world!</div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<div>Hello, world!</div>)
	const dst = renderDOMTree(<div>Hello, world!</div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})
