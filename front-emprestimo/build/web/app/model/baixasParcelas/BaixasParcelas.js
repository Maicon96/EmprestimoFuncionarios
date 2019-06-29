Ext.define("App.model.baixasParcelas.BaixasParcelas",{
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        {name: "id", type: "int", label: "ID"},
        {name: "idEmprestimo", type: "int", label: "ID Empréstimo"},
        {name: "parcela", type: "int", label: "Parcela"},        
        {name: "dataVencimento", type: "date", dateFormat: "Y-m-d", label: "Data vencimento"},
        {name: "nomeFuncionario", type: "string", label: "Funcionário"},
        {name: "valorParcela", type: "float", label: "Valor Parcela"},        
        {name: "valorPago", type: "int", label: "Valor Pago"}        
    ]
});