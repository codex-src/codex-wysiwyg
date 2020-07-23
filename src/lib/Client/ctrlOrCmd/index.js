import userAgent from "lib/Client/userAgent"

// Shorthand for "ctrl" or "cmd".
const ctrlOrCmd = !userAgent.MacOSX ? "ctrl" : "cmd"

export default ctrlOrCmd
