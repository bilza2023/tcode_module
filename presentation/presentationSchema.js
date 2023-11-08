
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

///////////////////////
const KVPairSchema = new Schema({
 key:{ 
	type:String ,
	required:true ,
	},
 value:{ 
	type:String ,
	required:true ,
	default:'' ,
	},
});
////////////////////////
const ItemSchema = new Schema({
 name:{ 
	type:String ,
	required:false ,
	},
 content:{ 
	type:String ,
	required:false ,
	},
 showAt:{ 
	type:Number ,
	required:true ,
	default:0
	},
 extra:{ 
 	type: Schema.Types.Mixed,
    required: true,
    default: {},
    }
});

const SlidesSchema = new Schema({
    startTime:{ 
	type:Number ,
	required:false ,
	},
    endTime:{ 
	type:Number ,
	required:false ,
	},
    type:{ 
	type:String ,
	required:false ,
	},
    version:{ 
	type:String ,
	required:true ,
	default : '0.0.0'
	},//items compExtra template
    template:{ 
	type:String ,
	required:true ,
	default : ''
	},//  
    items:{ 
	type:[ItemSchema] ,
	required:true ,
	default : []
	},
    slideExtra:{ 
	type:[KVPairSchema] ,
	required:true ,
	default : []
	}, 
    
	
});

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