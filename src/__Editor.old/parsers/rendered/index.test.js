import parseRenderedElement from "./index"
import React from "react"
import renderTree from "lib/DOM/renderTree"

test("<i>", () => {
	const el = renderTree(<i>Hello, world!</i>)
	const { type, props } = parseRenderedElement(el)
	expect(type).toBe("em")
	expect(props).toEqual({})
})

test("<u>", () => {
	const el = renderTree(<u>Hello, world!</u>)
	const { type, props } = parseRenderedElement(el)
	expect(type).toBe("em")
	expect(props).toEqual({})
})

test("<span data-type='em'>", () => {
	const el = renderTree(<span data-type="em">Hello, world!</span>)
	const { type, props } = parseRenderedElement(el)
	expect(type).toBe("em")
	expect(props).toEqual({})
})

test("<b>", () => {
	const el = renderTree(<b>Hello, world!</b>)
	const { type, props } = parseRenderedElement(el)
	expect(type).toBe("strong")
	expect(props).toEqual({})
})

test("<span data-type='strong'>", () => {
	const el = renderTree(<span data-type="strong">Hello, world!</span>)
	const { type, props } = parseRenderedElement(el)
	expect(type).toBe("strong")
	expect(props).toEqual({})
})

test("<span data-type='a' data-props='{ 'href': 'foo' }'>", () => {
	const el = renderTree(<span data-type="a" data-props={JSON.stringify({ href: "foo" })}>Hello, world!</span>)
	const { type, props } = parseRenderedElement(el)
	expect(type).toBe("a")
	expect(props).toEqual({ href: "foo" })
})
