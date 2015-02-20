var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
  .find({"_id": projectID})
  .sort('-date')
  .exec(afterQuery);

  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  var model_data = {
    "title": form_data.project_title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url
  }
  console.log(form_data);
  var new_project = new models.Project(model_data)
  new_project.save(afterSaving);
 

  function afterSaving(err){
    if(err){console.log(err);} 
    res.send("OK");
  }

    

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  models.Project
  .find({"_id":projectID})
  .remove()
  res.send();


  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}