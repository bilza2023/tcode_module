# TCode Module

## Introduction

TCode is a wrapper module designed for the Mongoose model created for the TCodeSchema.

### Objective

The objective of this module is to provide a Mongoose Schema called "TCodeSchema" and wrap a model around it.

### Components

- **TCodeSchema**: This schema consists of 18 fields, with only 3 required for creating a new question. The fourth field, filename, is automatically added by the TCode model.
  
- **TCode Model**: This is a wrapper around the Mongoose model, providing functionality related to the TCodeSchema.

- **tcode Function**: The module exports a single function called "tcode", which takes a string and converts it into a model wrapped around the TCodeSchema.

### What TCode Module Is Not

- This module does not validate whether the string being passed is valid as per collections present in your database.
  
- Mongoose is only required within the TCode module to create models using TCodeSchema; it does not connect to the database.
  
- The TCodeSchema includes a "version" field, indicating the current version. Minor changes in version are almost not allowed.
  
- The TCode model requires only 3 required fields (board, classNo, and chapter), with the filename field added automatically by TCode.
  
- The filename field is expected to be unique in the table.
  
- Besides the 3 required fields and the addition of the 4th filename field, the TCode module does not perform any additional checks. If you require checking, add it to your router code.
  
- It is recommended not to mix the router code with the TCode model code.

## TCodeSchema

```javascript
=========================== TcodeSchema =======================
1 : board              : ['bisep', 'fbise'],
2 : classNo            : Number , required
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


///// tcode function

const mongoose = require('mongoose');
const TCodeSchema = require('./TCodeSchema');
const TCode = require("./TCode");

function tcode(tcode){
    const mdl =  mongoose.model(tcode, TCodeSchema);
    return new TCode(mdl)
}

module.exports = tcode;

```
