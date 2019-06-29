Ext.define("App.view.funcionarios.consulta.Window" ,{
    extend: "Ext.window.Window",
    alias: "widget.funcionarioConWindow",

    requires: [
        "App.view.funcionarios.consulta.Grid"
    ],
    
    controller: 'FuncionarioCon',

    title: 'Funcionários Consulta',
    width: 800,
    height: 400,
    layout: 'fit',
//    maximized: true,

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
                text: 'Novo',
                name: 'BtnNovo',
                handler: 'botaoTopBarNovo'
            },{ 
                xtype: 'button', 
                text: 'Alterar',
                name: 'BtnAlterar',
                handler: 'botaoTopBarAlterar'
            }]
        }],
        
        me.items = [
            {
                xtype: "funcionarioConGrid",
                anchor: "100% 100%",
                params: me.params
            }
        ];
        me.callParent(arguments);
    }    
});
    