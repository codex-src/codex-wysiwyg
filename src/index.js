import * as serviceWorker from "./serviceWorker"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom"

import "stylesheets/tailwind.generated.css"

ReactDOM.render(
	<App />,
	document.getElementById("root"),
)

serviceWorker.unregister()
