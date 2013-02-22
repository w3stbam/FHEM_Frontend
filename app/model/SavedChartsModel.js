/**
 * Model for saved Charts
 */
Ext.define('FHEM.model.SavedChartsModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'NAME',
            type: 'text'
        },{
            name: 'VALUE',
            type: 'text'
        }
    ]
});