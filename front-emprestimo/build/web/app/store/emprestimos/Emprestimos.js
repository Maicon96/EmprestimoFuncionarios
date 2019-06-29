Ext.define("App.store.emprestimos.Emprestimos", {
    extend: "Ext.data.Store",

    requires: [
        "Ext.ux.data.proxy.JsonRest",
        "App.model.emprestimos.Emprestimos"
    ],
    
    model: "App.model.emprestimos.Emprestimos",
    pageSize: "15",
    remoteSort: true, 
    remoteFilter: true,
    proxy: {
        type: "jsonrest",
        api: {
            read: "http://localhost:8080/service/emprestimos/load"        
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