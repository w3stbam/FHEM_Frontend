/**
 * 
 */
Ext.define('FHEM.view.SimpleChartPanel', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.simplechartpanel',
    xtype : 'chart',
    requires: [
        'FHEM.view.SimpleChartView',
        'FHEM.store.ChartStore'
    ],
    
    title: 'Dynamic Chart',
    
    /**
     * 
     */
    initComponent: function() {
        
        var me = this;
        
        // set up the local db columnname store
        // as these columns are fixed, we dont have to request them
        me.comboAxesStore = Ext.create('Ext.data.Store', {
            fields: ['name'],
            data : [
                {'name':'TIMESTAMP'},
                {'name':'DEVICE'},
                {'name':'TYPE'},
                {'name':'EVENT'},
                {'name':'READING'},
                {'name':'VALUE'},
                {'name':'UNIT'}
            ]
        });
        
        me.comboDeviceStore = Ext.create('FHEM.store.DeviceStore');
        me.comboDeviceStore.on("load", function(store, e, success) {
            if(!success) {
                Ext.Msg.alert("Error", "Connection to database failed! Check your configuration.");
            }
        });
        
        me.comboReadingsStore = Ext.create('FHEM.store.ReadingsStore');
        
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'column',
            defaults: {
                width: 250
            },
            minHeight: 30,
            maxHeight: 60,
            items: [
                {  
                    xtype: 'combobox', 
                    name: 'devicecombo',
                    fieldLabel: 'Select Device',
                    store: me.comboDeviceStore,
                    displayField: 'DEVICE',
                    valueField: 'DEVICE'
                },
                {  
                    xtype: 'combobox', 
                    name: 'xaxiscombo',
                    fieldLabel: 'Select X Axis',
                    store: me.comboAxesStore,
                    disabled: true,
                    displayField: 'name',
                    valueField: 'name'
                },
                {  
                    xtype: 'combobox', 
                    name: 'yaxiscombo',
                    fieldLabel: 'Select Y Axis',
                    store: me.comboReadingsStore,
                    disabled: true,
                    displayField: 'READING',
                    valueField: 'READING'
                },
                {
                    xtype: 'datefield',
                    name: 'daycharttimepicker',
                    format: 'Y-m-d H:i:s',
                    disabled: true,
                    fieldLabel: 'Select Day'
                },
                {
                    xtype: 'button',
                    width: 100,
                    style: {
                        text: 'bold',
                        border: '1px solid red'
                    },
                    text: 'Show Chart',
                    disabled: true,
                    name: 'requestchartdata'
                },
                {
                    xtype: 'button',
                    width: 100,
                    text: 'Save Chart',
                    disabled: true,
                    name: 'savechartdata'
                }
            ]
        }];
        
        me.items = [
                {
                    xtype: 'simplechartview',
                    width: '100%'
                }
        ];
        
        me.callParent(arguments);
        
    }
    
});
