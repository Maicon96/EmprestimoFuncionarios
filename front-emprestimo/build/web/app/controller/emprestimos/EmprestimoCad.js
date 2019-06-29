Ext.define("App.controller.emprestimos.EmprestimoCad", {
    extend: "Ext.app.ViewController", 
    alias: 'controller.EmprestimoCad',
        
    init: function() {
        this.control ({
            "emprestimoCadWindow": {
                show: this.onReady
            },
            "emprestimoCadForm textfield[name=idFuncionario]": {
                change: this.funcionarioChange
            },
            "emprestimoCadForm textfield[name=dataAdmissao]": {
                keydown: this.dataAdmissaoKeyDown
            }
        });
    },

    onReady: function(window) {        
        var me = this;
        var form = window.down("emprestimoCadForm");
        if (window.params.chave) {
            form.getForm().setValues(window.params.chave);
            me.carregaRegistro(form, window.params.chave);
        } else {
            me.botaoTopBarNovo();
        }   
    },  
    
    botaoTopBarNovo: function(){
        var me = this;
        var form = me.view.down("emprestimoCadForm");
        me.limparTela(form);
    },
    
    botaoTopBarSalvar: function() {
        var me = this;
        var form = me.view.down("emprestimoCadForm");        
        me.gravaRegistro(form, form.getForm().getValues());
    },

    botaoTopBarExcluir: function() {
        var me = this;
        var form = me.view.down("emprestimoCadForm");        
        Ext.Msg.show({
            title:'Exclusão',
            message: 'Deseja realmente excluir?',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    var registros = {
                        id: form.getForm().findField("id").getValue()
                    };
                    me.excluirRegistro(form, registros);
                }
            }
        });
    },
    
    funcionarioChange: function(form) {
        var me = this;    
       me.carregaFuncionario(form.value);
    },    
    
    observacaoKeyDown: function(field, e) {
        var me = this;
        if (!e.hasModifier()) {
            if (e.getKey() === e.TAB) {
                me.botaoTopBarSalvar();
            }
        }
    },        
    
    limparTela: function(form) {
        form.getForm().reset();
        
        var grid = form.down("grid");        
        grid.store.loadData([], false); 
    },    
    
    carregaRegistro: function(form, registro) {
        var me = this;    
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/emprestimos/exists/' + registro.id,
            method: 'GET',            
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);             
                form.getForm().setValues(obj.registro);      
                
                me.carregaParcelas(form, registro);
            },
            failure: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Erro',
                    msg: "Falha ao buscar empréstimo",
                    buttons: Ext.MessageBox.OK 
                });
            }
        });
      
    },

    gravaRegistro: function(form, registro) {
        var me = this;
        var url = "save";
        if (registro.id) {
            url = "update";
        }
        
        Ext.Ajax.setCors(true);
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/emprestimos/' + url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                registro: registro
            }),            
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);  
                if (!registro.id) {
                     form.getForm().setValues(obj.registro);
                }                
                
                var dados = form.getForm().getValues(); 
                              
                me.carregaParcelas(form, dados);                
            },
            failure: function(response, opts) {
                var obj = Ext.decode(response.responseText);  
                                
                var msgErro = "";

                for (var i=0; i<obj.errors.length; i++) {                                            
                    msgErro += obj.errors[i].msg;                                  
                    if (i > 0) msgErro += "</br>" 
                }                 
                
                Ext.MessageBox.show({
                    title: 'Erro ao gravar Empréstimo',
                    msg: msgErro,
                    buttons: Ext.MessageBox.OK 
                });
            }
        });
       
    },
    
    excluirRegistro: function(form, registro) {        
        var me = this;    
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/emprestimos/delete',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                registro: registro
            }),
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);  
                me.limparTela(form);                
            },
            failure: function(response, opts) {
                 var obj = Ext.decode(response.responseText);  
                                
                var msgErro = "";

                for (var i=0; i<obj.errors.length; i++) {                                            
                    msgErro += obj.errors[i].msg;                                  
                    if (i > 0) msgErro += "</br>" 
                }                 
                
                Ext.MessageBox.show({
                    title: 'Erro ao excluir Empréstimo',
                    msg: msgErro,
                    buttons: Ext.MessageBox.OK 
                });
            }
        });
    },
    
    carregaParcelas: function(form, registro) {
        var me = this;    
        
        registro.idEmprestimo = registro.id;
                
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/parcelas/load/emprestimo',
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
                        dataVencimento: obj.registros[i].dataVencimento,                        
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
    
    carregaFuncionario: function(funcionario) {
        var me = this;    
        var form = me.view.down("emprestimoCadForm");        
        
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/funcionarios/exists/' + funcionario,
            method: 'GET',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);             
                
                form.getForm().setValues({                    
                    nomeFuncionario: obj.registro.nome                    
                });
            },
            failure: function(response, opts) {
                form.getForm().findField("nomeFuncionario").setValue("");                
            }
        });
    }
    
});