//Master View Component Constructor

function MasterView() {

	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor : 'white',
		color : 'black'
	});

	var table = Ti.UI.createTableView({
		data : loadData()
	});
	self.add(table);

	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			selData : e.rowData
		});
	});
	//DatailViewから戻った場合、情報を最新化する
	self.addEventListener('updateList', function(e) {
		table.data = loadData();
	});
	return self;
};

//テーブルの情報を作成する
function loadData(){
	//some dummy data for our table view

	var tableData = [];

    var items =     　{
        id : 'insert',
        date : today(),
        ikisaki : '',
        shudan : '',
        from : '',
        to : '',
        kingaku : 0,
        biko : ''
    };


	var　mod = require('modules');
	var row = mod.row(items);
	row.title = '新規';
	tableData.push(row);
	var db = require('db');
	items = db.selectItems();
	for (var i = 0; i < items.length; i++) {
		row = mod.row(items[i]);
		tableData.push(row);
	};

	return tableData;

}
module.exports = MasterView;
function today(){
    var date = new Date();
    var Year = date.getFullYear();
    var Month = ('00' + (date.getMonth()+1)).slice(-2);
    var Day = ('00' + (date.getDate())).slice(-2);
    return (Year + Month + Day);
}