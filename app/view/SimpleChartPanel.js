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
        
        me.comboAxesStore = Ext.create('FHEM.store.DBStore');
        
        me.comboDeviceStore = Ext.create('FHEM.store.DeviceStore');
        
        me.comboReadingsStore = Ext.create('FHEM.store.ReadingsStore');
        
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            layout: 'column',
            defaults: {
                width: 250
            },
            items: [
                {  
                    xtype: 'combobox', 
                    name: 'devicecombo',
                    fieldLabel: 'Select Device',
                    store: me.comboDeviceStore,
                    displayField: 'DEVICE',
                    mode: 'local',
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
                '->',
                {
                    xtype: 'button',
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
                    text: 'Save Chart',
                    disabled: true,
                    name: 'savechartdata'
                }
            ]
        }];
        
        me.items = [
                {
                    xtype: 'simplechartview',
                    flex: 1,
                    height: '80%',
                    width: '100%'
                }
        ];
        
        me.callParent(arguments);
        
    }
    
});
