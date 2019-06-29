Ext.define("App.view.funcionarios.cadastro.Window" ,{
    extend: "Ext.window.Window",
    alias: "widget.funcionarioCadWindow",
    
    requires: [
        "App.view.funcionarios.cadastro.Form"
    ],
    
    controller: 'FuncionarioCad',

    title: 'Funcionários Cadastro',    
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
                text: 'Novo',
                name: 'BtnNovo',
                handler: 'botaoTopBarNovo'
            },{ 
                xtype: 'button', 
                text: 'Salvar',
                name: 'BtnSalvar',
                handler: 'botaoTopBarSalvar'
            },{ 
                xtype: 'button', 
                text: 'Excluir',
                name: 'BtnExcluir',
                handler: 'botaoTopBarExcluir'
            }]
        }],
            
        me.items = [
            {
                xtype: "funcionarioCadForm",
                anchor: "100% 100%",
                params: me.params
            }
        ];
        me.callParent(arguments);
    }
});    