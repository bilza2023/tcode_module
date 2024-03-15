/**
 * 3-Mar-2024
 * What are rules implemented at this level
 *  1- The item can not be deleted if has slides.
 *  2- The file path is calculated as per 1 exclusive function thus it is kept unique.
 *  3- "chapter" & "exercise" are only variables required but at create time "filename" is added into automatically.
 * 4- You can expose the mongoose-model using "mongooseModel()"
 * 5- I have decided to keep debugging-mode/non-debugging-mode out of this level (on top). This means that tcode_module is always in debugging mode and it is the api on top (Taleem_Api) to decide to expose it or not. From here we are sending all errors using "error"
 */
const mongoose = require("mongoose");
const prepResp = require('./prepResp');
class TCode {
  constructor(model) {
    this.model = model;
  }
 mongooseModel(){
  return this.model;
 }
 async getSyllabus() {
  try {
    // Attempt to fetch syllabus data from the database
    const questions = await this.model.find({}).select({
      chapter: 1,
      exercise: 1,
      name: 1,
      part: 1,
      questionNo:1,
      questionType: 1,
      status: 1,
      filename: 1,
    });

    // Return the fetched questions if successful
    return { ok: true, questions };
    
  } catch (error) {
    // Log the error for debugging purposes
    // console.error('Error in getSyllabus:', error);

    // Determine the type of error and provide appropriate error handling
    if (error instanceof mongoose.Error) {
      // Handle Mongoose errors
      return { ok: false, message: 'Failed to fetch syllabus data: Mongoose error occurred', error };
    } else {
      // Handle other types of errors
      return { ok: false, message: 'Failed to fetch syllabus data: Unknown error occurred', error };
    }
  }
}
//update
async update(question) {
  try {
    // Specify update options
    const options = { new: false, upsert: false };

    // Attempt to update the question in the database
    const updateResult = await this.model.findByIdAndUpdate(question._id, question, options);

    // Return a success message along with the update result if successful
    return { ok: true, result: updateResult, message: 'Question updated successfully' };
  } catch (error) {
    // Log the error for debugging purposes
    // console.error('Error in update:', error);

    // Determine the type of error and provide appropriate error handling
    if (error instanceof mongoose.Error) {
      // Handle Mongoose errors
      return { ok: false, message: 'Failed to update question: Mongoose error occurred', error };
    } else {
      // Handle other types of errors
      return { ok: false, message: 'Failed to update question: Unknown error occurred', error };
    }
  }
}
//Get Question
async get(id) {
  try {
    // Attempt to find the question by ID
    const question = await this.model.findById(id).lean();

    // Check if the question exists
    if (question !== null) {
      return { ok: true, question, message: 'success' };
    } else {
      return { ok: false, message: 'Question not found' };
    }
  } catch (error) {
    // Log the error for debugging purposes
    // console.error('Error in get:', error);

    // Return an error object with a generic error message
    return { ok: false, message: 'Failed to fetch question', error };
  }
}
async addQuestion(tcode, qData) {
  try {
    // Generate filename for the question
    getFilename(qData, tcode);

    // Create a new question instance
    const newQuestion = new this.model(qData);

    // Save the question to the database
    const savedQuestion = await newQuestion.save();

    // Return success message along with the saved question
    return { ok: true, question: savedQuestion, message: 'Question created successfully' };
  } catch (error) {
    // Log the error for debugging purposes
    // console.error('Error in addQuestion:', error);

    // Check if the error is due to duplicate filename
    if (error.code === 11000) {
      return { ok: false, message: 'Duplicate filename: Question already exists', error };
    } else {
      // Return a generic error message for other types of errors
      return { ok: false, message: 'Failed to create question', error };
    }
  }
}

///////////////////////////////
async where(query = {}) {
  try {
    // Use Mongoose's "find" method with the provided query
    const items = await this.model.find(query);

    // Return the items along with success message
    return { ok: true, items, message: 'success' };
  } catch (error) {
    // Log the error for debugging purposes
    // console.error('Error in where:', error);

    // Return an error object with the error message
    return { ok: false, message: 'Failed to fetch items', error };
  }
}

//////////////////////////
async count(query = {}) {
  try {
    // Count documents matching the query
    const count = await this.model.countDocuments(query);

    // Return the count along with success message
    return { ok: true, count, message: 'Count successful' };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error in count:', error);

    // Return an error object with the error message
    return { ok: false, message: 'Failed to count documents', error };
  }
}

//////////////////////////
async delete(id) {
  try {
    // Convert the id to a MongoDB ObjectId
    // const objectId = mongoose.Types.ObjectId(id);

    // Find the question by id
    const question = await this.model.findById(id);

    // Check if the question exists
    if (!question) {
      return { ok: false, message: 'Question not found', status: 404 };
    }

    // Check if the question has slides
    if (question.slides.length > 0) {
      return { ok: false, message: 'Question has content', status: 500 };
    }

    // Delete the question
    await this.model.findByIdAndRemove(id);

    // Return success message
    return { ok: true, message: 'Question deleted', status: 200 };
  } catch (error) {
    // Log the error for debugging purposes
    // console.error('Error in delete:', error);

    // Return an error object with the error message
    return { ok: false, message: 'Failed to delete question', error };
  }
}
 
async getUniqueChapters() {
  try {
    const chapters = await this.model.aggregate([
      {
        $match: { chapter: { $exists: true } }
      },
      {
        $group: {
          _id: null,
          chapters: { $addToSet: "$chapter" }
        }
      },
      {
        $project: {
          _id: 0,
          chapters: 1
        }
      }
    ]);

    if (chapters.length > 0) {
      return { ok: true, chapters: chapters[0].chapters };
    } else {
      return { ok: false, message: "No chapters found" };
    }
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get unique chapters" };
  }
}

async getUniqueExercises() {
  try {
    const exercises = await this.model.aggregate([
      {
        $match: { exercise: { $exists: true } }
      },
      {
        $group: {
          _id: null,
          exercises: { $addToSet: "$exercise" }
        }
      },
      {
        $project: {
          _id: 0,
          exercises: 1
        }
      }
    ]);

    if (exercises.length > 0) {
      return { ok: true, exercises: exercises[0].exercises };
    } else {
      return { ok: false, message: "No exercises found" };
    }
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get unique exercises" };
  }
}

async getByStatus(status = "final") {
  try {
    const items = await this.model.find({ status });

    return { ok: true, items, message: "Success" };
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get by status" };
  }
}

async getByQuestionType(questionType = "free") {
  try {
    // Validate the questionType input
    if (!['free', 'paid', 'other'].includes(questionType)) {
      throw new Error("Invalid question type provided");
    }

    const items = await this.model.find({ questionType });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
    return { error, ok: false, message: "Failed to get questions by question type" };
  }
}

async getChapter(chapterNumber) {
  try {
    // Validate the chapterNumber input
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }

    const items = await this.model.find({ chapter: chapterNumber });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get questions by chapter" };
  }
}

