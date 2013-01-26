/**
 * 
 */
Ext.define('FHEM.store.ChartStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.ChartModel',
        proxy: {
            type: 'ajax',
            extraParams: {
                query: 'daily'
            },
         method: 'POST',
         url: 'php/queryDb.php',
         reader: {
             type: 'json'
         }
     },
     autoLoad: false
});