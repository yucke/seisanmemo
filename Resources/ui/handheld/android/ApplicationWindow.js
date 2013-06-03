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
		var menuItem = menu.add({
			title : "Item 1",
			icon : "item1.png"
		});

		menuItem.addEventListener("click", function(e) {
			var dialog = Titanium.UI.createOptionDialog();
			dialog.setTitle('Salesforce.com連携しますか？');
			dialog.setOptions(["OK", "CANCEL"]);

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
					})

				};
			})
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

	return self;
};

module.exports = ApplicationWindow;
