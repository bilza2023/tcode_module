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
      classNo: 1,
      chapter: 1,
      board: 1,
      isSpecial: 1,
      partNo: 1,
      questionType: 1,
      status: 1,
      free: 1,
      filename: 1,
      filledBy:1
    });

    return { ok: true,questions };
  } catch (error) {
    return { ok: false, message: "failed to get syllabus" };
  }
}

//A special question may or may not have exercise. if it has exercise then it is special to that exercise but if it does not then it is special to the chapter.
// static async CreateQSpecial(questionType,board,classNo,chapter,name, exercise=""){
//  try{
//  //  debugger;
//     const qReg = getQSpecial(questionType,board,classNo,chapter,name,exercise);
//     const questionData = checkNewQ(qReg);
//     const existingQuestion = await MathFull.findOne(
//       { filename: questionData. question.filename });
//   if (existingQuestion) {
//       return { message: 'Duplicate filename', ok: false, errorCode: 'DUPLICATE_FILENAME' };
//     }
//     //--now actual insert    
//             let q = new MathFull(questionData.question);
//             const question = await q.save();
            
//       return { question , ok : true};
//  } catch (e) {
//     return {message: e.message , ok:false,errorCode : e.code}
//  }

// }
// static async CreateQReg(questionType,board,classNo,chapter,exercise,questionNo,part){
//  try{
// //  debugger;
//     const qReg = getQReg(questionType,board,classNo,chapter,exercise,questionNo,part);
//     const questionData = checkNewQ(qReg);
//         const existingQuestion = await MathFull.findOne(
//       { filename: questionData. question.filename });
//   if (existingQuestion) {
//       return { message: 'Duplicate filename', ok: false, errorCode: 'DUPLICATE_FILENAME' };
//     }        
//             let q = new MathFull(questionData.question);
//             const question = await q.save();
            
//       return { question ,ok:true};
//  } catch (e) {
//     return {message: e.message , ok:false,errorCode : e.code}
//  }

// }

//update
 async update(question){
try{
      const options = { new: false, upsert: false };
      const r = await this.model.findByIdAndUpdate(question._id, question, options);
      // console.log(r);
      return { ok: true };

  }catch(error){
        // return res.status(400).json({ok: false , message:"failed to update question" });
        return {ok: false,error}

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
  } catch(error) {
    return {message : 'unknown error!',ok:false  };
  }

}
async addQuestion(qData,tcode){
  try{
      getFilename(qData,tcode)
       let q = new this.model(qData);
       const question = await q.save();
       return {ok:true , question};
    
  } catch (e) {
     if(e.code == 11000){
     return {message: 'Question already exists' , ok:false}
     }else{
     return {message: e.message , ok:false,errorCode : e.code}
     }
  }
 
 }
//  async createQuestion(qData){
//  try{
// //  debugger;
//     const questionData = getQuestionData(qData);

//     if(questionData.ok){
//       let q = new this.model(questionData.question);
//       const question = await q.save();
//       return {ok:true , question};
//     }else {
//         return {ok:false,message:questionData.message};
//     }
    
//  } catch (e) {
//     if(e.code == 11000){
//     return {message: 'Question already exists' , ok:false}
//     }else{
//     return {message: e.message , ok:false,errorCode : e.code}
//     }
//  }

// }
///////////////////////////////
 async where(query={}) {
   try {
   // Use Mongoose's "find" method with the provided query
   const questions = await this.model.find(query);

   return { questions, ok: true };
   } catch (e) {
   return { message: e.message, ok: false, errorCode: e.code };
   }
}
//////////////////////////
 async count(query={}) {
   try {
   const count = await this.model.countDocuments(query);
   return { count, ok: true };
   } catch (e) {
   return { message: e.message, ok: false, errorCode: e.code };
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

}catch(err){
    return {ok : false , message : "Failed to delete", };
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
  } catch (error) {
    return { ok: false, message: "Failed to get unique chapters", error };
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
  } catch (error) {
    return { ok: false, message: "Failed to get unique exercises", error };
  }
}

async getByStatus(status="final") {
  try {
    const questions = await this.model.find({ status });

    return { ok: true, questions };
  } catch (error) {
    return { ok: false, message: "Failed to get by status", error };
  }
}
async getByQuestionType(questionType="free") {
  try {
    const questions = await this.model.find({ questionType });

    return { ok: true, questions };
  } catch (error) {
    return { ok: false, message: "Failed to get questions by question type", error };
  }
}

async getChapter(chapterNumber) {
  try {
    const questions = await this.model.find({ chapter: chapterNumber });
    return { ok: true, questions };
  } catch (error) {
    return { ok: false, message: "Failed to get questions by chapter", error };
  }
}

async getExercise(exerciseString) {
  try {
    const questions = await this.model.find({ exercise: exerciseString });
    return { ok: true, questions };
  } catch (error) {
    return { ok: false, message: "Failed to get questions by exercise", error };
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
