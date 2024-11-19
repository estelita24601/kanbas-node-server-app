const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};
const ASSIGNMENT_PATH = "/lab5/assignment";

//todo: put values here
const module = {
  id: "110-07",
  name: "Proprioception and Tactile Sensation",
  description: "Touch receptors, nociceptors, and the somatosensory cortex",
  course: "BCS110",
};
const MODULE_PATH = "/lab5/module";

export default function WorkingWithObjects(app) {
  //return entire assignment object
  app.get(ASSIGNMENT_PATH, (req, res) => {
    res.json(assignment);
  });

  //return the title of the assignment
  app.get(`${ASSIGNMENT_PATH}/title`, (req, res) => {
    res.json(assignment.title);
  });

  //update title of the assignment then return it
  app.get(`${ASSIGNMENT_PATH}/title/:newTitle`, (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  //update score of the assignment then return it
  app.get(`${ASSIGNMENT_PATH}/score/:newScore`, (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  });

  //update completion of the assignment then return it
  app.get(`${ASSIGNMENT_PATH}/completed/:isComplete`, (req, res) => {
    const { isComplete } = req.params;
    assignment.completed = isComplete;
    res.json(assignment);
  });

  //return the entire module object
  app.get(MODULE_PATH, (req, res) => {
    res.json(module);
  });

  //update the name of the module
  app.get(`${MODULE_PATH}/name`, (req, res) => {
    res.json(module.name);
  });

  //update the name of the module then return it
  app.get(`${MODULE_PATH}/name/:newName`, (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });

  //update the description of the module then return it
  app.get(`${MODULE_PATH}/description/:newDescript`, (req, res) => {
    const { newDescript } = req.params;
    module.description = newDescript;
    res.json(module);
  });
}
