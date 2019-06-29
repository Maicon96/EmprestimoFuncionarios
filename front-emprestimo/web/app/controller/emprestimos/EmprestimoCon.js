Ext.define("App.controller.emprestimos.EmprestimoCon", {
    extend: "Ext.app.ViewController", 
    alias: 'controller.EmprestimoCon',
    
    init: function() {
        this.control ({
            "emprestimoConWindow": {
                show: this.onReady,
                destroy: this.onExit
            },            
            "emprestimoConGrid": {
                itemdblclick: this.itemDuploClick
            }
        });
    },

    onReady: function(window) {
        console.log("onReady");
    },
    
    onExit: function(window) {
        console.log("onExit");
    },

    botaoTopBarNovo: function() {            
        var me = this;
        console.log("novo");
        var grid = me.view.down("emprestimoConGrid");
        me.chamaProgramaManutencao(grid);
    },

    botaoTopBarAlterar: function() {
        var me = this;
        console.log("alterar");
        var grid = me.view.down("emprestimoConGrid");     
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 1) {
            Ext.Msg.show({
                title:'Aviso',
                message: 'Selecione apenas um registro para alterar',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        } 
        else if (record.length < 1) {
            // Chamada para a função de mensagens ao usuário    
            Ext.Msg.show({
                title:'Aviso',
                message: 'Selecione um registro para alterar',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        } 
        else {
            me.chamaProgramaManutencao(grid, record[0]);
        }
    },

    itemDuploClick: function(view, record) {
        var me = this;
        me.chamaProgramaManutencao(view.down("emprestimoConGrid"), record);
    },
    
    chamaProgramaManutencao: function(grid, record) {        
        var win = Ext.getCmp("emprestimoCadWindow");        
        if(!win){
            var desktop = Ext.getCmp("startmenu");
            win = desktop.createWindow({
                windowId: "emprestimoCadWindow"
            });
        }
        if (record) {
            win.params.chave = {
                id: record.data.id
            };
        }
        win.show();
    }

   
    
});