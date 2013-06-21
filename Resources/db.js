var DATABASE_NAME = 'seisan', FILE_NAME = 'seisan.txt';

exports.createDb = function() {
    Ti.Database.install('seisan.sqlite', DATABASE_NAME);
};

exports.selectItems = function(_where) {
    var retData = [];
    var db = Ti.Database.open(DATABASE_NAME);
    db.execute('CREATE TABLE IF NOT EXISTS seisan (id text, date real, ikisaki text, shudan text,fromplace text,toplace　text, kingaku integer, biko text )');

    var rows = db.execute('SELECT * FROM seisan ' + ( _where ? _where : "" ) + ' ORDER BY date;');

    while (rows.isValidRow()) {
        retData.push({
            id : rows.fieldByName('id'),
            date : rows.fieldByName('date'),
            ikisaki : rows.fieldByName('ikisaki'),
            shudan : rows.fieldByName('shudan'),
            from : rows.fieldByName('fromplace'),
            to : rows.fieldByName('toplace'),
            kingaku : rows.fieldByName('kingaku'),
            biko : rows.fieldByName('biko')
        });
        rows.next();
    }
    db.close();
    return retData;
};

exports.updateItem = function(_item) {
    var mydb = Ti.Database.open(DATABASE_NAME);
    mydb.execute('update seisan set date = ?,ikisaki = ?,shudan = ?,fromplace = ?,toplace = ?,kingaku = ?,biko = ? where id = ?', _item['date'], _item['ikisaki'], _item['shudan'], _item['from'], _item['to'], _item['kingaku'], _item['biko'], _item['id']);
    mydb.close();
};

exports.addItem = function(_item) {
    var mydb = Ti.Database.open(DATABASE_NAME);
    var id = (function() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    })();
    mydb.execute('insert into seisan values (?,?,?,?,?,?,?,?)', id, _item['date'], _item['ikisaki'], _item['shudan'], _item['from'], _item['to'], _item['kingaku'], _item['biko']);
    mydb.close();
};

exports.deleteItem = function(_id) {
    var mydb = Ti.Database.open(DATABASE_NAME);
    mydb.execute('delete from seisan where id = ?', _id);
    mydb.close();
};
exports.file = function() {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + '/' + FILE_NAME);
    return file;
};
exports.deleteRows = function(_date) {
    var mydb = Ti.Database.open(DATABASE_NAME);
    var rows = mydb.execute('SELECT count(*) as cnt from seisan where date < ?', _date);
    while (rows.isValidRow()) {
        cnt = rows.fieldByName('cnt');
        rows.next();
    }
    if (cnt > 0) {
        mydb.execute('delete from seisan where date < ?', _date);
    }
    mydb.close();
    return cnt;
};
