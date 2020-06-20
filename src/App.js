import Editor from "Editor/Editor"
import React from "react"

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">

			<div>
				{/* ... */}
			</div>

			{/* eslint-disable jsx-a11y/anchor-is-valid */}
			<Editor>
				<h1>
					Hello, world!
				</h1>
				<p>
					hello
					<code>
						hello
						<strong>
							hello
							<em>
								hello
							</em>
							hello
						</strong>
						hello
					</code>
					hello
					<code>
						hello
						<strong>
							hello
							<em>
								hello
							</em>
							hello
						</strong>
						hello
					</code>
				</p>
				<p>
					<code>
						hello
						<strong>
							world
						</strong>
						hello
					</code>
				</p>
				<p>
					Hello,{" "}
					<a href="/#">
						<em>
							worldx
						</em>
					</a>
					<a href="abc">
						<em>
							<strong>
								worldy
							</strong>
						</em>
					</a>
					{" "}
					<a href="yolo">
						<code>
							fmt.Println("Hello, world!")
						</code>
					</a>
					<a href="dyolo">
						<code>
							fmt.Println("Hello, world!")
						</code>
					</a>
				</p>
				<p>
					<br />
				</p>
				{/* <hr /> */}
				<p>
					Hello, world!
				</p>
				<p>
				</p>
				<p>
					<br />
				</p>
			</Editor>
			{/* eslint-enable jsx-a11y/anchor-is-valid */}

		</div>
	</div>
)

export default App
