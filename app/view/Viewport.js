/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('FHEM.view.Viewport', {
    extend: 'Ext.Viewport',
    name: 'mainviewport',
    layout: 'border',
    requires: [
        'FHEM.view.SimpleChartPanel',
        'FHEM.controller.ChartController'
    ],

    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    region: 'north',
                    html: '<img src="../../icons/fhemicon.png" height="50px"/><h1 class="x-panel-header" align="center">FHEM Webfrontend</h1>',
                    height: 70
                }, {
                    region: 'west',
                    title: 'Navigation',
                    width: 200,
                    xtype: 'panel',
                    layout: 'accordion',
                    items: [
                        {
                            xtype: 'panel',
                            name: 'culpanel',
                            title: 'CUL'
                        },
                        {
                            xtype: 'panel',
                            title: 'Plots',
                            layout: 'fit',
                            collapsed: false,
                            items: [
                                {
                                    xtype: 'grid',
                                    columns: [{header: 'Saved Charts', dataIndex: 'VALUE', width: '90%'}],
                                    store: Ext.create('FHEM.store.SavedChartsStore', {}),
                                    name: 'savedchartsgrid'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'Unsorted'
                        },
                        {
                            xtype: 'panel',
                            title: 'Everything'
                        },
                        {
                            xtype: 'panel',
                            title: 'Wiki'
                        },
                        {
                            xtype: 'panel',
                            title: 'Details'
                        },
                        {
                            xtype: 'panel',
                            title: 'Definition...'
                        },
                        {
                            xtype: 'panel',
                            title: 'Edit files'
                        },
                        {
                            xtype: 'panel',
                            title: 'Select style'
                        },
                        {
                            xtype: 'panel',
                            title: 'Event monitor'
                        }
                    ]
                }, {
                    xtype: 'panel',
                    region: 'south',
                    title: 'Status',
                    collapsible: true,
                    items: [{
                        xtype: 'text',
                        name: 'statustextfield',
                        text: 'Status...'
                    }],
                    split: true,
                    height: 100,
                    minHeight: 100
                }, 
                {
                    xtype: 'simplechartpanel',
                    title: 'Charts',
                    region: 'center',
                    layout: 'fit'
                }
            ]
        });

        me.callParent(arguments);
    }
});
