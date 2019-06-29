Ext.define("App.util.ConsultasGrid", {
    extend: "Ext.grid.Panel",
    alias : "widget.consultasGrid",
    
    requires: [
        "App.store.Ordenar"
    ],
    
    multiColumnSort: true, 

    initComponent: function() {
        var me = this;
        
        Ext.apply(me.viewConfig, {
            stripeRows: true
        });
        
        me.storeOrdOrdens = Ext.create("App.store.Ordenar");
        
        var store;
        if (me.params.store) {
            store = me.params.store;
        }
        else {
            store = Ext.create(me.nomestore, {
                sorters: me.params.ordens || [],            
                listeners: {
                    beforeload: function(store, options) {
                        if (me.params.extraParams) {
                            Ext.apply(store.proxy.extraParams, me.params.extraParams);
                        }
                    }                    
                }
            });      
        }
        if (me.pageSizeStore) {
            store.pageSize = me.pageSizeStore;
        }
//        if (!me.params.store) {
//            store.load();
//        }
        // Faz o load somente nas grid´s que não estão dentro de tabpanel´s
        if (!me.params.store) {
            store.load();
        }
        me.store = store;

        var local = false;
        if (me.store.proxy.type == "memory") {
            local = true;
        }
        
        me.dockedItems = [
            {
                xtype: "pagingtoolbar",
                store: store,
                dock: "bottom",
                displayInfo: true,
                items: [
                    "-",
                    "Por Página: ",
                    Ext.create("Ext.form.ComboBox", {
                        name: "perpage",
                        considerGetValues: false,
                        width: 50,
                        store: Ext.create("Ext.data.ArrayStore", {
                            fields: ["id"],
                            data: [
                                ["05"],
                                ["10"],
                                ["15"],
                                ["25"],
                                ["50"],
                                ["100"]
                            ]
                        }),
                        queryMode: "local",
                        value: store.pageSize.toString(),
                        listWidth: 50,
                        displayField: "id",
                        valueField: "id",
                        editable: false,
                        forceSelection: true,
                        listeners: {
                            select: function(combo, record) {
                                store.pageSize = parseInt(record.get("id"));
                                store.currentPage = 1;
                                store.load();
                            }
                        }
                    })
                ]
            }            
        ];
        
        me.callParent(arguments);
    }
    
});