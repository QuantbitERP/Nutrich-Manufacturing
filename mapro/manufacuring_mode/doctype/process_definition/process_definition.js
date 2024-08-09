// Copyright (c) 2023, Pradip and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Process Item", "item", function(frm, cdt, cdn) {
//     var d = locals[cdt][cdn];
//     frm.call	({
// 			method:"Get_Purchase_Rate",
// 			args:{
// 				item:d.item
// 				},				
// 				callback: function(r) {	
// 						frm.refresh_field('itemwise_batch_details');
// 						var prate = r.message[0]["valuation_rate"];
// 						frappe.model.set_value(cdt, cdn, 'rate',prate);
// 				}
// 		});
//     console.log(d);
// });

// frappe.ui.form.on('Process Item', {
// 	item:function(frm) {
// 		// your code here
// 		frm.call({
// 			method:'Get_Purchase_Rate',
// 			doc: frm.doc,
// 		});
// 	}
// })

frappe.ui.form.on('Process Definition', {
	refresh: function(frm) {
	},
	setup: function (frm) {
		frm.set_query("workstation", function () {
			return {
				filters: {"department": frm.doc.department}
			}
		});
	}
});

frappe.ui.form.on('Process Item', {
	yeild:function(frm) {
		frm.call({
			method:'qtyupdate',
			doc: frm.doc,
		});
	}
})
frappe.ui.form.on('Operation Cost', {
	cost:function(frm) {
		frm.call({
			method:'qtyupdate',
			doc: frm.doc,
		});
	},
	rate:function(frm, cdt, cdn) {
		var d = locals[cdt][cdn];
		if(frm.doc.process_type == 'Subcontracting'){
			frappe.model.set_value(cdt, cdn, 'cost', (d.rate * frm.doc.materials_qty));
		}
		frm.call({
			method:'qtyupdate',
			doc: frm.doc,
		});
	}
})
frappe.ui.form.on('Process Item', {
	rate:function(frm) {
		frm.call({
			method:'qtyupdate',
			doc: frm.doc,
		});
	}
})
frappe.ui.form.on('Process Item', {
	quantity:function(frm) {
		frm.call({
			method:'qtyupdate',
			doc: frm.doc,
		});
	}
})



