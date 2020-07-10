import React from "react"
import rendered from "./rendered"
import renderTree from "lib/renderTree"

test("<i>", () => {
	const tree = renderTree(<i>Hello, world!</i>)
	const [T, P] = rendered(tree)
	expect(T).toBe("em")
	expect(P).toEqual({})
})

test("<u>", () => {
	const tree = renderTree(<u>Hello, world!</u>)
	const [T, P] = rendered(tree)
	expect(T).toBe("em")
	expect(P).toEqual({})
})

test("<span data-type='em'>", () => {
	const tree = renderTree(<span data-type="em">Hello, world!</span>)
	const [T, P] = rendered(tree)
	expect(T).toBe("em")
	expect(P).toEqual({})
})

test("<b>", () => {
	const tree = renderTree(<b>Hello, world!</b>)
	const [T, P] = rendered(tree)
	expect(T).toBe("strong")
	expect(P).toEqual({})
})

test("<span data-type='strong'>", () => {
	const tree = renderTree(<span data-type="strong">Hello, world!</span>)
	const [T, P] = rendered(tree)
	expect(T).toBe("strong")
	expect(P).toEqual({})
})

test("<span data-type='a' data-props='{ href: 'https://google.com' }'>", () => {
	const tree = renderTree(<span data-type="a" data-props={JSON.stringify({ href: "https://google.com" })}>Hello, world!</span>)
	const [T, P] = rendered(tree)
	expect(T).toBe("a")
	expect(P).toEqual({ href: "https://google.com" })
})
