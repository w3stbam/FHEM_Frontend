/**
 * 
 */
Ext.define('FHEM.controller.ChartController', {
    extend: 'Ext.app.Controller',

    refs: [
           {
               selector: 'datefield[name=daycharttimepicker]',
               ref: 'daycharttimepicker' //this.getDaycharttimepicker()
           },
           {
               selector: 'button[name=requestchartdata]',
               ref: 'requestchartdatabtn' //this.getRequestchartdatabtn()
           },
           {
               selector: 'button[name=savechartdata]',
               ref: 'savechartdatabtn' //this.getSavechartdatabtn()
           },
           {
               selector: 'combobox[name=devicecombo]',
               ref: 'devicecombo' //this.getDevicecombo()
           },
           {
               selector: 'combobox[name=xaxiscombo]',
               ref: 'xaxiscombo' //this.getXaxiscombo()
           },
           {
               selector: 'combobox[name=yaxiscombo]',
               ref: 'yaxiscombo' //this.getYaxiscombo()
           },
           {
               selector: 'simplechartview',
               ref: 'simplechartview' //this.getSimplechartview()
           }
           
    ],

    init: function() {
        this.control({
            'combobox[name=devicecombo]': {
                select: this.userSelected
            },
            'combobox[name=xaxiscombo]': {
                select: this.userSelected
            },
            'combobox[name=yaxiscombo]': {
                select: this.userSelected
            },
            'datefield[name=daycharttimepicker]': {
                select: this.userSelected
            },
            'button[name=requestchartdata]': {
                click: this.requestChartData
            },
            'button[name=savechartdata]': {
                click: this.saveChartData
            }
        });
    },
    
    /**
     * sets the next component visible after user has made a valid selection
     */
    userSelected: function(item){
        Ext.each(item.ownerCt.items.items, function(singleItem) {
            if (singleItem.disabled) {
                singleItem.setDisabled(false);
                return false;
            }
        });
        
        if (item.name === "devicecombo") {
            //set the coorect device for the readingscombo
            var store = this.getYaxiscombo().getStore();
            var proxy = store.getProxy();
            if (proxy) {
                proxy.setExtraParam("device", item.getValue());
                proxy.setExtraParam("query", "getreadings");
                store.load();
            }
        }
        
        
        
    },
    
    requestChartData: function() {
        
        //getting the necessary values
        var device = this.getDevicecombo().getValue(),
            xaxis = this.getXaxiscombo().getValue(),
            yaxis = this.getYaxiscombo().getValue(),
            time = this.getDaycharttimepicker().getValue(),
            dbtime = Ext.Date.format(time, 'Y-m-d H:i:s'),
            view = this.getSimplechartview(),
            store = this.getSimplechartview().getStore(),
            proxy = store.getProxy();
        
        if (proxy) {
            proxy.setExtraParam("device", device);
            proxy.setExtraParam("xaxis", xaxis);
            proxy.setExtraParam("yaxis", yaxis);
            proxy.setExtraParam("time", dbtime);
            proxy.setExtraParam("query", "daily");
            store.load();
        }
        
        view.axes.get(0).setTitle(yaxis);
        view.axes.get(1).setTitle(xaxis);
    },
    
    saveChartData: function() {
        
        Ext.Msg.alert("Info", "This will be implemented soon...");
        
//        var device,
//            xaxis,
//            yaxis,
//            time,
//            dbtime,
//            store,
//            proxy;
//        //getting the necessary values
//        device = this.getDevicecombo().getValue();
//        xaxis = this.getXaxiscombo().getValue();
//        yaxis = this.getYaxiscombo().getValue();
//        time = this.getDaycharttimepicker().getValue();
//        
//        dbtime = Ext.Date.format(time, 'Y-m-d H:i:s')
//        
//        console.log("saving: ", device, xaxis, yaxis, dbtime);
//        test = this.getSimplechartview();
//        
//        Ext.Ajax.request({
//            method: 'POST',
//            extraParams: {
//                
//            },
//            disableCaching: false,
//            url: 'php/saveChart.php',
//            success: function(response){
//                var text = response.responseText;
//                console.log("success", text);
//                // process server response here
//            },
//            failure: function() {
//                Ext.Msg.alert("Error", "The Chart could not be saved!");
//            }
//        });
        
    }
});