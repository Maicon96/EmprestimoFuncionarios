Ext.define("App.store.parcelas.BaixasParcelas", {
    extend: "Ext.data.Store",

    requires: [
        "Ext.ux.data.proxy.JsonRest",
        "App.model.parcelas.BaixasParcelas"
    ],
    
    model: "App.model.parcelas.BaixasParcelas",
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