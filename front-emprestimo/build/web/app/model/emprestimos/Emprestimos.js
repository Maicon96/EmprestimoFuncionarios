Ext.define("App.model.emprestimos.Emprestimos",{
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        {name: "id", type: "int", label: "ID"},
        {name: "dataOperacao", type: "date", dateFormat: "Y-m-d", label: "Data Operação"},
        {name: "idFuncionario", type: "int", label: "Funcionário"},
        {name: "valorEmprestimo", type: "float", label: "Valor Empréstimo"},
        {name: "quantidadeParcela", type: "int", label: "Quantidade Parcela"},
        {name: "dataPrimeiraParcela", type: "date", dateFormat: "Y-m-d", label: "Data Primeira Parcela"}
    ]
});