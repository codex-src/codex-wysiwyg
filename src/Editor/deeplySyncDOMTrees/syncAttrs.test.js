import React from "react"
import renderDOMTree from "lib/renderDOMTree"
import syncAttrs from "./syncAttrs"

test("", () => {
	const src = renderDOMTree(<code />)
	const dst = renderDOMTree(<code />)
	syncAttrs(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	const dst = renderDOMTree(<code />)
	syncAttrs(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<code />)
	const dst = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	syncAttrs(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})

test("", () => {
	const src = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	const dst = renderDOMTree(<code autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" />)
	syncAttrs(src, dst)
	expect(src.isEqualNode(dst)).toBeTruthy()
})
