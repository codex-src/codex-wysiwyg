import * as Range from "./index"
import hash from "lib/x/hash"

const throwMsg = "serializes to the same string"

test("collapseStart(...)", () => {
	const id1 = hash()
	const id2 = hash()
	const range = {
		start: {
			key: id1,
			offset: 0,
		},
		end: {
			key: id2,
			offset: 0,
		},
		collapsed() {
			const ok = (
				this.start === this.end ||
				(this.start.key === this.end.key && this.start.offset === this.end.offset)
			)
			return ok
		},
	}
	expect(() => {
		expect(Range.collapseStart(range)()).toEqual({
			start: {
				key: id1,
				offset: 0,
			},
			end: {
				key: id1,
				offset: 0,
			},
			collapsed() {
				// ...
			},
		})
	}).toThrow(throwMsg)
})

test("collapseEnd(...)", () => {
	const id1 = hash()
	const id2 = hash()
	const range = {
		start: {
			key: id1,
			offset: 0,
		},
		end: {
			key: id2,
			offset: 0,
		},
		collapsed() {
			const ok = (
				this.start === this.end ||
				(this.start.key === this.end.key && this.start.offset === this.end.offset)
			)
			return ok
		},
	}
	expect(() => {
		expect(Range.collapseEnd(range)()).toEqual({
			start: {
				key: id2,
				offset: 0,
			},
			end: {
				key: id2,
				offset: 0,
			},
			collapsed() {
				// ...
			},
		})
	}).toThrow(throwMsg)
})
