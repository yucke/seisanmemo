function DetailView() {
	var id,
	mod = require('modules'),
	self = mod.scview(),
	texts = new Array('日付', '行先', '交通手段', 'FROM', 'TO', '金額', '備考'),
	fields = new Array(7);
    for (var i = 0; i < 6; i++) {
		var row = mod.rowview();
		var label = mod.lbl(texts[i]);
		fields[i] = mod.textField1(texts[i]);
		if ( i == 5)
			fields[i] = mod.textField2(texts[5]);
		row.add(label);
		row.add(fields[i]);
		self.add(row);
	}

	fields[6] = mod.textArea(texts[6]);
	fields[1] = mod.date("20090829");
	self.add(fields[6]);
    self.add(fields[1]);

	var bt1 = mod.button('登録');
	bt1.addEventListener('click', function(e) {
		var dialog = Titanium.UI.createOptionDialog();
		var item = {
			id : id,
			date : fields[0].value,
			ikisaki : fields[1].value,
			shudan : fields[2].value,
			from : fields[3].value,
			to : fields[4].value,
			kingaku : fields[5].value,
			biko : fields[6].value
		};
		if (id == 'insert') {
			dialog.setTitle('新規登録しますか？');
			dialog.setOptions(["登録", "キャンセル"]);

			dialog.addEventListener('click', function(event) {
				if (event.index == 0) {
					// 登録処理
					require('db').addItem(item);
					self.fireEvent('updateList', {});
				}

			});

		} else {
			dialog.setTitle('どの処理を実行しますか？');
			dialog.setOptions(["更新", "削除", "キャンセル"]);

			dialog.addEventListener('click', function(event) {
				if (event.index == 0) {
					// 更新処理
					require('db').updateItem(item);
					self.fireEvent('updateList', {});
				} else if (event.index == 1) {
					// 削除処理
					require('db').deleteItem(id);
					self.fireEvent('updateList', {});
				}
			});

		}
		dialog.show();
	});

	self.add(bt1);

	self.addEventListener('itemSelected', function(e) {
		id = e.selData.id;
		fields[0].value = e.selData.date;
		fields[1].value = e.selData.ikisaki;
		fields[2].value = e.selData.shudan;
		fields[3].value = e.selData.from;
		fields[4].value = e.selData.to;
		fields[5].value = e.selData.kingaku;
		fields[6].value = e.selData.biko;
	});

	return self;
};

module.exports = DetailView;
