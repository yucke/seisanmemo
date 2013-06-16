var force = require('force');
exports.renkei = function() {
	var str = Ti.App.Properties.getString('force.id');
	var id = str.substring((str.lastIndexOf('/005') + 1), str.length);

	force.user({
		callback : function(data) {
			for (var i = 0, l = data.records.length; i < l; i++) {
				var rec = data.records[i];
				Ti.API.info(rec);
			}
		}
	});
	var date = '201305'
	var soql = 'SELECT Name from Seisansho__c where SeisanNengetsu__c = "'+ date +'" and ShainName__c = "' + id + '"'
	force.request({
      type:'GET',
      url:'/query/?q='+Ti.Network.encodeURIComponent(soql),
      /* data: {}, // for POST/PUT */
      callback: function(data) {
      //deal with data from the server
    },
    onerror: function() {
      alert('連携エラー');
    }
});

}
