// No-ops redundant text node rerenders.
//
// https://github.com/facebook/react/issues/11538#issuecomment-417504600
// https://github.com/facebook/react/blob/master/packages/react-dom/src/client/setTextContent.js
function noopTextNodeRerenders() {
	if (!(typeof Node === "function" && Node.prototype)) {
		// No-op
		return
	}
	// Node.nodeValue:
	const { set: nodeValueSetter } = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue")
	Object.defineProperty(Node.prototype, "nodeValue", {
		set(nextNodeValue) {
			if (this.nodeValue !== nextNodeValue) {
				// No-op
				return
			}
			nodeValueSetter.apply(this, arguments)
		},
	})
	// Node.textContent:
	const { set: textContentSetter } = Object.getOwnPropertyDescriptor(Node.prototype, "textContent")
	Object.defineProperty(Node.prototype, "textContent", {
		set(nextTextContent) {
			if (this.textContent !== nextTextContent) {
				// No-op
				return
			}
			textContentSetter.apply(this, arguments)
		},
	})
}

export default noopTextNodeRerenders
