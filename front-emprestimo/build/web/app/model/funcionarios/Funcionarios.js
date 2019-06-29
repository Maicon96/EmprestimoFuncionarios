Ext.define("App.model.funcionarios.Funcionarios",{
    extend: "Ext.data.Model",
    idProperty: "id",
    fields: [
        {name: "id", type: "int", label: "ID"},
        {name: "nome", type: "string", label: "Nome"},
        {name: "cpf", type: "string", label: "CPF"},
        {name: "setor", type: "string", label: "Setor"},
        {name: "cargo", type: "string", label: "Cargo"},
        {name: "dataAdmissao", type: "date", dateFormat: "Y-m-d", label: "Data Admissão"}
    ]
});