/**
 * 
 */
Ext.define('FHEM.store.DBStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.DBModel',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '../../../fhem?cmd={queryDbLog("describetable")}&XHR=1',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});