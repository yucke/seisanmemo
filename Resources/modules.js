//画面のパーツ集
exports.scview = function() {
	var self = Ti.UI.createScrollView({
		layout : 'vertical',
		showVerticalScrollIndicator : true,
		backgroundColor : 'white',
		color : 'black'
	});
	return self;
};

exports.textField1 = function(_name) {
	var self = Ti.UI.createTextField({
		hintText : _name,
		color : '#336699',
		width : '60%',
		height : Ti.UI.SIZE,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	return self;
};
exports.textField2 = function(_name) {
	var self = Ti.UI.createTextField({
		hintText : _name,
		color : '#336699',
		width : '60%',
		height : Ti.UI.SIZE,
		keyboardType : Titanium.UI.KEYBOARD_NUMBER_PAD,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	return self;
};
exports.textArea = function(_name) {
	var self = Titanium.UI.createTextArea({
		hintText : _name,
		color : '#336699',
		width : '90%',
		height : 100,
		left : '5%',
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	return self;
};
exports.lbl = function(_name) {
	var self = Titanium.UI.createLabel({
		text : _name,
		height : Ti.UI.SIZE,
		width : '30%',
		left : '5%',
		color : '#000'
	});
	return self;
};

exports.rowview = function() {
	var self = Ti.UI.createView({
		layout : 'horizontal',
		width : '100%',
		height : Ti.UI.SIZE,
		backgroundColor : 'white',
		color : 'black'
	});
	return self;
};
exports.button = function(_name) {

	var self = Titanium.UI.createButton({
		title : _name,
		color : 'black',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});
	return self;
};

exports.row = function(_item) {
	var self = Ti.UI.createTableViewRow({
		title : _item.date + ' ' + _item.ikisaki,
		color : '#336699',
		hasDetail : true,
		id : _item.id,
		date : _item.date,
		ikisaki : _item.ikisaki,
		shudan : _item.shudan,
		from : _item.from,
		to : _item.to,
		kingaku : _item.kingaku,
		biko : _item.biko

	});
	return self;
};

exports.date = function date() {
    var dateButton = Titanium.UI.createButton({
        top : 10,
        title : '生年月日を入力してください',
        width : '80%',
        color : '#000',
        style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    });
    var maskWindow = Ti.UI.createWindow({
        width : '100%',
        height : '100%',
        backgroundColor : '#000',
        opacity : 0.7
    });
    var dateWindow = Ti.UI.createWindow({
        height : Ti.UI.SIZE,
        bottom : 0,
        backgroundColor : '#fff',
        layout : 'vertical'
    });
    var done = Titanium.UI.createButton({
        title : '完了',
        style : Titanium.UI.iPhone.SystemButtonStyle.DONE
    });
    done.addEventListener('click', function() {
        maskWindow.close();
        dateWindow.close();
        if (selectedDate != null) {
            dateButton.title = String.formatDate(selectedDate, 'long');
        }
    });
    var spacer = Titanium.UI.createButton({
        systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    var toolbar = Titanium.UI.createToolbar({
        barColor : '#000',
        items : [spacer, done]
    });
    dateWindow.add(toolbar);
 
    dateWindow.add(birthPickerView);
    dateButton.addEventListener('click', function() {
        maskWindow.open();
        dateWindow.open();
    });
    contentView.add(dateButton);
};