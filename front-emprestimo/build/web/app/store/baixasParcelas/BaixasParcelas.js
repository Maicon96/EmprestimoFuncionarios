Ext.define("App.store.baixasParcelas.BaixasParcelas", {
    extend: "Ext.data.Store",

    requires: [
        "Ext.ux.data.proxy.JsonRest",
        "App.model.baixasParcelas.BaixasParcelas"
    ],
    
    model: "App.model.baixasParcelas.BaixasParcelas",
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