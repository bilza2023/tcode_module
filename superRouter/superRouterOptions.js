
class SuperRouterOptions {
    constructor(){
    this.model = null; //mongo model object
    this.useAuth = true;

////////////==============CREATE
    this.create = {};
    this.create.checks = [];
    this.create.backendData = {};
    this.create.getNewObjDataFn = (data)=>{
        return {data :{} };
    };


/////////////////////////////////////////////////
    this.update = {};
    this.update.checks = [];
    this.update.backendData = {};
/////////////////////////////////////////////////
    this.read = {};
    this.read.backendData = {};
    this.read.checks = [];
/////////////////////////////////////////////////
    this.readone = {}; 
    this.readone.backendData = {};
    this.readone.checks = [];
/////////////////////////////////////////////////
    this.delete = {};
    this.delete.backendData = {};
    this.delete.checks = [];
/////////////////////////////////////////////////

    }

}


module.exports = SuperRouterOptions;