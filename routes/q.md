
nonAuthRouter.get("/getex", async function (req, res) {
  try {
    const boardParam = req.query.board;
    const exerciseParam = req.query.exercise;

    if (!boardParam || !exerciseParam) {
      return res.status(400).json({ msg: "Board and exercise parameters are required" });
    }

    const mathQuestions = await MathQuestion.find({ board: boardParam, exercise: exerciseParam });

    if (mathQuestions.length === 0) {
      return res.status(404).json({ msg: "No matching math questions found" });
    }

    return res.status(200).json({ mathQuestions, msg: "success" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unknown error!' });
  }
});

module.exports = nonAuthRouter;
