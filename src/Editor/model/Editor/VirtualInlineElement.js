// Describes a virtual inline element.
class VirtualInlineElement {
	// Zero-to-many types.
	types = []
	// Zero-to-many props.
	props = {}
	// Character data.
	value = ""

	constructor({ types, props, value } = {}) {
		Object.assign(this, {
			types: types || [],
			props: props || {},
			value: value || "",
		})
	}
}

export default VirtualInlineElement
