// Creates an iota epoch and increments by 1 on every
// subsequent every invocation.
//
// const i = iota()
// i() // 0
// i() // 1
// i() // 2
// i() // 3
//
function iota(start = 0) {
	let epoch = start
	const i = () => {
		const value = epoch
		epoch++
		return value
	}
	return i
}

export default iota
