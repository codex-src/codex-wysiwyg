import Element from "../../../model/Editor/Element"
import MultilineElement from "../../../model/Editor/MultilineElement"
import DblLinkedElementList from "./index"

test("Element; dbl.next", () => {
	const elements = [
		new Element(),
		new Element(),
		new Element(),
		new Element(),
	]
	const dbl = new DblLinkedElementList(elements)
	expect(dbl.prev).toEqual(null)
	expect(dbl.current).toEqual(elements[0])
	expect(dbl.next.prev).toEqual(dbl)
	expect(dbl.next.current).toEqual(elements[1])
	expect(dbl.next.next.prev).toEqual(dbl.next)
	expect(dbl.next.next.current).toEqual(elements[2])
	expect(dbl.next.next.next.prev).toEqual(dbl.next.next)
	expect(dbl.next.next.next.current).toEqual(elements[3])
	expect(dbl.next.next.next.next.prev).toEqual(dbl.next.next.next)
	expect(dbl.next.next.next.next.current).toEqual(null)
	expect(dbl.next.next.next.next.next).toEqual(null)
})

test("Element; dbl.find", () => {
	const elements = [
		new Element(),
		new Element(),
		new Element(),
		new Element(),
	]
	const dbl = new DblLinkedElementList(elements)
	expect(dbl.find(each => each.key === "")).toBe(null)
	expect(dbl.find(each => each.key === elements[0].key).current).toBe(elements[0])
	expect(dbl.find(each => each.key === elements[1].key).current).toBe(elements[1])
	expect(dbl.find(each => each.key === elements[2].key).current).toBe(elements[2])
	expect(dbl.find(each => each.key === elements[3].key).current).toBe(elements[3])
})

test("MultilineElement; dbl.next", () => {
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
	const dbl = new DblLinkedElementList(elements)
	expect(dbl.prev).toEqual(null)
	expect(dbl.current).toEqual(elements[0].props.elements[0])
	expect(dbl.next.prev).toEqual(dbl)
	expect(dbl.next.current).toEqual(elements[0].props.elements[1])
	expect(dbl.next.next.prev).toEqual(dbl.next)
	expect(dbl.next.next.current).toEqual(elements[1].props.elements[0])
	expect(dbl.next.next.next.prev).toEqual(dbl.next.next)
	expect(dbl.next.next.next.current).toEqual(elements[1].props.elements[1])
	expect(dbl.next.next.next.next.prev).toEqual(dbl.next.next.next)
	expect(dbl.next.next.next.next.current).toEqual(null)
	expect(dbl.next.next.next.next.next).toEqual(null)
})

test("MultilineElement; dbl.find", () => {
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
	const dbl = new DblLinkedElementList(elements)
	expect(dbl.find(each => each.key === "")).toBe(null)
	expect(dbl.find(each => each.key === elements[0].props.elements[0].key).current).toBe(elements[0].props.elements[0])
	expect(dbl.find(each => each.key === elements[0].props.elements[1].key).current).toBe(elements[0].props.elements[1])
	expect(dbl.find(each => each.key === elements[1].props.elements[0].key).current).toBe(elements[1].props.elements[0])
	expect(dbl.find(each => each.key === elements[1].props.elements[1].key).current).toBe(elements[1].props.elements[1])
})
