import Editor from "../Editor"
import VirtualElement from "../VirtualElement"
import VirtualInlineElement from "../VirtualInlineElement"
import VirtualMultilineElement from "../VirtualMultilineElement"
import VirtualPosition from "../VirtualPosition"
import VirtualRange from "../VirtualRange"

describe("", () => {
	test("", () => expect(new Editor() instanceof Editor).toBeTruthy())
	test("", () => expect(new VirtualElement() instanceof VirtualElement).toBeTruthy())
	test("", () => expect(new VirtualInlineElement() instanceof VirtualInlineElement).toBeTruthy())
	test("", () => expect(new VirtualMultilineElement() instanceof VirtualMultilineElement).toBeTruthy())
	test("", () => expect(new VirtualPosition() instanceof VirtualPosition).toBeTruthy())
	test("", () => expect(new VirtualRange() instanceof VirtualRange).toBeTruthy())
})
