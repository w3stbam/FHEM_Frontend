/**
 * 
 */
Ext.define('FHEM.store.ReadingsStore', {
    extend: 'Ext.data.Store',
    model: 'FHEM.model.ReadingsModel',
    proxy: {
        type: 'ajax',
        method: 'POST',
        url: '', //gets set by controller after device has been selected
        reader: {
            type: 'json'
        }
    },
    autoLoad: false
});