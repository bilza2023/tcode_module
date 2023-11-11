
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlidesSchema = require('./slidesSchema');

const PresentationSchema = new Schema({
    name:{ 
	type:String ,
	required:false ,
	},
    slides:{ 
	type:[SlidesSchema] ,
	required:true ,
	default :[]
	},
	
});
const Presentation = mongoose.model('Presentation', PresentationSchema);

module.exports = Presentation;