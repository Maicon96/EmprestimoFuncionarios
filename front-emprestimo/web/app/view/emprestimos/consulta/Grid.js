Ext.define("App.view.emprestimos.consulta.Grid", {
    extend: "App.util.ConsultasGrid",
    alias : "widget.emprestimoConGrid",

    requires: [
        "App.util.ConsultasGrid",
        "App.store.Ordenar"
    ],
    
    controller: 'EmprestimoCon',

    nomestore: "App.store.emprestimos.Emprestimos",

    initComponent: function() {
        var me = this;     
                
        me.columns = {             
            items: [
                {                 
                    text: "ID", 
                    dataIndex: "id",                    
                    flex: 1,
                    align: "center"
                },
                {            
                    xtype: "datecolumn",
                    text: "Data Operação", 
                    dataIndex: "dataOperacao", 
                    format: "d/m/Y",
                    flex: 1,
                    align: "center"
                },
                {                 
                    text: "Funcionário", 
                    dataIndex: "idFuncionario",                    
                    flex: 1,
                    align: "center"
                },
                {                 
                    text: "Valor Empréstimo", 
                    dataIndex: "valorEmprestimo",                    
                    flex: 1,
                    align: "center"
                },
                {                 
                    text: "Quantidade Parcela", 
                    dataIndex: "quantidadeParcela",                    
                    flex: 1,
                    align: "center"
                },
                {            
                    xtype: "datecolumn",
                    text: "Data Primeira Parcela", 
                    dataIndex: "dataPrimeiraParcela", 
                    format: "d/m/Y",
                    flex: 1,
                    align: "center"
                }
//                {
//                    xtype: "templatecolumn", 
//                    text: "Filial", 
//                    dataIndex: "idFilial",
//                    flex: 1,
//                    align: "left",
//                    filter: {
//                        xtype: "textfield",
//                        vtype: "numeros"
//                    },
//                    tpl: "{idFilial} - {filial.descricao}"
//                },
//                {
//                    text: "ID", 
//                    dataIndex: "idCodigo",
//                    width: 100,
//                    align: "center",
//                    filter: {
//                        xtype: "textfield",
//                        vtype: "numeros" 
//                    }
//                },
//                {
//                    text: "Pessoa", 
//                    dataIndex: "idPessoa",
//                    width: 75,
//                    align: "center",
//                    filter: {
//                        xtype: "textfield",
//                        vtype: "numeros"
//                    },
//                    renderer: function(value, metaData, record) { 
//                        return value + "-" + record.data["pessoa.digito"];
//                    } 
//                },
//                {
//                    text: "Nome Pessoa", 
//                    dataIndex: "nome",
//                    flex: 1,
//                    filter: {
//                        xtype: "textfield"
//                    }
//                },
//                {
//                    text: "Contribuinte", 
//                    dataIndex: "tipoContribuinte",
//                    width: 150,
//                    filter: {
//                        xtype: "combo",
//                        store: Ext.create("Ext.data.ArrayStore" ,{
//                            fields: ["value", "text"],
//                            data: [
//                                [null, "Todos"],
//                                ["1", "1 - Pessoa Física"],
//                                ["2", "2 - Pessoa Jurídica"]           
//                            ]
//                        }),
//                        queryMode: "local",
//                        value: "",
//                        valueField: "value",
//                        displayField: "text",
//                        editable: false
//                    },
//                    renderer: function(value, grid) { 
//                        return renderComboboxValues({value: value, column: grid.column});
//                    }
//                },
//                {
//                    text: "CPF/CNPJ", 
//                    dataIndex: "cpfcnpj",
//                    width: 130,
//                    align: "center",
//                    filter: {
//                        xtype: "textfield",
//                        vtype: "numero"
//                    },
//                    renderer: function(value, metaData, record) { 
//                        return mascaraIF(record.data.tipoContribuinte.toString(), value);   
//                    }                    
//                },
//                {
//                    text: "Observação", 
//                    dataIndex: "observacao",
//                    flex: 1.5,
//                    hidden: true,
//                    filter: {
//                        xtype: "textfield"
//                    }
//                },
//                {
//                    text: "Situação", 
//                    dataIndex: "situacao",
//                    width: 140,
//                    filter: {
//                        xtype: "combo",
//                        store: Ext.create("Ext.data.ArrayStore" ,{
//                            fields: ["value", "text"],
//                            data: [
//                                [null, "Todos"],                                
//                                ["1", "1 - Aberto"],        
//                                ["2", "2 - Pendente"],        
//                                ["8", "8 - Inutilizado"],          
//                                ["9", "9 - Fechado"]                                
//                            ]
//                        }),
//                        queryMode: "local",
//                        value: "",
//                        valueField: "value",
//                        displayField: "text",
//                        editable: false
//                    },
//                    renderer: function(value, grid) { 
//                        return renderComboboxValues({value: value, column: grid.column});
//                    }
//                },
//                {
//                    xtype: "datecolumn",
//                    text: "Data/Hora Gravação", 
//                    dataIndex: "dataHoraGravacao",
//                    width: 150,                    
//                    align: "center",
//                    format: "d/m/Y H:i:s",
//                    hidden: true,
//                    filter: {
//                        xtype: "datefield",                        
//                        format: "d/m/Y H:i:s",
//                        submitFormat: "Y-m-d H:i:s"
//                    }
//                },
//                {
//                    xtype: "templatecolumn", 
//                    text: "Usuário", 
//                    dataIndex: "idUsuario",
//                    flex: 1,
//                    filter: {
//                        xtype: "textfield"
//                    },
//                    tpl: "{idUsuario} - {usuario.nome}"
//                }
                
            ]
        };
        me.callParent(arguments);
        
        //setColumnsHidden(me);
    }
});