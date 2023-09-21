
I want an array of question object in the following format.
- Each question will have a statement and an array of options. 
- if "multiSelect : false" then there can be just one correct option but if the question is multiSelect : true then it will be more than one correct option.
- Each question must have some wrong options, a question can not have all its options as correct.

[
    {
        statement : "The statement of the question",
        multiSelect : false,

        options : [
            {content: "The content of the option", correct : true},
            {content: "The content of the option", correct : false},
            {content: "The content of the option", correct : false},

        ]
    }
]

check these 2 examples

[

    {
        statement : " Which country is farther north, south, east, and west than Iceland?",
        multiSelect : false,

        options : [
            {content: "Greenland", correct : true},
            {content: "Finland", correct : false},
            {content: "Canada", correct : false},
        ]
    },
    {
        statement : " Which countries have a population of more than 200 million? ",
        multiSelect : true,

        options : [
            {content: "India", correct : true},
            {content: "China", correct : true},
            {content: "Nepal", correct : false},
            {content: "Pakistan", correct : true},
        ]
    },
]

Give me an array of question object.
 5 questions in total
 Keep half questions as multiSelect = true and half as false.
 on the topic of "World Geography Interesting Fects"