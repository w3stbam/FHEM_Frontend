/**
 * 
 */
Ext.define('FHEM.store.DeviceStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.DeviceModel',
    proxy: {
        type: 'ajax',
        extraParams: {
            query: 'getdevices'
        },
        method: 'POST',
        url: 'php/queryDb.php',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});