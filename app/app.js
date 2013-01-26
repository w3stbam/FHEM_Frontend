/**
 * Setup the application
 */

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'FHEM': './app' 
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
//    
//    models: [
//        'Ext.data.ChartModel'     
//    ],
//    
//    stores: [
//        'Ext.data.ChartStore'     
//    ],
//   
//    views: [
//        'FHEM.view.Viewport'   
//    ],
//
    launch: function() {
        Ext.create("FHEM.view.Viewport");
    }
});