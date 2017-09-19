import React from "react";
import { render} from "react-dom";
import BoxAir from "./components/BoxAir";
import Register from "./components/Register";


render(
		<div>
			<BoxAir/>	
		</div>,
		document.getElementById("app-react")
);
render(
		<div>
			<Register/>	
		</div>,
		document.getElementById("regis")
);