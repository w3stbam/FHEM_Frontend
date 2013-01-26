/**
 * 
 */
Ext.define('FHEM.store.GlobalStore', {
    extend: 'Ext.data.Store',
    name: 'globalstore',
    model: 'FHEM.model.GlobalModel',
        proxy: {
            type: 'ajax',
         method: 'POST',
         url: 'php/getGlobalJson.php',
         reader: {
             type: 'json',
             root: 'Results'
         }
     },
     autoLoad: true
});