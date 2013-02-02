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
                select: this.deviceSelected
            },
            'combobox[name=xaxiscombo]': {
                select: this.xaxisSelected
            },
            'combobox[name=yaxiscombo]': {
                select: this.yaxisSelected
            },
            'datefield[name=daycharttimepicker]': {
                select: this.timeSelected
            },
            'button[name=requestchartdata]': {
                click: this.requestChartData
            },
            'button[name=savechartdata]': {
                click: this.saveChartData
            },
            'simplechartview': {
                afterrender: this.enableZoomInChart
            }
        });
        
    },
    
    /**
     * sets the next component visible after user has made a valid selection
     */
    deviceSelected: function(combo){
        //set the correct device for the readingscombo
        
        var device = combo.getValue(),
            store = this.getYaxiscombo().getStore(),
            proxy = store.getProxy();
        
        if (proxy) {
            proxy.url = '../../../fhem?cmd={queryDbLog("getreadings","' + device + '")}&XHR=1';
            store.load();
        }
        
        this.getXaxiscombo().setDisabled(false);
        
    },
    
    /**
     * 
     */
    xaxisSelected: function(){
        this.getYaxiscombo().setDisabled(false);
    },
    
    /**
     * 
     */
    yaxisSelected: function(){
        this.getDaycharttimepicker().setDisabled(false);
    },
    
    /**
     * 
     */
    timeSelected: function(){
        this.getRequestchartdatabtn().setDisabled(false);
    },
    
    /**
     * 
     */
    requestChartData: function() {
        
        //getting the necessary values
        var device = this.getDevicecombo().getValue(),
            xaxis = this.getXaxiscombo().getValue(),
            yaxis = this.getYaxiscombo().getValue(),
            time = this.getDaycharttimepicker().getValue(),
            dbstarttime = Ext.Date.format(time, 'Y-m-d H:i:s'),
            dbendtime = Ext.Date.format(Ext.Date.add(new Date(time), Ext.Date.DAY, 1), 'Y-m-d H:i:s'),
            view = this.getSimplechartview(),
            store = this.getSimplechartview().getStore(),
            proxy = store.getProxy();
        
        //remove the old max values to get a dynamic range
        delete view.axes.get(0).maximum;
        
        if (proxy) {
            var url = '../../../fhem?cmd={queryDbLog("daily","' + device + '",';
                url += '"' + xaxis + '","' + yaxis + '","' + dbstarttime + '","' + dbendtime + '")}&XHR=1';
            proxy.url = url;
            store.load();
        }
        
        view.axes.get(0).setTitle(yaxis);
        view.axes.get(1).setTitle(xaxis);
    },
    
    enableZoomInChart: function() {
        var view = this.getSimplechartview();
        view.mon(view.getEl(), 'mousewheel', this.zoomInChart, this);
    },
    
    zoomInChart: function(e) {
        var wheeldelta = e.getWheelDelta(),
            view = this.getSimplechartview(),
            currentmax = view.axes.get(0).prevMax,
            newmax;
        
        
        if (wheeldelta == 1) { //zoomin case:
            if (currentmax > 1) {
                newmax = currentmax - 1;
                view.axes.get(0).maximum = newmax;
                view.redraw();
            }
        } else if (wheeldelta == -1) { //zoomout case
            newmax = currentmax + 1;
            view.axes.get(0).maximum = newmax;
            view.redraw();
        }
        
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