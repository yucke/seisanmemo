function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'), DetailView = require('ui/common/DetailView'), Batch = require('ui/common/Batch');
	;

	//create object instance
	var self = Ti.UI.createWindow({
		title : '精算一覧',
		exitOnClose : true,
		navBarHidden : false,
		backgroundColor : '#ffffff'
	});
	var activity = self.activity;
	activity.onCreateOptionsMenu = function(e) {

		var menu = e.menu;
		var renkeiItem = menu.add({
			title : "SFDC連携"
		});

		renkeiItem.addEventListener("click", function(e) {
			var dialog = Titanium.UI.createOptionDialog();
			dialog.setTitle('Salesforce.com連携しますか？');
			dialog.setOptions(["先月分データ送信","今月分データ送信","ログアウト", "キャンセル"]);

			dialog.addEventListener('click', function(event) {

				if (event.index < 2){
					var force = require('force');
					var ym = getYM(event.index);
					force.authorize({
						success : function() {
							var Batch = require('ui/common/Batch').renkei(ym);
						},
						error : function() {
							alert('認証エラー');
						},
						cancel : function() {
							alert('cancel');
						}
					});

				}else　if　(event.index == 2) {
					var force = require('force');					
					force.logout();
				}
			});
			dialog.show();
		});
		var deleteMenuItem = menu.add({
			title : "データの一括削除"	
		});

		deleteMenuItem.addEventListener("click", function(e) {
			var dialog = Titanium.UI.createOptionDialog();
			dialog.setTitle('先月までの精算データを一括削除しますがよろしいですか？');
			dialog.setOptions(["OK", "CANCEL"]);

			dialog.addEventListener('click', function(event) {
				// OKボタンが押された場合
				if (event.index == 0) {
					// データ削除
					var db = require('db');
					// 月初の習得
					var date = new Date();  
					var year = date.getFullYear();  
					var month = date.getMonth();  
					// 今月の月初
					var lastMonthFirstDate = new Date(year, month + 1, 0);
					var tempMonth = "0" + (lastMonthFirstDate.getMonth() + 1);
					var cnt = db.deleteRows(lastMonthFirstDate.getFullYear() + tempMonth.slice(-2) );
					alert('精算データを '+ cnt + ' 件削除しました。');
					// リロード
					self.fireEvent('callUpdateList', {})
				};
			});
			dialog.addEventListener('close', function(e) {
				masterView.fireEvent('updateList', {})
			});
			dialog.show();
		});

	};
	

	//construct UI
	var masterView = new MasterView();
	self.add(masterView);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		//create detail view container
		var detailView = new DetailView();
		var detailContainerWindow = Ti.UI.createWindow({
			title : '編集',
			navBarHidden : false,
			backgroundColor : '#ffffff'
		});
		//更新した場合、Datailviewを閉じてMasetrViewのListをリロードする
		detailView.addEventListener('updateList', function(e) {
			masterView.fireEvent('updateList', e);
			detailContainerWindow.close();
		});
		detailContainerWindow.add(detailView);
		detailView.fireEvent('itemSelected', e);
		detailContainerWindow.open();
	});
	
	self.addEventListener('callUpdateList', function(e) {
		masterView.fireEvent('updateList', e);
	});

	return self;
};

module.exports = ApplicationWindow;

//当年月をYYYYMM形式で返す。引数0の場合先月が返る
function getYM(day) {
    var today = new Date();
    var dt = new Date(today.getFullYear(), today.getMonth(), day);
    Ti.API.info(dt);
    var month = ('00' + (dt.getMonth()+1)).slice(-2);
    return dt.getFullYear() + month;
};
