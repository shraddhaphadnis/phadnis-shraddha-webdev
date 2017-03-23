/**
 * Created by shrad on 3/11/2017.
 */
module.exports = function (model) {
    var mongoose = require('mongoose');

    var WidgetsSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: {type: String, enum: ['heading', 'image', 'youtube', 'html', 'text']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        index: Number
    }, {collection: "assignment.widget"});

    WidgetsSchema.post('remove', function(next) {
        var pageModel = model.pageModel.getModel();
        var widget = this;
        pageModel.findById(widget._page)
            .then(function (page) {
                var index = page.widgets.indexOf(widget._id);
                if (index > -1) {
                    page.widgets.splice(index, 1);
                    page.save();
                }
            });
    });

     return WidgetsSchema;
};
