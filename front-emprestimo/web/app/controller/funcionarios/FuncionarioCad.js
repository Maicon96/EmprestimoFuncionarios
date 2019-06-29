Ext.define("App.controller.funcionarios.FuncionarioCad", {
    extend: "Ext.app.ViewController", 
    alias: 'controller.FuncionarioCad',
        
    init: function() {
        this.control ({
            "funcionarioCadWindow": {
                show: this.onReady
            },
            "funcionarioCadForm textfield[name=dataAdmissao]": {
                keydown: this.dataAdmissaoKeyDown
            }
        });
    },

    onReady: function(window) {        
        var me = this;
        var form = window.down("funcionarioCadForm");
        if (window.params.chave) {
            form.getForm().setValues(window.params.chave);
            me.carregaRegistro(form, window.params.chave);
        } else {
            me.botaoTopBarNovo();
        }   
    },  
    
    botaoTopBarNovo: function(){
        var me = this;
        var form = me.view.down("funcionarioCadForm");
        me.limparTela(form);
    },
    
    botaoTopBarSalvar: function() {
        var me = this;
        var form = me.view.down("funcionarioCadForm");        
        me.gravaRegistro(form, form.getForm().getValues());
    },

    botaoTopBarExcluir: function() {
        var me = this;
        var form = me.view.down("funcionarioCadForm");        
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
    },    
    
    carregaRegistro: function(form, registro) {
        var me = this;    
        
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/funcionarios/exists/' + registro.id,
            method: 'GET',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);             
                
                form.getForm().setValues({
                    id: obj.registro.id,
                    nome: obj.registro.nome,
                    cpf: obj.registro.cpf,
                    setor: obj.registro.setor,
                    cargo: obj.registro.cargo,
                    dataAdmissao: obj.registro.dataAdmissao
                });
            },
            failure: function(response, opts) {
                Ext.MessageBox.show({
                    title: 'Erro',
                    msg: "Falha ao buscar funcionário",
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
        
        Ext.Ajax.cors = true;
        Ext.Ajax.request({
            url: 'http://localhost:8080/service/funcionarios/' + url,
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
            },
            failure: function(response, opts) {                                
                var obj = Ext.decode(response.responseText);  
                                
                var msgErro = "";

                for (var i=0; i<obj.errors.length; i++) {                                            
                    msgErro += obj.errors[i].msg;                                  
                    if (i > 0) msgErro += "</br>" 
                }                 
                
                Ext.MessageBox.show({
                    title: 'Erro ao incluir funcionário',
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
            url: 'http://localhost:8080/service/funcionarios/delete',
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
                    title: 'Erro ao excluir funcionário',
                    msg: msgErro,
                    buttons: Ext.MessageBox.OK 
                });
            }
        });
    }    
    
});