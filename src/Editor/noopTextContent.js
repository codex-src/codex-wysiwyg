// Compares whether two strings are equal.
function areEqual(str1, str2) {
	const ok = (
		str1.length === str2.length &&
		str1 === str2
	)
	return ok
}

// No-ops redundant text content (domNode.textContent and
// domNode.nodeValue) when used as a setter.
//
// https://github.com/facebook/react/issues/11538#issuecomment-417504600
// https://github.com/facebook/react/blob/master/packages/react-dom/src/client/setTextContent.js
function noopTextContent() {
	if (typeof Node === "function" && Node.prototype) {
		const { set: nodeValueSetter } = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue")
		Object.defineProperty(Node.prototype, "nodeValue", {
			set(nodeValue) {
				if (areEqual(this.nodeValue, nodeValue)) {
					// No-op
					return
				}
				return nodeValueSetter.apply(this, arguments)
			},
		})
		const { set: textContentSetter } = Object.getOwnPropertyDescriptor(Node.prototype, "textContent")
		Object.defineProperty(Node.prototype, "textContent", {
			set(textContent) {
				if (areEqual(this.textContent, textContent)) {
					// No-op
					return
				}
				return textContentSetter.apply(this, arguments)
			},
		})
	}
}

export default noopTextContent
