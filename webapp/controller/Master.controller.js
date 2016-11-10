sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/MessageToast',
	'sap/ui/core/Fragment',
	"sap/ui/model/json/JSONModel"
], function(Controller, Router, Filter, FilterOperator, MessageToast, Fragment, JSONModel) {
	"use strict";
	return Controller.extend("md_namespace.controller.Master", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf md_namespace.view.Master
		 */
		onInit: function() {
			this.filter=new Filter();
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf md_namespace.view.Master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf md_namespace.view.Master
		 */
		//	onAfterRendering: function() {
		//
		//	},
		_getDialog : function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("md_namespace.view.Dialog", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		handleOpenDialogFilter: function () {
			this._getDialog().open("filter");
		},
		handleConfirm: function (oEvent) {
			var parameters = oEvent.getParameters();
			var filterString = parameters.filterString;
			if (parameters.sortItem) { var sortKey = parameters.sortItem.getKey(); }
			var filterItems = parameters.filterItems;
			var tempFilter =[];
			var that=this;
			
			if (filterString) {
				MessageToast.show(oEvent.getParameters().filterString);
			}
			if (filterItems.length !== 0) {
				filterItems.forEach(function(element) {
					var fieldName=element.getBindingInfo("text").parts[0].path;
					var fieldValue=element.getProperty("text");
					that.applyFilter(fieldName, fieldValue, tempFilter);
				});
				that.filter = new Filter(tempFilter,false);
				// filter binding
				var oList = this.getView().byId("objectsList");
				var oBinding = oList.getBinding("items");
				oBinding.filter(that.filter);
			}
			if (sortKey) {
				this.sortOnPress(parameters);
			}
		},
		
		applyFilter: function(fieldName, fieldValue, filter) {
			if (fieldValue) {
				filter.push(new Filter(fieldName, FilterOperator.Contains, fieldValue));
			}
		},
		
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf md_namespace.view.Master
		 */
		//	onExit: function() {
		//
		//	}
		onFilterList: function (oEvent) {
			// build filter array
			var that=this;
			var localResult;
			var sQuery = oEvent.getParameter("newValue"); //query
			var oList = this.getView().byId("objectsList");
			var oBinding = oList.getBinding("items");
			if (sQuery) {
				localResult = new Filter([ 
	              		new Filter("FirstName", FilterOperator.Contains, sQuery),
						new Filter("LastName", FilterOperator.Contains, sQuery)
					], false);
				if((that.filter.oValue1 !== undefined) || (that.filter.oValue2 !== undefined)) {
					localResult = new Filter ([localResult,that.filter],true);
				}
			}
			else {
				that.filter=new Filter();
			}
			
			// filter binding
			oBinding.filter(localResult);
		},
		onPress: function (oEvent) {
		// The source is the list item that got pressed
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						
			oRouter.navTo("detail", {
		    	invoicePath: oEvent.getSource().getSelectedItem().getBindingContext("invoice").getPath().substr(1)
			});          
			
		},
		sortOnPress: function (parameters) {
		//  The source is the list item that got pressed and the function sort it
			var oList = this.getView().byId("objectsList");
			var oBinding = oList.getBinding("items");
			var SORTKEY=parameters.sortItem.getKey();
	        var DESCENDING = parameters.sortDescending;
	        var GROUP = false;
	        var aSorter = [];
	
	        aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUP));
	        oBinding.sort(aSorter);
		}

	});
});