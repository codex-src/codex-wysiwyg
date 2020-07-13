import InlineElement from "../../../model/Editor/InlineElement"
import JSONClone from "lib/json/JSONClone"
import splice from "./index"

const children = [
	new InlineElement({ value: "Hello, " }),
	new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "https://google.com" } }, value: "world" }),
	new InlineElement({ value: "!" }),
]

test("", () => {
	const spliced = JSONClone(children)
	const x = splice(spliced, 0)
	expect(x).toBe(0)
	expect(spliced[x]).toEqual(new InlineElement({ value: "Hello, " }))
})

// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 1)
// 	expect(x).toBe(1)
// 	expect(spliced[x]).toEqual({ types: [], value: "ello, " })
// })

// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 2)
// 	expect(x).toBe(1)
// 	expect(spliced[x]).toEqual({ types: [], value: "llo, " })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 3)
// 	expect(x).toBe(1)
// 	expect(spliced[x]).toEqual({ types: [], value: "lo, " })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 4)
// 	expect(x).toBe(1)
// 	expect(spliced[x]).toEqual({ types: [], value: "o, " })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 5)
// 	expect(x).toBe(1)
// 	expect(spliced[x]).toEqual({ types: [], value: ", " })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 6)
// 	expect(x).toBe(1)
// 	expect(spliced[x]).toEqual({ types: [], value: " " })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 7)
// 	expect(x).toBe(1)
// 	expect(spliced[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], value: "world", a: { href: "https://google.com" } })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 8)
// 	expect(x).toBe(2)
// 	expect(spliced[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], value: "orld", a: { href: "https://google.com" } })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 9)
// 	expect(x).toBe(2)
// 	expect(spliced[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], value: "rld", a: { href: "https://google.com" } })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 10)
// 	expect(x).toBe(2)
// 	expect(spliced[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], value: "ld", a: { href: "https://google.com" } })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 11)
// 	expect(x).toBe(2)
// 	expect(spliced[x]).toEqual({ types: ["code", "a", "strike", "strong", "em"], value: "d", a: { href: "https://google.com" } })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const x = splice(spliced, 12)
// 	expect(x).toBe(2)
// 	expect(spliced[x]).toEqual({ types: [], value: "!" })
// })
//
// test("", () => {
// 	const spliced = JSONClone(children)
// 	const length = splice(spliced, 13)
// 	expect(length).toBe(3)
// 	expect(length === spliced.length)
// })
