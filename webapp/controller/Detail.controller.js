sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	 "sap/ui/Device"
], function(Controller, History, Device) {
	"use strict";

	return Controller.extend("md_namespace.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf md_namespace.view.Detail
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);        
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").invoicePath,
				model: "invoice"
			});
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		},
		onPress: function (oEvent) {
		// The source is the list item that got pressed
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("singleDetail", {
		    	invoicePath: oEvent.getSource().getBindingContext("invoice").getPath().substr(1)
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf md_namespace.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf md_namespace.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf md_namespace.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});