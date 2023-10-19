# Add Syllabus

This folder (and the addSyllabus.js file in the root) is a system to insert a math syllabus into the database.
The table /collection to recieve this syllabus is name in mathFull/mathFull.js

- In any math syllabus we have 2 type of questions regular and special. 

- Regular questions: follow the exercise, question no and part schema. 

- Special questions: They either do not have question no and part or do not have exercise , question no and part.

- The regular questions are marked with isSpecial = false and the special questions are marked with isSpecial = true.

- Types of Special Questions: There can be further 2 types of special questions
    
    - Special to Chapter : Which has no exercise and also no question no and part no.
    - Special to Exercise : Which HAS exercise but no question or part no. 

- Regular questions also have 2 variations.
    - Regular question with parts
    - Regular question withOUT parts : they have part == 0

- In addition to isSpecial we also have another category called questionType. there can be ['eqs', 'grid' , 'presentation'] types. This show in which editor the question will be edited and played.     

Next ==>
    1. I can mark exercises with eqs or grid etc (questionType) in FBISE9thData. how ever if there are questions inside an exercise which are eqs in grid exericse or grid in eqs exercise i dont have system for it. I think i will have to create a list for it.