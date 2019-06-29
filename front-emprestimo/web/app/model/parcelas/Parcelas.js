Ext.define("App.model.parcelas.Parcelas",{
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        {name: "id", type: "int", label: "ID"},        
        {name: "dataVencimento", type: "date", dateFormat: "Y-m-d", label: "Data vencimento"},        
        {name: "valorParcela", type: "float", label: "Valor Parcela"},                
        {name: "valorPago", type: "float", label: "Valor Pago"}                
    ]
});