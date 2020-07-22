import parseRendered from "./parseRendered"
import React from "react"
import renderTree from "lib/DOM/renderTree"

test("<i>", () => {
	const el = renderTree(<i>Hello, world!</i>)
	const { type, props } = parseRendered(el)
	expect(type).toBe("em")
	expect(props).toBe(null)
})

test("<u>", () => {
	const el = renderTree(<u>Hello, world!</u>)
	const { type, props } = parseRendered(el)
	expect(type).toBe("em")
	expect(props).toBe(null)
})

test("<span data-type='em'>", () => {
	const el = renderTree(<span data-type="em">Hello, world!</span>)
	const { type, props } = parseRendered(el)
	expect(type).toBe("em")
	expect(props).toBe(null)
})

test("<b>", () => {
	const el = renderTree(<b>Hello, world!</b>)
	const { type, props } = parseRendered(el)
	expect(type).toBe("strong")
	expect(props).toBe(null)
})

test("<span data-type='strong'>", () => {
	const el = renderTree(<span data-type="strong">Hello, world!</span>)
	const { type, props } = parseRendered(el)
	expect(type).toBe("strong")
	expect(props).toBe(null)
})

test("<span data-type='a' data-props='{ 'href': 'foo' }'>", () => {
	const el = renderTree(<span data-type="a" data-props={JSON.stringify({ href: "foo" })}>Hello, world!</span>)
	const { type, props } = parseRendered(el)
	expect(type).toBe("a")
	expect(props).toEqual({ href: "foo" })
})