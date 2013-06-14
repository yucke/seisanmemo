exports.renkei = function() {
	var str = Ti.App.Properties.getString('force.id');
	var id = str.substring((str.lastIndexOf('/005') + 1), str.length);
	var force = require('force');
	var now = new Date();
	var ym = now.getFullYear().toString() + toDoubleDigits(now.getMonth() + 1);
	force.request({
		type : 'GET',
		url : '/query/?q=' + Ti.Network.encodeURIComponent('SELECT Id, Name, ShainName__c FROM Seisansho__c WHERE SeisanNengetsu__c = \'' + ym + '\''), //inlining SOQL query
		callback : function(data) {
			//0件なら新規、1件なら内訳追加
			var seisansho_no;
			if (data.records.length == 0) {
				force.request({
					type : 'POST',
					url : '/sobjects/Seisansho__c/',
					data : {
						ShainName__c : id,
						SeisanNengetsu__c : ym
					},
					callback : function(data) {
						seisansyo_no = data.records[0].Id;
					},
					onerror : function() {
						alert('精算書登録失敗');
					}
				});
			} else if (data.records.length == 1) {
				seisansyo_no = data.records[0].Id;
			}
			Ti.API.info("SeisanshoNo :" + seisansyo_no);
			//内訳登録
			force.request({
				type : 'POST',
				url : '/sobjects/SeisanshoUtiwake__c/',
				data : {
					Kingaku__c : 100,
					KoutsuShudan__c : 'JR',
					Iikisaki__c : '本社',
					SeisanshoNo__c : seisansyo_no,
					Naiyo__c : '新宿 → 神田',
					Day__c : '2013-06-24',
					Biko__c : 'hoge'
				},
				callback : function(data) {
					alert('精算書登録完了');
				},
				onerror : function() {
					alert('明細部登録失敗');
				}
			});
		}
	});

}
var toDoubleDigits = function(num) {
	num += "";
	if (num.length === 1) {
		num = "0" + num;
	}
	return num;
};
