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
//↓デバッグ用コマンド
Ti.API.log('DEBUG', '1');

var minDate = new Date()
minDate.setFullYear(2009);
minDate.setMonth(0);
minDate.setDate(1)

Ti.API.log('DEBUG', '2');

var maxDate = new Date()
maxDate.setFullYear(2009);
maxDate.setMonth(11);
maxDate.setDate(31)

Ti.API.log('DEBUG', '3');

var value = new Date();
value.setFullYear(2009);
value.setMonth(0);
value.setDate(1);

Ti.API.log('DEBUG', '4');

var picker = Ti.UI.createPicker({
    // typeとしてTi.UI.PICKER_TYPE_DATEを指定します。
    type:Ti.UI.PICKER_TYPE_DATE,
    minDate:minDate,
    maxDate:maxDate,
    value:value
});

Ti.API.log('DEBUG', '5');

picker.addEventListener('change',function(e){
     // e.valueとして選択値が取得される。
});
};

