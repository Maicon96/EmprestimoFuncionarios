Ext.define("App.view.baixasParcelas.consulta.Window" ,{
    extend: "Ext.window.Window",
    alias: "widget.baixaParcelaConWindow",
    
    requires: [
        "App.view.baixasParcelas.consulta.Form"
    ],
    
    controller: 'BaixaParcelaCon',

    title: 'Baixa de Parcelas',    
    width: 700,
    height: 400,
    layout: 'fit',
    
    initComponent: function() {
        var me = this;
        
        me.params = {};
        
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaults: {
                minWidth: 50
            },
            items: [{ 
                xtype: 'button', 
                text: 'Buscar Parcelas',
                name: 'BtnBuscarParcelas',
                handler: 'botaoTopBarBuscarParcelas'
            },
            { 
                xtype: 'button', 
                text: 'Baixar Parcela',
                name: 'BtnBaixar',
                handler: 'botaoTopBarBaixar'            
            }]
        }],
            
        me.items = [
            {
                xtype: "baixaParcelaConForm",
                anchor: "100% 100%",
                params: me.params
            }
        ];
        me.callParent(arguments);
    }
});    
