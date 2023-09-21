I am creating an  app for quiz tests / multi choice question tester. 
Here is the format / json format for my quiz object in mongodb database.
- The quiz object has properties like title , userId etc.
- Quiz has a questions array of object which has question objects.
- At the moment there are just "questionType": "SurveyMCQ" questions available.
- The "questionType": "SurveyMCQ" can be of type "multiSelect" == true or "multiSelect" == false.
- Every question has options and options has ids. The question also has an array of ids called "correctOptions". The "correctOptions" array will contain the ids of the options that are correct.

- user uuid for generating ids

- "multiSelect" == false :
It means that the student can select just one of the options as correct.
There will/should be just one id of an option in the "correctOptions" array. 
There should always be some options which are wrong.

- "multiSelect" == true:
It means that the student can select more than one  options as correct.
There will/should be more than one ids of an correct options in the "correctOptions" array. In "multiSelect" == true the number of options must always be greater than the number of correctOptions. There should always be some options which are wrong. 



///////////////////////////////////////////////////
const quiz ={
  "_id": {
    "$oid": "648efee9437e4a8859329735"
  },
  "title": "Complete-Template",
  "userId": "64202224fd8518cb214bd138",
  "saveResponse": false,
  "showIntro": true,
  "introText": "Welcome",
  "published": false,
  "showResult": true,
  "showfarewellText": true,
  "farewellText": "Goodbye",
  "members": [],
  "marks": 10,
  "questions": [
    {
      "id": "7b1f252b-92be-44fc-9d56-396912339097",
      "required": false,
      "content": "Single Select Question",
      "explanation": "",
      "marks": 0,
      "questionType": "SurveyMCQ",
      "_id": {
        "$oid": "648eff3b437e4a8859329746"
      },
      "__t": "SurveyMCQ",
      "multiSelect": false,
      "selectedOptions": [],
      "correctOptions": [
        "ef7a02b7-5dbd-4ea2-92ce-49fc75274ab4"
      ],
      "displayOptions": "bars",
      "options": [
        {
          "id": "ef7a02b7-5dbd-4ea2-92ce-49fc75274ab4",
          "content": "first",
          "_id": {
            "$oid": "648eff3b437e4a8859329747"
          }
        },
        {
          "id": "4230a666-0486-4ee0-b319-d35a9c29dc8a",
          "content": "second",
          "_id": {
            "$oid": "648eff3b437e4a8859329748"
          }
        }
      ]
    },
    {
      "id": "ed912103-dd9a-4494-8416-bbbc6d86387b",
      "required": false,
      "content": "Multi Select",
      "explanation": "",
      "marks": 0,
      "questionType": "SurveyMCQ",
      "_id": {
        "$oid": "648eff3b437e4a8859329749"
      },
      "__t": "SurveyMCQ",
      "multiSelect": true,
      "selectedOptions": [],
      "correctOptions": [
        "5d687b2f-b433-4277-890b-e2f43c595831",
        "cb580056-6814-44af-833d-e891c188a6c6"
      ],
      "displayOptions": "bars",
      "options": [
        {
          "id": "5d687b2f-b433-4277-890b-e2f43c595831",
          "content": "one",
          "_id": {
            "$oid": "648eff3b437e4a885932974a"
          }
        },
        {
          "id": "cb580056-6814-44af-833d-e891c188a6c6",
          "content": "two",
          "_id": {
            "$oid": "648eff3b437e4a885932974b"
          }
        },
        {
          "id": "74d254c9-0d06-4888-bbe6-3a6a8d49ce94",]
          "content": "three",
          "_id": {
            "$oid": "648eff3b437e4a885932974c"
          }
        }
      ]
    }
  ],
  "createdAt": {
    "$date": "2023-06-18T12:56:09.267Z"
  },
  "__v": 0
}


I plan on asking you to create me  a large number of such quizes. please check this format and ask me any questions (in point form) to explain.


Chat GPT Questions with answers

Thank you for sharing the format of your quiz object. I have a few questions to clarify:

Q:What is the maximum number of questions that can be added to a quiz?
20

Q:Can the questions be of different types other than “SurveyMCQ”?
yes but for now we just use this type. other types are “SurveyParagraph”, “SurveyInput” , “SurveyUrl” etc etc.

Q:Can the options for each question be of different types (e.g. text, image, audio)?
No. for now we are just working with test based questions. in future if we have to do something like this we will create new question types.

Is there a limit to the number of options for each question?
200

Can the marks for each question be different?
yes. quiz.marks is actually "Marks for each question" , How ever if the question.marks is not == 0 , then we over -ride the default quiz.marks for this question and award it marks mentiond by question.marks.
The total marks of a quiz =
    total number of questions * quiz.marks (replace the questions which have their own marks).
     
Q: Can the "content" of the questions contain HTML or rich text formatting?
just text,in future if we have to do something like this we will create new question types.

Q: Can the "explanation" for each question contain HTML or rich text formatting?
just text,in future if we have to do something like this we will create new question types.

Q: Can the "displayOptions" property have different values for different questions, or is it consistent for all questions in a quiz?
leave that does not matter.

Q: Are there any additional properties or features you would like to include in the quiz object or questions?     
Thanks. 


