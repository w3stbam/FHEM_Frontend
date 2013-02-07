/**
 * 
 */
Ext.define('FHEM.store.SavedChartsStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.SavedChartsModel',
        proxy: {
            type: 'ajax',
             method: 'POST',
             url: '../../../fhem?cmd={queryDbLog("getcharts")}&XHR=1',
             reader: {
                 type: 'json'
             }
     },
     autoLoad: true
});