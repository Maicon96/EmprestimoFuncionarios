Ext.define("App.store.parcelas.Parcelas", {
    extend: "Ext.data.Store",

    requires: [
        "Ext.ux.data.proxy.JsonRest",
        "App.model.parcelas.Parcelas"
    ],
    
    model: "App.model.parcelas.Parcelas",
    pageSize: "15",
    remoteSort: true, 
    remoteFilter: true,
    proxy: {
        type: "jsonrest",
        api: {
            read: "http://localhost:8080/service/parcelas/load"        
        },
        reader: {
            type: "json", 
            rootProperty: "registros"
        },
        writer: {
            type: "json", 
            rootProperty: "registros"              
        }
    }
});