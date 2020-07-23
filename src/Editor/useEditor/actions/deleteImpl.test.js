import deleteImpl from "./deleteImpl"
import hash from "lib/x/hash"
import JSONClone from "lib/JSON/JSONClone"
import textContent from "Editor/utils/children/textContent"

const originalElements = [
	{
		key: hash(),
		props: {
			children: [
				{
					types: [],
					props: {
						children: "foo",
					},
				},
			],
		},
	},
	{
		key: hash(),
		props: {
			children: [
				{
					types: [],
					props: {
						children: "",
					},
				},
			],
		},
	},
	{
		key: hash(),
		props: {
			children: [
				{
					types: [],
					props: {
						children: "bar",
					},
				},
			],
		},
	},
]

function deepCopy() {
	return JSONClone(originalElements)
}

function innerText(elements) {
	return elements.reduce((acc, each, x) => {
		if (x) {
			acc += "\n"
		}
		acc += textContent(each.props.children)
		return acc
	}, "")
}

test("[]foo\\n\\nbar", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[0].key,
				offset: 0,
			},
			end: {
				key: elements[0].key,
				offset: 0,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("foo\n\nbar")
})

test("[foo]\\n\\nbar", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[0].key,
				offset: 0,
			},
			end: {
				key: elements[0].key,
				offset: 3,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("\n\nbar")
})

test("[foo\\n]\\nbar", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[0].key,
				offset: 0,
			},
			end: {
				key: elements[1].key,
				offset: 0,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("\nbar")
})

test("[foo\\n\\n]bar", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[0].key,
				offset: 0,
			},
			end: {
				key: elements[2].key,
				offset: 0,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("bar")
})

test("[foo\\n\\nbar]", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[0].key,
				offset: 0,
			},
			end: {
				key: elements[2].key,
				offset: 3,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("")
})

test("foo\\n\\nbar[]", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[2].key,
				offset: 3,
			},
			end: {
				key: elements[2].key,
				offset: 3,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("foo\n\nbar")
})

test("foo\\n\\n[bar]", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[2].key,
				offset: 0,
			},
			end: {
				key: elements[2].key,
				offset: 3,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("foo\n\n")
})

test("foo\\n[\\nbar]", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[1].key,
				offset: 0,
			},
			end: {
				key: elements[2].key,
				offset: 3,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("foo\n")
})

test("foo[\\n\\nbar]", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[0].key,
				offset: 3,
			},
			end: {
				key: elements[2].key,
				offset: 3,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("foo")
})

test("[foo\\n\\nbar]", () => {
	const elements = deepCopy()
	const state = {
		elements,
		range: {
			start: {
				key: elements[0].key,
				offset: 0,
			},
			end: {
				key: elements[2].key,
				offset: 3,
			},
			collapsed() {
				const ok = (
					this.start === this.end ||
					(this.start.key === this.end.key && this.start.offset === this.end.offset)
				)
				return ok
			},
		},
	}
	deleteImpl(state)()
	expect(innerText(elements)).toBe("")
})
