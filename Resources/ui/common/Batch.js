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

}
