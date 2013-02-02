/**
 * 
 */
Ext.define('FHEM.controller.MainController', {
    extend: 'Ext.app.Controller',

    refs: [
           {
               selector: 'viewport[name=mainviewport]',
               ref: 'mainviewport' //this.getMainviewport()
           },
           {
               selector: 'text[name=statustextfield]',
               ref: 'statustextfield' //this.getStatustextfield()
           },
           {
               selector: 'panel[name=culpanel]',
               ref: 'culpanel' //this.getCulpanel()
           }
           
           
           
    ],

    init: function() {
        this.control({
            'viewport[name=mainviewport]': {
                afterrender: this.viewportRendered
            }
        });
    },
    
    /**
     * load the FHEM devices and state on viewport render completion
     */
    viewportRendered: function(){
        //TODO: implement...
        
        var me = this,
            url = '../../../fhem?cmd=jsonlist&XHR=1';
        
        Ext.Ajax.request({
            method: 'GET',
            disableCaching: false,
            url: url,
            success: function(response){
                json = Ext.decode(response.responseText);
                version = json.Results[0].devices[0].ATTR.version;
                
                var sp = me.getStatustextfield();
                sp.setText(version);
                
                var cp = me.getCulpanel();
                
                Ext.each(json.Results, function(result) {
                    if (result.list === "CUL") {
                        var culname = result.devices[0].NAME;
                        cp.add(
                            {
                                xtype: 'text',
                                text: culname
                            }
                        );
                    }
                });
                
            },
            failure: function() {
                Ext.Msg.alert("Error", "The connection to FHEM could not be established");
            }
        });
        
    }
});