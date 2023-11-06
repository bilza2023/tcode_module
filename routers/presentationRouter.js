
require('dotenv').config();
const express = require('express');
const presentationRouter = express.Router();
const Presentation = require('../presentation/presentationSchema.js');
//////////////////////////////////

presentationRouter.post("/readAll" , async function(req,res) {
  try {
  // debugger;
   const items = await Presentation.find({});
      if (items !== null   ){
        return res.status(200).json({ items });
      }else {
        return res.status(404).json({ message: "Not found" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});

presentationRouter.post("/read" , async function(req,res) {
  try {
debugger;
  const id  = req.body.id;
   const presentation = await Presentation.findById( id ).lean();;
      if (presentation !== null   ){
        return res.status(200).json({ presentation });
      }else {
        return res.status(404).json({ message: "Not found" });
      }

  } catch(error) {
    return res.status(400).json({message : 'unknown error!'  });
  }
});
presentationRouter.post("/update" , async function(req,res) {
try{
    debugger;
    const presentation = req.body.presentation;
    const options = { new: false, upsert: true };
    const r =  await Presentation.findByIdAndUpdate(presentation._id, presentation, options);
    if (r.ok){
      return res.status(200).json({ ok:true });
    }else {
      return res.status(500).json({ ok:false, message:"failed to update" });
    }

  }catch(error){
        // return res.status(500).json({status : "error" , msg:"failed to save presentation"   });
        console.log("error", error);
  }
});
presentationRouter.post("/create" , async function(req,res) {
try{
    debugger;
    const presentation = req.body.presentation;
    let q = new Presentation(presentation);
            const r = await q.save();
      return res.status(200).json({ ok:true });
   
  }catch(error){
      return res.status(500).json({ ok:false, message:"failed to create" });
  }
});
presentationRouter.post("/delete" , async function(req,res) {
try{
    debugger;
    const id = req.body.id;
    await Presentation.findByIdAndRemove(id );    
      return res.status(200).json({ ok:true });
  }catch(error){
        // return res.status(500).json({status : "error" , msg:"failed to save presentation"   });
        console.log("error", error);
  }
});
////////////////////////////////////////////////////////
module.exports = presentationRouter;
////////////////////////////////////////////////////////
