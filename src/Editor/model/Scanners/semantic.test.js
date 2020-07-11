import React from "react"
import renderTree from "lib/renderTree"
import semantic from "./semantic"

test("<i>", () => {
	const tree = renderTree(<i>Hello, world!</i>)
	const [T, P] = semantic(tree)
	expect(T).toBe("em")
	expect(P).toEqual({})
})

test("<u>", () => {
	const tree = renderTree(<u>Hello, world!</u>)
	const [T, P] = semantic(tree)
	expect(T).toBe("em")
	expect(P).toEqual({})
})

test("<em>", () => {
	const tree = renderTree(<em>Hello, world!</em>)
	const [T, P] = semantic(tree)
	expect(T).toBe("em")
	expect(P).toEqual({})
})

test("<b>", () => {
	const tree = renderTree(<b>Hello, world!</b>)
	const [T, P] = semantic(tree)
	expect(T).toBe("strong")
	expect(P).toEqual({})
})

test("<strong>", () => {
	const tree = renderTree(<strong>Hello, world!</strong>)
	const [T, P] = semantic(tree)
	expect(T).toBe("strong")
	expect(P).toEqual({})
})

test("<a href='foo'>", () => {
	const tree = renderTree(<a href="foo">Hello, world!</a>)
	const [T, P] = semantic(tree)
	expect(T).toBe("a")
	expect(P).toEqual({ href: "foo" })
})
