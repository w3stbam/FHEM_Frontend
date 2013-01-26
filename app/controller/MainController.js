/**
 * 
 */
Ext.define('FHEM.controller.MainController', {
    extend: 'Ext.app.Controller',

    refs: [
           {
               selector: 'viewport[name=mainviewport]',
               ref: 'mainviewport' //this.getMainviewport()
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
        
//        Ext.Ajax.request({
//            method: 'GET',
//            disableCaching: false,
//            url: 'php/getGlobalJson.php',
//            success: function(response){
//                var text = response.responseText;
//                console.log(text);
//                peter = Ext.decode(text);
//                // process server response here
//            },
//            failure: function() {
//                Ext.Msg.alert("Error", "The connection to FHEM could not be established");
//            }
//        });
        
    }
});