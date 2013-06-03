var force = require('force');
exports.renkei = function() {
	force.request({
		type : 'GET',
		url : '/query/?q=' + Ti.Network.encodeURIComponent('SELECT Id, FirstName, LastName, Alias, Username FROM User'), //inlining SOQL query
		callback : function(data) {
			var rows = [];
			for (var i = 0, l = data.records.length; i < l; i++) {
				var rec = data.records[i];
				Ti.API.info(rec.LastName);
			}
		}
	});
}
