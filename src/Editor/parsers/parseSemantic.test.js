import parseSemantic from "./parseSemantic"
import React from "react"
import renderTree from "lib/DOM/renderTree"

test("<i>", () => {
	const el = renderTree(<i>Hello, world!</i>)
	const { type, props } = parseSemantic(el)
	expect(type).toBe("em")
	expect(props).toEqual({})
})

test("<u>", () => {
	const el = renderTree(<u>Hello, world!</u>)
	const { type, props } = parseSemantic(el)
	expect(type).toBe("em")
	expect(props).toEqual({})
})

test("<em>", () => {
	const el = renderTree(<em>Hello, world!</em>)
	const { type, props } = parseSemantic(el)
	expect(type).toBe("em")
	expect(props).toEqual({})
})

test("<b>", () => {
	const el = renderTree(<b>Hello, world!</b>)
	const { type, props } = parseSemantic(el)
	expect(type).toBe("strong")
	expect(props).toEqual({})
})

test("<strong>", () => {
	const el = renderTree(<strong>Hello, world!</strong>)
	const { type, props } = parseSemantic(el)
	expect(type).toBe("strong")
	expect(props).toEqual({})
})

test("<a href='foo'>", () => {
	const el = renderTree(<a href="foo">Hello, world!</a>)
	const { type, props } = parseSemantic(el)
	expect(type).toBe("a")
	expect(props).toEqual({ href: "foo" })
})
