/**
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 * @class Ext.ux.desktop.StartMenu
 */
Ext.define('Ext.ux.desktop.StartMenu', {
    extend: 'Ext.menu.Menu',
    id: 'startmenu',

    // We want header styling like a Panel
    baseCls: Ext.baseCSSPrefix + 'panel',

    // Special styling within
    cls: 'x-menu ux-start-menu',
    bodyCls: 'ux-start-menu-body',

    defaultAlign: 'bl-tl',

    bodyBorder: true,

    width: 300,

    initComponent: function() {
        var me = this;
        
        me.layout.align = 'stretch';
        
        me.items = me.menu;

        me.items = [{
            text: 'Funcionários',
            handler : this.createWindow,
            scope: this,
            windowId: 'funcionarioConWindow'
        },{
            text: 'Empréstimos',
            handler : this.createWindow,
            scope: this,
            windowId: 'emprestimoConWindow'
        },{
            text: 'Baixas das Parcelas',
            handler : this.createWindow,
            scope: this,
            windowId: 'baixaParcelaConWindow'
        }];

        me.callParent();

        me.addDocked(me.toolbar);

        delete me.toolItems;
    },
    
    createWindow : function(src){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(src.windowId);
        if(!win){
            win = desktop.createWindow({
                id: src.windowId
            });
        }
        win.show();
        return win;
    },

    addMenuItem: function() {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },

    addToolItem: function() {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    }
}); // StartMenu
