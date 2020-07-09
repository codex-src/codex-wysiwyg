// Describes an inline element.
export class InlineElement {
	// Zero or more types.
	types = []
	// Zero or more props.
	props = {}
	// Character data.
	value = ""

	constructor({ types, props, value } = {}) {
		Object.assign(this, {
			types: types || [],
			props: props || {},
			value: value || "",
		})
	}

	defer() {
		// ...
	}
}

// Describes an array of inline elements.
export class InlineElements extends Array {
	// Converts to intermediary React elements.
	toIntermediaryReact() {
		// ...
	}

	// Converts to React elements.
	toReact() {
		// ...
	}

	defer() {
		// ...
	}
}

// export function Plaintext(value) {
// 	const ref = new InlineElement({
// 		value,
// 	})
// 	return ref
// }
//
// export function Emphasis(value) {
// 	const ref = new InlineElement({
// 		types: ["em"],
// 		value,
// 	})
// 	return ref
// }
//
// export function Strong(value) {
// 	const ref = new InlineElement({
// 		types: ["strong"],
// 		value,
// 	})
// 	return ref
// }
//
// export function Code(value) {
// 	const ref = new InlineElement({
// 		types: ["code"],
// 		value,
// 	})
// 	return ref
// }
//
// export function Strikethrough(value) {
// 	const ref = new InlineElement({
// 		types: ["strike"],
// 		value,
// 	})
// 	return ref
// }
//
// export function Anchor(value, { href }) {
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
