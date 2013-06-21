exports.renkei = function(_ym) {

    var str = Ti.App.Properties.getString('force.id');
    var id = str.substring((str.lastIndexOf('/005') + 1), str.length);
    var force = require('force');
    force.request({
        type : 'GET',
        url : '/query/?q=' + Ti.Network.encodeURIComponent('SELECT Id, Name, ShainName__c FROM Seisansho__c WHERE SeisanNengetsu__c = \'' + _ym + '\''), //inlining SOQL query
        callback : function(data) {
            //0件なら新規、1件なら内訳追加
            var seisansho_no;
            if (data.records.length == 0) {
                force.request({
                    type : 'POST',
                    url : '/sobjects/Seisansho__c/',
                    data : {
                        ShainName__c : id,
                        SeisanNengetsu__c : _ym
                    },
                    callback : function(data) {
                        seisansyo_no = data.records[0].Id;
                    },
                    onerror : function() {
                        alert('精算書登録失敗');
                        return;
                    }
                });
            } else if (data.records.length == 1) {
                seisansyo_no = data.records[0].Id;
            }
            Ti.API.info("SeisanshoNo :" + seisansyo_no);
            //内訳登録
            var db = require('db');
            var where = "where date like '" + _ym + "%'";
            items = db.selectItems();
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                force.request({
                    type : 'POST',
                    url : '/sobjects/SeisanshoUtiwake__c/',
                    data : {
                        Kingaku__c : items[i].kingaku,
                        KoutsuShudan__c : items[i].shudan,
                        Iikisaki__c : items[i].ikisaki,
                        SeisanshoNo__c : seisansyo_no,
                        Naiyo__c : items[i].from + ' → ' + items[i].to,
                        Day__c : date2sfdate(items[i].date),
                        Biko__c : items[i].biko
                    },
                    callback : function(data) {
                    },
                    onerror : function() {
                        return;
                    }
                });
            };
            alert('精算書登録完了');
        }
    });

}
function date2sfdate(_ymd) {
    return _ymd.substr(0, 4) + '-' + _ymd.substr(4, 2) + '-' + _ymd.substr(6, 2);
}
