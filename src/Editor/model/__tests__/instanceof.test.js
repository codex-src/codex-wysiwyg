import Editor from "../Editor"
import VirtualElement from "../VirtualElement"
import VirtualInlineElement from "../VirtualInlineElement"
import VirtualMultilineElement from "../VirtualMultilineElement"
import VirtualPosition from "../VirtualPosition"
import VirtualRange from "../VirtualRange"

test("", () => {
	expect(new Editor() instanceof Editor).toBeTruthy()
	expect(new VirtualElement() instanceof VirtualElement).toBeTruthy()
	expect(new VirtualInlineElement() instanceof VirtualInlineElement).toBeTruthy()
	expect(new VirtualMultilineElement() instanceof VirtualMultilineElement).toBeTruthy()
	expect(new VirtualPosition() instanceof VirtualPosition).toBeTruthy()
	expect(new VirtualRange() instanceof VirtualRange).toBeTruthy()
})
