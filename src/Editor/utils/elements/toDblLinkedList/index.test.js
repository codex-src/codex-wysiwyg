import Element from "../../../model/Editor/Element"
import MultilineElement from "../../../model/Editor/MultilineElement"
import toDblLinkedList from "./index"

test("Element", () => {
	const elements = [
		new Element(),
		new Element(),
		new Element(),
		new Element(),
	]
	const list = toDblLinkedList(elements)
	expect(list.prev).toBe(null)
	expect(list.current).toBe(elements[0])
	expect(list.next.prev).toBe(list)
	expect(list.next.current).toBe(elements[1])
	expect(list.next.next.prev).toBe(list.next)
	expect(list.next.next.current).toBe(elements[2])
	expect(list.next.next.next.prev).toBe(list.next.next)
	expect(list.next.next.next.current).toBe(elements[3])
	expect(list.next.next.next.next.prev).toBe(list.next.next.next)
	expect(list.next.next.next.next.current).toBe(null)
	expect(list.next.next.next.next.next).toBe(null)
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
	const list = toDblLinkedList(elements)
	expect(list.prev).toBe(null)
	expect(list.current).toBe(elements[0].props.elements[0])
	expect(list.next.prev).toBe(list)
	expect(list.next.current).toBe(elements[0].props.elements[1])
	expect(list.next.next.prev).toBe(list.next)
	expect(list.next.next.current).toBe(elements[1].props.elements[0])
	expect(list.next.next.next.prev).toBe(list.next.next)
	expect(list.next.next.next.current).toBe(elements[1].props.elements[1])
	expect(list.next.next.next.next.prev).toBe(list.next.next.next)
	expect(list.next.next.next.next.current).toBe(null)
	expect(list.next.next.next.next.next).toBe(null)
})
