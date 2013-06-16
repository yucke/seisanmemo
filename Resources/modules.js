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

exports.dateField = function() {
    var self = Ti.UI.createTextField({
        hintText : 'YYYYMMDD',
        color : '#336699',
        width : '60%',
        height : Ti.UI.SIZE,
        keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType : Titanium.UI.RETURNKEY_DEFAULT,
        borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
    });
    self.addEventListener('click', function(e) {
        Ti.API.log('DEBUG', '2');
        Ti.API.log('DEBUG', 'click_event');
        var win = Ti.UI.createWindow({
            modal : true,
            modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
            modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,
            title : 'DATE',
            layout : 'vertical'
        });

        Ti.API.log('DEBUG', '3');
        win.backgroundColor = 'black';

        var today = new Date();

        var minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 1);
        minDate.setMonth(0);
        minDate.setDate(1);

        var maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() + 1);
        maxDate.setMonth(11);
        maxDate.setDate(31);

        var picker = Ti.UI.createPicker({
            useSpinner : true,
            type : Ti.UI.PICKER_TYPE_DATE,
            minDate : minDate,
            maxDate : maxDate,
            value : str2date(self.value)
        });

        picker.addEventListener('DateSelected', function(e) {
            self.value = date2str(picker.value);
        });

        Ti.API.log('DEBUG', '4________'+picker.value);
        // turn on the selection indicator (off by default)
        picker.selectionIndicator = true;
        Ti.API.log('DEBUG', '5________'+picker.value);
        win.add(picker);
        Ti.API.log('DEBUG', '6________');
        //button
        var bt1 = Titanium.UI.createButton({
            title : '決定',
            color : 'black',
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE
        });
        bt1.addEventListener('click', function(e) {
            picker.fireEvent('DateSelected', e);
            win.close();
        });
        win.add(bt1);
        win.open();
    });
    Ti.API.log('DEBUG', '5');
    /*    self.addEventListener('DateSelected',function(e){
     self.value = picker.value;
     });
     */
    return self;
}
function date2str(date){
    var str = '';
    var Year = date.getFullYear();
    var Month = ('00' + (date.getMonth()+1)).slice(-2);
    var Day = ('00' + (date.getDate())).slice(-2);
    str =(Year + Month + Day);
    return str;
}
function str2date(datestr) {
    // 正規表現による書式チェック
    if (!datestr.match(/^\d{4}\d{2}\d{2}$/)) {
        return new Date();
    }
    var vYear = datestr.substr(0, 4) - 0;
    var vMonth = datestr.substr(4, 2) - 1;
    // Javascriptは、0-11で表現
    var vDay = datestr.substr(6, 2) - 0;
    // 月,日の妥当性チェック
    if (vMonth >= 0 && vMonth <= 11 && vDay >= 1 && vDay <= 31) {
        var vDt = new Date(vYear, vMonth, vDay);
        if (isNaN(vDt)) {
            return new Date();
        } else if (vDt.getFullYear() == vYear && vDt.getMonth() == vMonth && vDt.getDate() == vDay) {
    Ti.API.log('DEBUG', 'dateTrance___________'+vDt);
            return vDt;
        } else {
            return new Date();
        }
    } else {
        return new Date();
    }

}
