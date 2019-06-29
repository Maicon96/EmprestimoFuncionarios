Ext.define("App.view.emprestimos.cadastro.Form", {
    extend: "Ext.form.Panel", 
    alias : "widget.emprestimoCadForm",
    
    controller: 'EmprestimoCad',
    
    bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    
    initComponent: function() {
        var me = this;
        Ext.apply(me.fieldDefaults, {
            labelWidth: 115,
            labelAlign: 'left'
        });
        
//        var conFuncionarios = clone(formButtonConsultar);
//        conFuncionarios.name = "conFuncionarios";
//        conFuncionarios.tooltip = "Consulta Funcionários";
        
        me.items = [
            {
                xtype: "textfield",
                fieldLabel: "ID",
                width: 50,
                name: "id",
                readOnly: true
            },
            {
                xtype: "datefield",
                fieldLabel: "Data Operação",
                width: 280,
                allowBlank: false,
                name: "dataOperacao",
                enableKeyEvents: true,
                format: "d/m/Y",
                submitFormat: "Y-m-d"
            },
//            {
//                xtype: "textfield",
//                fieldLabel: "Funcionario",
//                name: "idFuncionario",
//                width: 280,
//                allowBlank: false                
//            },
            {
                xtype: "fieldcontainer",
                fieldLabel: "<b>Funcionário</b>",
                layout: "hbox",                
                items: [
                    {
                        xtype: "textfield",
                        name: "idFuncionario",                        
                        allowBlank: false,
                        width: 85
                    }, 
//                        conFuncionarios,
                    { 
                        xtype: "splitter"
                    },                    
                    {
                        xtype: "textfield",
                        name: "nomeFuncionario",
                        readOnly: true,
                        flex: 1
                    }   
                ]            
            },
            {
                xtype: "textfield",
                fieldLabel: "Valor Empréstimo",
                name: "valorEmprestimo",
                width: 280,
                allowBlank: false,
                renderer: me.precoRender
            },
            {
                xtype: "textfield",
                fieldLabel: "Quantidade Parcela",
                name: "quantidadeParcela",
                width: 280,
                allowBlank: false                
            },
            {
                xtype: "datefield",
                fieldLabel: "Data Primeira Parcela",
                name: "dataPrimeiraParcela",
                width: 280,
                allowBlank: false,                
                format: "d/m/Y",
                submitFormat: "Y-m-d"
            },            
            {
                xtype: "grid",
                store: Ext.create("App.store.parcelas.Parcelas"),
                sorters: [
                    {property: "codigoProduto", direction: "ASC"}
                ],
                selModel: {
                    mode: "MULTI", 
                    selType: "checkboxmodel"
                },
                columns: {
                    items: [
                        {                 
                            text: "ID Parcela", 
                            dataIndex: "id",                    
                            width: 70,
                            align: "center"
                        },                        
                        {            
                            xtype: "datecolumn",
                            text: "Data Vencimento", 
                            dataIndex: "dataVencimento", 
                            format: "d/m/Y",
                            width: 120,
                            align: "center"
                        },                        
                        {                 
                            text: "Valor Parcela", 
                            dataIndex: "valorParcela",                    
                            width: 120,
                            align: "right",
                            renderer: me.precoRender
                        },
                        {                 
                            text: "Valor Pago", 
                            dataIndex: "valorPago",                    
                            width: 120,
                            align: "right",
                            renderer: me.precoRender
                        }   
                    ]
                }
            }
          
        ];
        me.callParent(arguments);
    },
    
    precoRender: function(val) {               
        return Ext.util.Format.number(val, "0,0.00");	
    }
});