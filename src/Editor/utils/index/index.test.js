import index from "./index"
import JSONClone from "lib/JSON/JSONClone"

const originalChildren = [
	{ types: [], props: { children: "Hello, " } },
	{ types: [{ type: "code", props: null }], props: { children: "world" } },
	{ types: [], props: { children: "!" } },
]

function deepCopy() {
	return JSONClone(originalChildren)
}

test("offset=0", () => {
	const children = deepCopy()
	const x = index(children, 0)
	expect(x).toBe(0)
	expect(children[x]).toEqual({ types: [], props: { children: "Hello, " } })
})

test("offset=1", () => {
	const children = deepCopy()
	const x = index(children, 1)
	expect(x).toBe(1)
	expect(children[x]).toEqual({ types: [], props: { children: "ello, " } })
})

test("offset=2", () => {
	const children = deepCopy()
	const x = index(children, 2)
	expect(x).toBe(1)
	expect(children[x]).toEqual({ types: [], props: { children: "llo, " } })
})

test("offset=3", () => {
	const children = deepCopy()
	const x = index(children, 3)
	expect(x).toBe(1)
	expect(children[x]).toEqual({ types: [], props: { children: "lo, " } })
})

test("offset=4", () => {
	const children = deepCopy()
	const x = index(children, 4)
	expect(x).toBe(1)
	expect(children[x]).toEqual({ types: [], props: { children: "o, " } })
})

test("offset=5", () => {
	const children = deepCopy()
	const x = index(children, 5)
	expect(x).toBe(1)
	expect(children[x]).toEqual({ types: [], props: { children: ", " } })
})

test("offset=6", () => {
	const children = deepCopy()
	const x = index(children, 6)
	expect(x).toBe(1)
	expect(children[x]).toEqual({ types: [], props: { children: " " } })
})

test("offset=7", () => {
	const children = deepCopy()
	const x = index(children, 7)
	expect(x).toBe(1)
	expect(children[x]).toEqual({ types: [{ type: "code", props: null }], props: { children: "world" } })
})

test("offset=8", () => {
	const children = deepCopy()
	const x = index(children, 8)
	expect(x).toBe(2)
	expect(children[x]).toEqual({ types: [{ type: "code", props: null }], props: { children: "orld" } })
})

test("offset=9", () => {
	const children = deepCopy()
	const x = index(children, 9)
	expect(x).toBe(2)
	expect(children[x]).toEqual({ types: [{ type: "code", props: null }], props: { children: "rld" } })
})

test("offset=10", () => {
	const children = deepCopy()
	const x = index(children, 10)
	expect(x).toBe(2)
	expect(children[x]).toEqual({ types: [{ type: "code", props: null }], props: { children: "ld" } })
})

test("offset=11", () => {
	const children = deepCopy()
	const x = index(children, 11)
	expect(x).toBe(2)
	expect(children[x]).toEqual({ types: [{ type: "code", props: null }], props: { children: "d" } })
})

test("offset=12", () => {
	const children = deepCopy()
	const x = index(children, 12)
	expect(x).toBe(2)
	expect(children[x]).toEqual({ types: [], props: { children: "!" } })
})

test("offset=13", () => {
	const children = deepCopy()
	const x = index(children, 13)
	expect(x).toBe(3)
	expect(x === children.length)
})
