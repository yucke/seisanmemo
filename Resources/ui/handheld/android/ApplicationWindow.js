function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
	    DetailView = require('ui/common/DetailView');

	//create object instance
	var self = Ti.UI.createWindow({
		title : 'list',
		exitOnClose : true,
		navBarHidden : false,
		backgroundColor : '#ffffff'
	});

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
