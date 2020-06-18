import merge from "./children/merge"
import parse from "./intermediary/parse"
import React from "react"
import sort from "./children/sort"

const Editor = ({ children }) => {

	const intermediary = React.useMemo(() => {
		return parse(children).map(each => {
			switch ("<" + each.type + ">") {
			case "<h1>":
			case "<h2>":
			case "<h3>":
			case "<h4>":
			case "<h5>":
			case "<h6>":
				merge(each.props.children).map(each => sort(each))
				break
			case "<p>":
				merge(each.props.children).map(each => sort(each))
				break
			case "<hr>":
				// No-op
				break
			default:
				throw new Error("unknown type")
			}
			return each
		})
	}, [children])

	return (
		<div>
			{children}
			<div className="whitespace-pre text-xs font-mono" style={{ tabSize: 2 }}>
				{JSON.stringify(intermediary, null, "\t")}
			</div>
		</div>
	)
}

export default Editor
