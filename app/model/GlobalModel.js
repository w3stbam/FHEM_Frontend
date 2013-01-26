/**
 * 
 */
Ext.define('FHEM.model.GlobalModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'ResultSet'
        },
        {
            name: 'Results'
        },
        {
            name: 'list',
            type: 'text'
        },
        {
            name: 'devices',
            type: 'text'
        }
    ]
});