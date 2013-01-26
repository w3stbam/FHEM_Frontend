/**
 * 
 */
Ext.define('FHEM.store.DBStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.DBModel',
    proxy: {
        type: 'ajax',
        extraParams: {
            query: 'describetable'
        },
        method: 'POST',
        url: 'php/queryDb.php',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});