async getExercise(exerciseName) {
  try {
    // Validate the exerciseName input
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.find({ exercise: exerciseName });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get questions by exercise" };
  }
}
async chapterMap() {
  try {
    const chapterMap = [];

    // Step 1: Aggregate unique chapters
    const uniqueChapters = await this.model.aggregate([
      { $group: { _id: "$chapter" } }
    ]);

    // Step 2: Sort chapters
    const sortedChapters = uniqueChapters.map(chapter => chapter._id).sort((a, b) => a - b);

    // Step 3: Generate chapter map
    for (const chapter of sortedChapters) {
      const exercises = await this.model.distinct("exercise", { chapter });
      chapterMap.push({ chapter, exercises });
    }

    return { ok: true, chapterMap };
  } catch (error) {
    return { ok: false, message: "Failed to generate chapter map", error };
  }
}
async getExerciseByChapter(chapterNumber, exerciseName) {
  try {
    // Validate the chapterNumber and exerciseName inputs
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.find({ chapter: chapterNumber, exercise: exerciseName });

    return { ok: true, items, message: "Questions retrieved successfully" };
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get questions by chapter and exercise" };
  }
}

async getChapterSyllabus(chapterNumber) {
  try {
    // Validate the chapterNumber input
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }

    const items = await this.model.find({ chapter: chapterNumber })
      .select({
        chapter: 1,
        exercise: 1,
        name: 1,
        part: 1,
        questionNo: 1,
        questionType: 1,
        status: 1,
        free: 1,
        filename: 1,
      });

    return { ok: true, items, message: "Chapter syllabus retrieved successfully" };
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get chapter syllabus" };
  }
}

async getExerciseByChapterSyllabus(chapterNumber, exerciseName) {
  try {
    // Validate the chapterNumber and exerciseName inputs
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.find({ chapter: chapterNumber, exercise: exerciseName })
      .select({
        chapter: 1,
        exercise: 1,
        name: 1,
        part: 1,
        questionNo: 1,
        questionType: 1,
        status: 1,
        free: 1,
        filename: 1,
      });

    return { ok: true, items, message: "Exercise syllabus retrieved successfully" };
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get exercise syllabus" };
  }
}
async slidesState(chapterNumber, exerciseName) {
  try {
    // Validate the chapterNumber and exerciseName inputs
    if (typeof chapterNumber !== 'number' || isNaN(chapterNumber)) {
      throw new Error("Invalid chapter number provided");
    }
    if (typeof exerciseName !== 'string' || exerciseName.trim() === '') {
      throw new Error("Invalid exercise name provided");
    }

    const items = await this.model.aggregate([
      { $match: { chapter: chapterNumber, exercise: exerciseName } },
      { 
        $project: {
          chapter: 1,
          exercise: 1,
          name: 1,
          part: 1,
          questionNo: 1,
          questionType: 1,
          status: 1,
          free: 1,
          filename: 1,
          slidesCount: { $size: "$slides" } // Step 3: Counting the number of items in the "slides" array
        } 
      }
    ]);

    return { ok: true, items, message: "Exercise syllabus retrieved successfully" };
  } catch (error) {
    return { e: error, ok: false, message: "Failed to get exercise syllabus" };
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
