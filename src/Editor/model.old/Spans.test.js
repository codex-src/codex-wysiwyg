// import concat from "./concat"
//
// test("plaintext (1 of 2)", () => {
// 	const spans = [
// 		{ types: [], text: "Hello, world!" },
// 	]
// 	concat(spans)
// 	expect(spans).toEqual([{ types: [], text: "Hello, world!" }])
// })
//
// test("plaintext (2 of 2)", () => {
// 	const spans = [
// 		{ types: [], text: "Hello, " },
// 		{ types: [], text: "world" },
// 		{ types: [], text: "!" },
// 	]
// 	concat(spans)
// 	expect(spans).toEqual([{ types: [], text: "Hello, world!" }])
// })
//
// test("rich text", () => {
// 	const spans = [
// 		{ types: [], text: "Hello, " },
// 		{ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } },
// 		{ types: [], text: "!" },
// 	]
// 	concat(spans)
// 	expect(spans).toEqual([
// 		{ types: [], text: "Hello, " },
// 		{ types: ["code", "a", "strike", "strong", "em"], text: "world", a: { href: "https://google.com" } },
// 		{ types: [], text: "!" },
// 	])
// })
