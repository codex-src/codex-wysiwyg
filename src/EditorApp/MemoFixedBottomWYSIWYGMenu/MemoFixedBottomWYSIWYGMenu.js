import JSONEqual from "lib/JSON/JSONEqual"
import React from "react"
import Transition from "lib/x/Transition"
import WYSIWYGMenu from "./WYSIWYGMenu"

const MemoFixedBottomWYSIWYGMenu = React.memo(({ readOnlyMode, rangeTypes }) => (
	<Transition
		on={!readOnlyMode}
		className="transition duration-200 ease-in-out"
		from="opacity-0"
		to="opacity-100"
	>
		<div className="px-3 py-8 fixed inset-x-0 bottom-0 pointer-events-none">
			<div className="flex flex-row justify-center">
				<div className="pointer-events-auto">
					<WYSIWYGMenu rangeTypes={rangeTypes} />
				</div>
			</div>
		</div>
	</Transition>
), (prev, next) => {
	const ok = (
		prev.readOnlyMode === next.readOnlyMode &&
		JSONEqual(prev.rangeTypes, next.rangeTypes)
	)
	return ok
})

export default MemoFixedBottomWYSIWYGMenu
