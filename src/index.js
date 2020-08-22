import * as serviceWorker from "./serviceWorker"
import EditorApp from "EditorApp"
import React from "react"
import ReactDOM from "react-dom"

import "debug.css"

import "css/prism-js/custom-theme.css"
import "css/prism-js/lang-gfm.css"
import "css/prism-js/lang-html.css"

import "css/tailwind-css/tailwind.generated.css" // Takes precedence
import "css/tailwind-css/color-vars.css"
import "css/tailwind-css/em-context.css"
// import "css/tailwind-css/group-hover.css"

import "css/custom.css"

ReactDOM.render(
	<EditorApp />,
	document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
