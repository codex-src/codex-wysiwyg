import React from "react"
import renderDOMTree from "lib/renderDOMTree"
import { syncDOMAttributes } from "./deeplySyncDOMTrees"

test("", () => {
	const src = renderDOMTree(<code />)
	const dst = renderDOMTree(<code />)
	syncDOMAttributes(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	const dst = renderDOMTree(<code />)
	syncDOMAttributes(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<code />)
	const dst = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	syncDOMAttributes(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	const dst = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	syncDOMAttributes(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})
