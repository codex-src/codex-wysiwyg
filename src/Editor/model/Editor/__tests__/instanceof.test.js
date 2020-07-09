import Editor from "../Editor"
import Element from "../Element"
import InlineElement from "../InlineElement"
import MultilineElement from "../MultilineElement"
import Position from "../Position"
import Range from "../Range"

describe("", () => {
	test("", () => expect(new Editor() instanceof Editor).toBeTruthy())
	test("", () => expect(new Element() instanceof Element).toBeTruthy())
	test("", () => expect(new InlineElement() instanceof InlineElement).toBeTruthy())
	test("", () => expect(new MultilineElement() instanceof MultilineElement).toBeTruthy())
	test("", () => expect(new Position() instanceof Position).toBeTruthy())
	test("", () => expect(new Range() instanceof Range).toBeTruthy())
})
