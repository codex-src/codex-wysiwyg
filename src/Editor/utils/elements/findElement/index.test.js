import Element from "../../../model/Editor/Element"
import findElement from "./index"
import MultilineElement from "../../../model/Editor/MultilineElement"

test("elements[^]", () => {
	const elements = [
		new Element(), // <-
		new Element(),
	]
	const el = elements[0]
	expect(findElement(elements, each => each.key === el.key)).toBe(el)
	expect(el.props).toBeTruthy()
	expect(el.props.children).toBeTruthy()
})

test("elements[$]", () => {
	const elements = [
		new Element(),
		new Element(), // <-
	]
	const el = elements.slice(-1)[0]
	expect(findElement(elements, each => each.key === el.key)).toBe(el)
	expect(el.props).toBeTruthy()
	expect(el.props.children).toBeTruthy()
})

test("elements[^].props.elements[^]", () => {
	const elements = [
		new MultilineElement({
			type: "ul",
			props: {
				elements: [
					new Element({ type: "li" }), // <-
					new Element({ type: "li" }),
				],
			},
		}),
		new MultilineElement({
			type: "ul",
			props: {
				elements: [
					new Element({ type: "li" }),
					new Element({ type: "li" }),
				],
			},
		}),
	]
	const el = elements[0].props.elements[0]
	expect(findElement(elements, each => each.key === el.key)).toBe(el)
	expect(el.props).toBeTruthy()
	expect(el.props.children).toBeTruthy()
})

test("elements[$].props.elements[$]", () => {
	const elements = [
		new MultilineElement({
			type: "ul",
			props: {
				elements: [
					new Element({ type: "li" }),
					new Element({ type: "li" }),
				],
			},
		}),
		new MultilineElement({
			type: "ul",
			props: {
				elements: [
					new Element({ type: "li" }),
					new Element({ type: "li" }), // <-
				],
			},
		}),
	]
	const el = elements.slice(-1)[0].props.elements.slice(-1)[0]
	expect(findElement(elements, each => each.key === el.key)).toBe(el)
	expect(el.props).toBeTruthy()
	expect(el.props.children).toBeTruthy()
})
