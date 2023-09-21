const mongoose = require('mongoose');


////////////////////////////////////////////////////////
const ListSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    content: {
        type: [String],
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        default: 'gray',
    },
    fontColor: {
        type: String,
        default: 'black',
    },
    borderColor: {
        type: String,
        default: 'white',
    },
    textAlign: {
        type: String,
        default: 'left',
    },
    fontStyle: {
        type: String,
        default: 'italics',
    },
    fontWeight: {
        type: String,
        default: 'bold',
    },
    borderStyle: {
        type: String,
        default: 'solid',
    },
    borderWidth: {
        type: Number,
        default: 0,
    },
    fontSize: {
        type: Number,
        default: 16,
    },
    marginX: {
        type: Number,
        default: 0,
    },
    marginY: {
        type: Number,
        default: 0,
    },

    // not implemented
    paddingX: {
        type: Number,
        default: 0,
    },
    paddingY: {
        type: Number,
        default: 0,
    },

    opacity: {
        type: Number,
        default: 1,
    },
    borderRadius: {
        type: Number,
        default: 0,
    },
});
///////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const TableSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    payload: {
        type: [[String]],
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        default: 'gray',
    },
    fontColor: {
        type: String,
        default: 'black',
    },
    borderColor: {
        type: String,
        default: 'white',
    },
    textAlign: {
        type: String,
        default: 'left',
    },
    fontStyle: {
        type: String,
        default: 'italics',
    },
    fontWeight: {
        type: String,
        default: 'bold',
    },
    borderStyle: {
        type: String,
        default: 'solid',
    },
    borderWidth: {
        type: Number,
        default: 0,
    },
    fontSize: {
        type: Number,
        default: 16,
    },
    marginX: {
        type: Number,
        default: 0,
    },
    marginY: {
        type: Number,
        default: 0,
    },

    // not implemented
    paddingX: {
        type: Number,
        default: 0,
    },
    paddingY: {
        type: Number,
        default: 0,
    },

    opacity: {
        type: Number,
        default: 1,
    },
    borderRadius: {
        type: Number,
        default: 0,
    },
});
///////////////////////////////////////////////////////
const DivSchema = new mongoose.Schema({
    
    id: {
        type: String,
        required: true,
    },
    payload: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        default: 'gray',
    },
    fontColor: {
        type: String,
        default: 'black',
    },
    borderColor: {
        type: String,
        default: 'white',
    },
    textAlign: {
        type: String,
        default: 'left',
    },
    fontStyle: {
        type: String,
        default: 'italics',
    },
    fontWeight: {
        type: String,
        default: 'bold',
    },
    borderStyle: {
        type: String,
        default: 'solid',
    },
    borderWidth: {
        type: Number,
        default: 0,
    },
    fontSize: {
        type: Number,
        default: 16,
    },
    marginX: {
        type: Number,
        default: 0,
    },
    marginY: {
        type: Number,
        default: 0,
    },

    // not implemented
    paddingX: {
        type: Number,
        default: 0,
    },
    paddingY: {
        type: Number,
        default: 0,
    },

    opacity: {
        type: Number,
        default: 1,
    },
    borderRadius: {
        type: Number,
        default: 0,
    },
});
///////////////////////////////////////////////////////

const ContentSchema = new mongoose.Schema({
    divs: [DivSchema],
    images: [DivSchema],
    lists: [DivSchema], 
    pres: [DivSchema],
    tables: [TableSchema], //different
    youtubes: [DivSchema],
    sortOrder: [String]
});

module.exports = ContentSchema;
////////////////////////////////////////////////////////
