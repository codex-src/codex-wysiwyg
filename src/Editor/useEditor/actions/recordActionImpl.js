// Records an action. No-ops actions sooner than 200ms.
const recordActionImpl = e => actionType => {
	const now = Date.now()
	if (actionType === "select" && now - e.lastActionTimestamp < 200) {
		// No-op
		return
	}
	e.lastActionTimestamp = now
	e.lastAction = actionType
}

export default recordActionImpl
