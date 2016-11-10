sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller) {
	"use strict";

	return Controller.extend("md_namespace.controller.Welcome", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf md_namespace.view.welcome
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf md_namespace.view.welcome
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf md_namespace.view.welcome
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf md_namespace.view.welcome
		 */
		//	onExit: function() {
		//
		//	}
		
		onPress: function () {
		// The source is the list item that got pressed
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						
			oRouter.navTo("app");          
			//oRouter.getRoute("singleDetail").attachPatternMatched(this._onObjectMatched, this);
		}

	});

});