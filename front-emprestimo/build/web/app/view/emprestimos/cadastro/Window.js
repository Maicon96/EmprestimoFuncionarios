Ext.define("App.view.emprestimos.cadastro.Window" ,{
    extend: "Ext.window.Window",
    alias: "widget.emprestimoCadWindow",
    
    requires: [
        "App.view.emprestimos.cadastro.Form"
    ],
    
    controller: 'EmprestimoCad',

    title: 'Empréstimos Cadastro',    
    width: 1000,
    height: 600,
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
                xtype: "emprestimoCadForm",
                anchor: "100% 100%",
                params: me.params
            }
        ];
        me.callParent(arguments);
    }
});    