/**
 * 
 */
Ext.define('FHEM.store.DeviceStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.DeviceModel',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '../../../fhem?cmd={queryDbLog("getdevices")}&XHR=1',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false
});