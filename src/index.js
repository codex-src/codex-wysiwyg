import * as serviceWorker from "./serviceWorker"
import EditorApp from "EditorApp"
import React from "react"
import ReactDOM from "react-dom"

import "debug.css"

import "stylesheets/tailwind-css/tailwind.generated.css" // Takes precedence
import "stylesheets/tailwind-css/color-vars.css"
import "stylesheets/tailwind-css/em-context.css"
import "stylesheets/tailwind-css/em-context-extended.css"

import "stylesheets/prism-js/custom.css"
import "stylesheets/prism-js/language-gfm.css"

ReactDOM.render(
	<EditorApp />,
	document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
