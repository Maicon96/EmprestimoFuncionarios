Ext.define("App.store.funcionarios.Funcionarios", {
    extend: "Ext.data.Store",

    requires: [
        "Ext.ux.data.proxy.JsonRest",
        "App.model.funcionarios.Funcionarios"
    ],
    
    model: "App.model.funcionarios.Funcionarios",
    pageSize: "15",
    remoteSort: true, 
    remoteFilter: true,
    crossDomain: true,
    proxy: {
        type: "jsonrest",
        api: {
            read: "http://localhost:8080/service/funcionarios/load"            
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