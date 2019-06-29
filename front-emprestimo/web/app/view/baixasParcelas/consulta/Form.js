Ext.define("App.view.baixasParcelas.consulta.Form", {
    extend: "Ext.form.Panel", 
    alias : "widget.baixaParcelaConForm",
    
    controller: 'BaixaParcelaCon',
    
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
        
        me.items = [
            
            {
                xtype: "datefield",
                fieldLabel: "Data Inicial",
                width: 280,
                allowBlank: false,
                name: "dataInicial",
                enableKeyEvents: true,
                format: "d/m/Y",
                submitFormat: "Y-m-d"
            },            
            {
                xtype: "datefield",
                fieldLabel: "Data Final",
                name: "dataFinal",
                width: 280,
                allowBlank: false,                
                format: "d/m/Y",
                submitFormat: "Y-m-d"
            },
            {
                xtype: "grid",
                store: Ext.create("App.store.parcelas.BaixasParcelas"),
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
                            text: "ID Empréstimo", 
                            dataIndex: "idEmprestimo",                    
                            width: 100,
                            align: "center"
                        },                 
                        {                 
                            text: "Funcionário", 
                            dataIndex: "nomeFuncionario",                    
                            flex: 1,
                            align: "center"
                        },
                        {            
                            xtype: "datecolumn",
                            text: "Data Vencimento", 
                            dataIndex: "dataVencimento", 
                            format: "d/m/Y",
        //                    flex: 1,
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