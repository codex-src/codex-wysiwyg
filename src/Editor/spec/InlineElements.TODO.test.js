// function Plaintext(value) {
// 	const ref = new InlineElement({
// 		value,
// 	})
// 	return ref
// }
//
// function Emphasis(value) {
// 	const ref = new InlineElement({
// 		types: ["em"],
// 		value,
// 	})
// 	return ref
// }
//
// function Strong(value) {
// 	const ref = new InlineElement({
// 		types: ["strong"],
// 		value,
// 	})
// 	return ref
// }
//
// function Code(value) {
// 	const ref = new InlineElement({
// 		types: ["code"],
// 		value,
// 	})
// 	return ref
// }
//
// function Strikethrough(value) {
// 	const ref = new InlineElement({
// 		types: ["strike"],
// 		value,
// 	})
// 	return ref
// }
//
// function Anchor(value, { href }) {
// 	const ref = new InlineElement({
// 		types: ["a"],
// 		props: { a: { href } },
// 		value,
// 	})
// 	return ref
// }
//
// const temp1 = new InlineElements(
// 	Plaintext("Hello ,"),
// 	Anchor("world", { href: "https://google.com" }),
// 	Plaintext("!"),
// )
