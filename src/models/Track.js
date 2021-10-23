const mongoose = require('mongoose');
const pointSchema = require('./Point');

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        default: '',
    },
    locations: {
        type: [pointSchema],
        required: true,
    }
});

mongoose.model('Track', trackSchema);