Ext.define("App.controller.baixasParcelas.BaixaParcelaCon", {
    extend: "Ext.app.ViewController", 
    alias: 'controller.BaixaParcelaCon',
    
    init: function() {
        this.control ({
            "baixaParcelaConWindow": {
                show: this.onReady,
                destroy: this.onExit
            },            
            "baixaParcelaConForm > form button[name=BtnBuscarParcelas]": {
                click: this.botaoTopBarBuscarParcelas
            },
            "baixaParcelaConForm > form button[name=BtnBaixar]": {
                click: this.botaoTopBarBaixar
            }
        });
    },

    onReady: function(window) {
        console.log("onReady");
    },
    
    onExit: function(window) {
        console.log("onExit");
    },
    
    botaoTopBarBuscarParcelas: function(button) {        
        var me = this;                
        var form = me.view.down("baixaParcelaConForm");
                        
        var dados = form.getForm().getValues();
        
        if (dados.dataInicial == "") {
            Ext.MessageBox.show({
                title: 'Erro',
                msg: 'Data Inicial deve ser informada!',
                buttons: Ext.MessageBox.OK 
            });
        } 
        
        if (dados.dataFinal == "") {
            Ext.MessageBox.show({
                title: 'Erro',
                msg: 'Data Final deve ser informada!',
                buttons: Ext.MessageBox.OK 
            }); 
        }         
        
        
        me.carregaRegistro(form, dados);
    },
    
     botaoTopBarBaixar: function(button) {        
        var me = this;                
        var form = me.view.down("baixaParcelaConForm");        
        var grid = form.down("grid");        
        
        var records = grid.getSelectionModel().getSelection();       
        
        if (records.length == 0) {
            Ext.MessageBox.show({
                title: 'Atenção',
                msg: "Selecione as parcelas que deseja fazer a baixa!",
                buttons: Ext.MessageBox.OK 
            });  
        } else {
            var registros = new Array();

            for (var i=0; i<records.length; i++) {                                        
                registros.push({
                    id: records[i].data.id,
                    idEmprestimo: records[i].data.idEmprestimo,
                    dataVencimento: records[i].data.dataVencimento,
                    valorParcela: records[i].data.valorParcela,
                    valorPago: records[i].data.valorPago
                });                        
            }
            
            me.baixarParcelas(form, registros);
        }
    },
    
    carregaRegistro: function(form, registro) {
        var me = this;    
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/parcelas/load',
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                registro: registro
            }),            
            success: function(response, opts) {                
                var obj = Ext.decode(response.responseText);                                         
                
                var parcelas = new Array();

                for (var i=0; i<obj.registros.length; i++) {                        
                    parcelas[i] = {
                        id: obj.registros[i].id,
                        idEmprestimo: obj.registros[i].idEmprestimo,
                        dataVencimento: obj.registros[i].dataVencimento,
                        nomeFuncionario: obj.registros[i].emprestimo.funcionario.nome,
                        valorParcela: obj.registros[i].valorParcela,
                        valorPago: obj.registros[i].valorPago
                    };                                       
                }                

                var grid = form.down("grid");
                grid.store.loadData(parcelas, false);    
                
            },
            failure: function(response, opts) {                
                var obj = Ext.decode(response.responseText);                             
                
                var grid = form.down("grid");
                grid.store.loadData([], false);  
                
                Ext.MessageBox.show({
                    title: 'Erro',
                    msg: obj.msg,
                    buttons: Ext.MessageBox.OK 
                });                
            }
        });      
    },
        
    baixarParcelas: function(form, registros) {
        var me = this;    
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/parcelas/baixar',
            method: 'POST',                 
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                registros: registros
            }),
            success: function(response, opts) {                 
                var obj = Ext.decode(response.responseText);                                         
                
                Ext.MessageBox.show({
                    title: 'Sucesso',
                    msg: obj.msg,
                    buttons: Ext.MessageBox.OK 
                });    
                
                var dados = form.getForm().getValues();
                
                me.carregaRegistro(form, dados);                
                
            },
            failure: function(response, opts) {  
                var obj = Ext.decode(response.responseText);                             
                
                var grid = form.down("grid");
                grid.store.loadData([], false);  
                
                Ext.MessageBox.show({
                    title: 'Erro',
                    msg: obj.msg,
                    buttons: Ext.MessageBox.OK 
                });                
            }
        });      
    }
   
    
});