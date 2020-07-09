import React from "react"
import renderTree from "lib/renderTree"
import shallowlySyncNodes from "./shallowlySyncNodes"

// NOTE: Uses <div>...</div> to persist references.
test("", () => {
	const src = renderTree(<div><br /></div>)
	const dst = renderTree(<div><br /></div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree(<div>Hello, world!</div>)
	const dst = renderTree(<div><br /></div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree(<div><br /></div>)
	const dst = renderTree(<div>Hello, world!</div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderTree(<div>Hello, world!</div>)
	const dst = renderTree(<div>Hello, world!</div>)
	shallowlySyncNodes(src.childNodes[0], dst.childNodes[0])
	expect(src.isEqualNode(dst)).toBeTruthy()
})
