const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    // like belongs to user
    user:{
        type: mongoose.Schema.ObjectId
    },
    // this deifines the object id of the liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used for defining the type of the liked object since this is a dynamic referenec.
    onModel:{
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;