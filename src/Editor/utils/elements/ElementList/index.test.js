import Element from "../../../model/Editor/Element"
import ElementList from "./index"
import MultilineElement from "../../../model/Editor/MultilineElement"

test("Element", () => {
	const elements = [
		new Element(),
		new Element(),
	]
	const el1 = elements[0]
	const el2 = elements.slice(-1)[0]
	expect(new ElementList(...elements).find(each => "")).toBe(null)
	expect(new ElementList(...elements).find(each => each.key === el1.key)).toBe(el1)
	expect(new ElementList(...elements).find(each => each.key === el2.key)).toBe(el2)
})

test("MultilineElement", () => {
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
					new Element({ type: "li" }),
				],
			},
		}),
	]
	const el1 = elements[0].props.elements[0]
	const el2 = elements.slice(-1)[0].props.elements.slice(-1)[0]
	expect(new ElementList(...elements).find(each => "")).toBe(null)
	expect(new ElementList(...elements).find(each => each.key === el1.key)).toBe(el1)
	expect(new ElementList(...elements).find(each => each.key === el2.key)).toBe(el2)
})
