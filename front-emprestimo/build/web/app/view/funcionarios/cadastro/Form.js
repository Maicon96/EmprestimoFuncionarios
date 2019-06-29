Ext.define("App.view.funcionarios.cadastro.Form", {
    extend: "Ext.form.Panel", 
    alias : "widget.funcionarioCadForm",
    
    controller: 'FuncionarioCad',
    
    bodyPadding: 5,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    
    initComponent: function() {
        var me = this;
        Ext.apply(me.fieldDefaults, {
            labelWidth: 115,
            labelAlign: 'right'
        });
        
        me.items = [
            {
                xtype: "textfield",
                fieldLabel: "ID",
                width: 50,
                name: "id",
                readOnly: true
            },
             {
                xtype: "textfield",
                fieldLabel: "Nome",
                width: 280,
                allowBlank: false,
                name: "nome"
            },
            {
                xtype: "textfield",
                fieldLabel: "CPF",
                width: 280,
                allowBlank: false,
                name: "cpf"
            },
            {
                xtype: "textfield",
                fieldLabel: "Setor",
                width: 280,
                allowBlank: false,
                name: "setor"
            },
            {
                xtype: "textfield",
                fieldLabel: "Cargo",
                width: 280,
                allowBlank: false,
                name: "cargo"
            },
            {
                xtype: "datefield",
                fieldLabel: "Data Admissão",
                width: 280,
                allowBlank: false,
                name: "dataAdmissao",
                enableKeyEvents: true,
                format: "d/m/Y",
                submitFormat: "Y-m-d"
            },
            {
                xtype: "textareafield",
                fieldLabel: "Observação",                                
                name: "observacao"
            }
          
        ];
        me.callParent(arguments);
    }
});