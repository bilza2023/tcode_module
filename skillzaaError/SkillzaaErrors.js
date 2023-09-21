

class SkillzaaError extends Error {
  constructor(name, statusCode, message,description) {
  //message is the default message of the error a little more descriptive form of slug/name
    super(message);
    this.name = name;
    this.type = 'skillzaaError';
    this.description = description; //for later for local use
    this.statusCode = statusCode;
  }
 getJson(){
  return {
    message : this.message,
    description : this.description,
    name : this.name
  };
 } 
}


class SkillzaaErrors {
  #errs = [];

  addErr(name, statusCode, message,description) {
    //--move this line to before push
    const newErr = new SkillzaaError(name, statusCode, message,description)
    if (this.#errs.some(e => e.name === newErr.name)) {
      throw new Error('Error with this name already exists');
    }
    this.#errs.push(newErr);
  }
  getErr(name) {
   const err = this.#errs.find(err => err.name === name);
    if (!err) {
      throw new Error("Error Not Found");
    }
    return err;
}
  
}

module.exports = {SkillzaaErrors,SkillzaaError};