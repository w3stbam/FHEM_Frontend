/**
 * Setup the application
 */

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'FHEM': '../../js/app'
    }
});

Ext.application({
    name: 'FHEM Frontend',
    requires: [
        'FHEM.view.Viewport'        
    ],

    controllers: [
        'FHEM.controller.MainController',
        'FHEM.controller.ChartController'
    ],

    launch: function() {
        Ext.create("FHEM.view.Viewport");
    }
});