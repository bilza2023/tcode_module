/**
 * 3-Mar-2024
 * What are rules implemented at this level
 *  1- The item can not be deleted if has slides.
 *  2- The file path is calculated as per 1 exclusive function thus it is kept unique.
 *  3- Board and chapter are only 2 variables required but at create time "filename" is added into the data.
 * 4- You can expose the mongoose-model using "mongooseModel()"
 * 5- I have decided to keep debugging-mode/non-debugging-mode out of this level (on top). This means that tcode_module is always in debugging mode and it is the api on top (Taleem_Api) to decide to expose it to use or not. From here we are sending all errors using "e"
 */
const mongoose = require("mongoose");

class TCode {
  constructor(model) {
    this.model = model;
  }
 mongooseModel(){
  return this.model;
 }
 async getSyllabus() {
  try {
 const questions = await this.model.find({}).select({
      
      chapter: 1,
      board: 1,
      exercise:1,
      isSpecial: 1,
      partNo: 1,
      questionType: 1,
      status: 1,
      free: 1,
      filename: 1,
      filledBy:1
    });

    return { ok: true,questions };
  } catch (e) {
    return { e:e, ok: false, message: "failed to get syllabus" };
  }
}

//update
 async update(question){
try{
      const options = { new: false, upsert: false };
      const update_result = await this.model.findByIdAndUpdate(question._id, question, options);
      // console.log(r);
      return { ok: true ,result : update_result,message:"success"};

  }catch(e){
        // return res.status(400).json({ok: false , message:"failed to update question" });
        return {e:e, ok: false}

  }
}
//Get Question
 async get(id){
  try {
// debugger;
    const question = await this.model.findById( id ).lean();;
      if (question !== null   ){
        return { question, message: "success" ,ok:true};
      }else {
        return { message: "Not found" ,ok:false};
      }      
  } catch(e) {
    return {message : 'unknown error!',ok:false ,e:e };
  }

}
async addQuestion(tcode,qData){
  try{
      getFilename(qData,tcode)
       let q = new this.model(qData);
       const question = await q.save();
       return {ok:true , question};
    
  } catch (e) {
     if(e.code == 11000){
     return {e:e,message: 'Dublicate filename : Question already exists' , ok:false}
     }else{
      //e.message, errorCode : e.code //--do not send to user --stop here 
     return {e:e,message: "failed to create" , ok:false}
     }
  }
 
 }

///////////////////////////////
 async where(query={}) {
   try {
   // Use Mongoose's "find" method with the provided query
   const items = await this.model.find(query);

   return { items, ok: true ,message:"success"};
   } catch (e) {
   return { e:e, message: e.message, ok: false };
   }
}
//////////////////////////
 async count(query={}) {
   try {
   const count = await this.model.countDocuments(query);
   return { count, ok: true ,message:"success"};
   } catch (e) {
   return { e:e, message: e.message, ok: false };
   }
}
//////////////////////////
 async delete(id){
try{
//  debugger;
     let objectId = new mongoose.Types.ObjectId(id);
     const question = await this.model.findById(objectId );    
     if (!question){
            return {ok : false ,message : "question not found", status:404 };
     }
     if (question.slides.length > 0){
            return {ok : false ,message : "question has content", status:500 };
     }
     
     await this.model.findByIdAndRemove(objectId );    
     return {ok : true ,message : "Question deleted", status:200 };

}catch(e){
    return {e:e, ok : false , message : "Failed to delete" };
}  
}

async getUniqueChapters() {
  try {
    const chapters = await this.model.aggregate([
      {
        $match: { chapter: { $exists: true } } // Skip documents without the chapter field
      },
      {
        $group: {
          _id: null,
          chapters: { $addToSet: "$chapter" } // Create an array of unique chapters
        }
      },
      {
        $project: {
          _id: 0,
          chapters: 1 // Exclude the default _id field and include only the chapters array
        }
      }
    ]);

    if (chapters.length > 0) {
      return { ok: true, chapters: chapters[0].chapters };
    } else {
      return { ok: false, message: "No chapters found" };
    }
  } catch (e) {
    return {e:e, ok: false, message: "Failed to get unique chapters" };
  }
}

async getUniqueExercises() {
  try {
    const exercises = await this.model.aggregate([
      {
        $match: { exercise: { $exists: true } } // Skip documents without the exercise field
      },
      {
        $group: {
          _id: null,
          exercises: { $addToSet: "$exercise" } // Create an array of unique exercises
        }
      },
      {
        $project: {
          _id: 0,
          exercises: 1 // Exclude the default _id field and include only the exercises array
        }
      }
    ]);

    if (exercises.length > 0) {
      return { ok: true, exercises: exercises[0].exercises };
    } else {
      return { ok: false, message: "No exercises found" };
    }
  } catch (e) {
    return {e:e, ok: false, message: "Failed to get unique exercises" };
  }
}

async getByStatus(status="final") {
  try {
    const items = await this.model.find({ status });

    return { ok: true, items ,message:"success"};
  } catch (e) {
    return { e:e,ok: false, message: "Failed to get by status" };
  }
}
async getByQuestionType(questionType="free") {
  try {
    const items = await this.model.find({ questionType });

    return { ok: true, items ,message:"success"};
  } catch (e) {
    return {e:e, ok: false, message: "Failed to get questions by question type" };
  }
}

async getChapter(chapterNumber) {
  try {
    const items = await this.model.find({ chapter: chapterNumber });
    return { ok: true, items ,message:"success"};
  } catch (e) {
    return {e:e, ok: false, message: "Failed to get questions by chapter" };
  }
}

async getExercise(exerciseName) {
  try {
    const items = await this.model.find({ exercise: exerciseName });
    return { ok: true, items ,message:"success"};
  } catch (e) {
    return {e:e, ok: false, message: "Failed to get questions by exercise" };
  }
}


}//questions

module.exports = TCode;

function getFilename(question,tcode){
  let filename = tcode;

  if (question.chapter){    
    filename +=  `_ch_${question.chapter}`
  }
  if (question.exercise){    
    filename +=  `_ex_${question.exercise}`
  }
  if (question.questionNo){    
    filename +=  `_q_${question.questionNo}`
  }
  if (question.part){    
    filename +=  `_pt_${question.part}`
  }
  if (question.name){    
    filename +=  `_n_${question.name}`
  }
  ////////////////////////////////////
  question.filename = filename;
  ////////////////////////////////////

  }
