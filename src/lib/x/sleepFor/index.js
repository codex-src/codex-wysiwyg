// Sleeps for n-milliseconds.
//
// https://stackoverflow.com/a/39914235
async function sleepFor(timeoutMs) {
	await new Promise(r => setTimeout(r, timeoutMs))
}

export default sleepFor
