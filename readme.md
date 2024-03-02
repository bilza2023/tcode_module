# TCode Module

## Introduction

TCode is a wrapper module for a Mongoose model which is created for TCodeSchema.

### Objective

The objective of this module is to provide a Mongoose Schema called "TCodeSchema" and wrap a model around it.

### Components

- **TCodeSchema**: This schema consists of 18 fields, with only 3 required for creating a new question. The fourth field, filename, is automatically added by the TCode model.
  
- **TCode Model**: This is a wrapper around the Mongoose model, providing functionality related to the TCodeSchema.

- **{getTcode,registerTcode}**: it exports 2 functions {getTcode,registerTcode}. The registerTcode will take an array of string values and construct a TCode model (which wraps a mongoose model for TCodeSchema) for each string. These TCode models are saved in an internal array. The getTcode will get the required TCode object using tcode_name.
  

### What TCode Module Is Not

- This module needs that the models be registered before they can be used. If a model is not registered the getTcode will return false.
  
- Mongoose is only required within the TCode module to create models using TCodeSchema; it does not connect to the database. But we need .env file in this project and local mongodb connection for testing.
  
- The TCodeSchema includes a "version" field, indicating the current version. Minor changes in version are almost not allowed.
  
- The TCode model requires only 3 required fields (board, classNo, and chapter), with the filename field added automatically by TCode.
  
- The filename field is expected to be unique in the table.
  
- Besides the 3 required fields and the addition of the 4th filename field, the TCode module does not perform any additional checks. If you require checking, add it to your router code.
  
- It is recommended not to mix the router code with the TCode model code.

## TCodeSchema

```javascript
=========================== TcodeSchema =======================
1 : board              : ['bisep', 'fbise'],
2 : classNo            : Number , required2 *** removed
3 : filename           : String - required - unique
4 : chapter            : Number , required
==============================================================
5 : exercise           : String , -
6 : questionNo         : Number , -
7 : part               : Number , -
8 : name               : String , -
9 : isSpecial          : False  , -
10 : teacherComments   : String  , -
11 : adminComments     : String  , -
12 : questionType      : ['paid', 'login' , 'free'],  , "paid"
13 : status            : ['empty' ,'fill' ,'locked', 'final'], "empty"
14 : filledBy          : String, -
15 : schemaType        : String, "mathSchema"
16 : slides            : [Slides], -
17 : version           : Number, 0.1
18 : sortOrder         : Number, 0
```

## tcode function

```javascript

const mongoose = require('mongoose');
const TCodeSchema = require('./TCodeSchema');
const TCode = require("./TCode");
let registered = false;
const tcodeModels = [];

function getTcode(tcode_name){
    
    for (let i = 0; i < tcodeModels.length; i++) {
        
        const tcode_model = tcodeModels[i];
        if(tcode_model.key == tcode_name){
            return tcode_model.value;
        }
    }
 return false;    
}

function registerTcode(list=[]){
    if(!registered) {registered = true;}
    else {return {ok:false,message : "already registered"}}

    for (let i = 0; i < list.length; i++) {    
        
        const tcode_name = list[i];
        if (mongoose.modelNames().includes(tcode_name)) {
            console.warn(`Model "${tcode_name}" already exists, skipping...`);
            return; // Skip registering this TCode
        }
        const mongoose_mdl =  mongoose.model(tcode_name, TCodeSchema);
        const tcode_mdl =  new TCode(mongoose_mdl);
        
        tcodeModels.push ({
            key : tcode_name,
            value : tcode_mdl
        });
    }
}
module.exports = {getTcode,registerTcode};

```



## TCode API

```javascript

1:  mongooseModel() : Return the mongoose orignal Model
2:  getSyllabus() : return { ok: true,questions };
3:  update(question) : return { ok: true ,result : update_result};2
4:  get(id) : return { question, message: "success" ,ok:true};
5:  addQuestion(tcode,qData) : return {ok:true , question};
6:  where(query={}) : return { questions, ok: true };
7:  count(query={}) : return { count, ok: true };
8:  delete(id) : return {ok : true ,message : "Question deleted", status:200 };
9:  getUniqueChapters() : return { ok: true, chapters };
10: getUniqueExercises() : return { ok: true, exercises: exercises[0].exercises };
11: getByStatus(status="final") : return { ok: true, questions };
12: getByQuestionType(questionType="free") : return { ok: true, questions };
13: getChapter(chapterNumber) : return { ok: true, questions };
14: getExercise(exerciseString) : { ok: true, questions }

```