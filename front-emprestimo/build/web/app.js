/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        "Ext": "ext/src",
        "Ext.ux": "app/ux",
        "App": "app"
    }
}); 

Ext.application({
    name: 'Desktop',

    //-------------------------------------------------------------------------
    // Most customizations should be made to Desktop.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'Desktop.App',
                
        'App.controller.funcionarios.FuncionarioCon',
        'App.view.funcionarios.consulta.Window',
        
        'App.controller.funcionarios.FuncionarioCad',
        'App.view.funcionarios.cadastro.Window',
        
        'App.controller.emprestimos.EmprestimoCon',
        'App.view.emprestimos.consulta.Window',
        
        'App.controller.emprestimos.EmprestimoCad',
        'App.view.emprestimos.cadastro.Window',
        
        'App.controller.baixasParcelas.BaixaParcelaCon',
        'App.view.baixasParcelas.consulta.Window'
    ],
    init: function() {
        var app = new Desktop.App();
    }
});
