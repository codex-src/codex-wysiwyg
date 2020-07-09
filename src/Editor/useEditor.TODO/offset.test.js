import JSONClone from "lib/JSONClone"
import offset from "./offset"

const spans = [
	{ types: [], text: "Hello, " },
	{ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } },
	{ types: [], text: "!" },
]

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 0)
	expect(x).toBe(0)
	expect(cloned[x]).toEqual({ types: [], text: "Hello, " })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 1)
	expect(x).toBe(1)
	expect(cloned[x]).toEqual({ types: [], text: "ello, " })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 2)
	expect(x).toBe(1)
	expect(cloned[x]).toEqual({ types: [], text: "llo, " })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 3)
	expect(x).toBe(1)
	expect(cloned[x]).toEqual({ types: [], text: "lo, " })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 4)
	expect(x).toBe(1)
	expect(cloned[x]).toEqual({ types: [], text: "o, " })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 5)
	expect(x).toBe(1)
	expect(cloned[x]).toEqual({ types: [], text: ", " })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 6)
	expect(x).toBe(1)
	expect(cloned[x]).toEqual({ types: [], text: " " })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 7)
	expect(x).toBe(1)
	expect(cloned[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 8)
	expect(x).toBe(2)
	expect(cloned[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], text: "orld", a: { href: "https://google.com" } })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 9)
	expect(x).toBe(2)
	expect(cloned[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], text: "rld", a: { href: "https://google.com" } })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 10)
	expect(x).toBe(2)
	expect(cloned[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], text: "ld", a: { href: "https://google.com" } })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 11)
	expect(x).toBe(2)
	expect(cloned[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], text: "d", a: { href: "https://google.com" } })
})

test("", () => {
	const cloned = JSONClone(spans)
	const x = offset(cloned, 12)
	expect(x).toBe(2)
	expect(cloned[x]).toEqual({ types: [], text: "!" })
})

test("", () => {
	const cloned = JSONClone(spans)
	const length = offset(cloned, 13)
	expect(length).toBe(3)
	expect(length === cloned.length)
})
