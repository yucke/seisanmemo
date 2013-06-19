function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'), DetailView = require('ui/common/DetailView'), Batch = require('ui/common/Batch');
	;

	//create object instance
	var self = Ti.UI.createWindow({
		title : 'list',
		exitOnClose : true,
		navBarHidden : false,
		backgroundColor : '#ffffff'
	});
	var activity = self.activity;
	activity.onCreateOptionsMenu = function(e) {

		var menu = e.menu;
		var renkeiItem = menu.add({
			title : "SFDC連携",
			icon : "item1.png"
		});

		renkeiItem.addEventListener("click", function(e) {
			var dialog = Titanium.UI.createOptionDialog();
			dialog.setTitle('Salesforce.com連携しますか？');
			dialog.setOptions(["精算書データ送信","ログアウト", "CANCEL"]);

			dialog.addEventListener('click', function(event) {

				if (event.index == 0) {
					var force = require('force');
					
					force.authorize({
						success : function() {
							var Batch = require('ui/common/Batch').renkei();
						},
						error : function() {
							alert('認証エラー');
						},
						cancel : function() {
							alert('cancel');
						}
					});

				}else　if　(event.index == 1) {
					var force = require('force');					
					force.logout();
				}
			});
			dialog.show();
		});
		var deleteMenuItem = menu.add({
			title : "データの一括削除",
			icon : "item1.png"
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
			title : 'Details',
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
