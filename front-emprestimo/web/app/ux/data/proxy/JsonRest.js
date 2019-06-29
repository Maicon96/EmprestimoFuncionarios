Ext.define('Ext.ux.data.proxy.JsonRest', {
    extend:'Ext.data.proxy.Rest',
    alias:'proxy.jsonrest',

    actionMethods : {
        create: "POST",
        read: "POST",
        update: "POST",
        destroy: "POST"
    },

    buildRequest:function (operation) {
        var request = this.callParent(arguments);

        // For documentation on jsonData see Ext.Ajax.request
        request.jsonData = request._params;
        request._params = {};
//            return false;
        return request;
    },

    /*
     * @override
     * Inherit docs. We don't apply any encoding here because
     * all of the direct requests go out as jsonData
     */
    applyEncoding: function(value){
        return value;
    }

});