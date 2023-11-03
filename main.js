(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
	<html>
	<body>
    <select id="dynamic-dropdown">
        /*<option value="" disabled selected>Select an item</option>*/
    </select>
    <script src="script.js"></script>
	</body>
	</html>

		<style>
		#dynamic-dropdown {
			width: 200px;
			padding: 10px;
		}
		</style> 
	`;

	class DropDown extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});

			var items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

			// Get the select element
			var dropdown = shadowRoot.getElementById("dynamic-dropdown");

			fetch('./data.json')
			.then(response => response.json()) // Parse the response as JSON
			.then(data => {
				// Now you can access the data as a JavaScript object
				console.log("data"+data);
			})
			.catch(error => {
				console.error('Error loading JSON file:', error);
			});
			// Populate the dropdown with items
			items.forEach((item) => {
				const option = document.createElement("option");
				option.text = item;
				option.value = item;
				dropdown.appendChild(option);
			});

			// Event listener to handle the selection
			dropdown.addEventListener("change", function() {
				var selectedValue = this.value;
				if (selectedValue) {
					alert("You selected: " + selectedValue);
				}
			});

			
			this._props = {};

		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
		}
	}

	customElements.define("com-sap-sample-dropdown", DropDown);
})();