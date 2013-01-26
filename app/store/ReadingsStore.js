/**
 * 
 */
Ext.define('FHEM.store.ReadingsStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.ReadingsModel',
    proxy: {
        type: 'ajax',
        extraParams: {
            query: 'getreadings'
        },
        method: 'POST',
        url: 'php/queryDb.php',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false
});