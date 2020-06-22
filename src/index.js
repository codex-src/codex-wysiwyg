import * as serviceWorker from "./serviceWorker"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom"

import "debug.css"
import "stylesheets/tailwind.generated.css" // Takes precedence
import "stylesheets/tailwind-color-vars.css"
import "stylesheets/tailwind-em-context-extended.css"
import "stylesheets/tailwind-em-context.css"
import "stylesheets/tailwind-group-hover-text.css"

;(() => {
	serviceWorker.unregister()
})()

ReactDOM.render(
	<App />,
	document.getElementById("root"),
)
