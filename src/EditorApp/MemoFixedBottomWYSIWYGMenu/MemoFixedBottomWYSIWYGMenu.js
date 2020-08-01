import JSONEqual from "lib/JSON/JSONEqual"
import React from "react"
import Transition from "lib/x/Transition"
import WYSIWYGMenu from "./WYSIWYGMenu"

function areEqual(prev, next) {
	const ok = (
		prev.readOnlyMode === next.readOnlyMode &&
		prev.focused === next.focused &&
		JSONEqual(prev.rangeTypes, next.rangeTypes)
	)
	return ok
}

const MemoFixedBottomWYSIWYGMenu = React.memo(({ readOnlyMode, focused, rangeTypes }) => (
	<Transition
		on={!readOnlyMode}
		className="transition duration-200 ease-in-out"
		from="opacity-0"
		to="opacity-100"
	>
		<aside className="px-3 py-8 fixed inset-x-0 bottom-0 pointer-events-none">
			<div className="flex flex-row justify-center">
				<div className="pointer-events-auto">
					<WYSIWYGMenu
						readOnlyMode={readOnlyMode}
						focused={focused}
						rangeTypes={rangeTypes}
					/>
				</div>
			</div>
		</aside>
	</Transition>
), areEqual)

export default MemoFixedBottomWYSIWYGMenu
