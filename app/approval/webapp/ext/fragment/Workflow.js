sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        getGroupHeader: function(oEvent) {
            debugger
            return new sap.m.GroupHeaderListItem({
				title: 'Level '+oEvent.key
			});
        }
    };
});
