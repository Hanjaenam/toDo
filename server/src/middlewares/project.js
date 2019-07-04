import Project from 'models/Project';

export const onlyProjectCreator = async (req, res, next) => {
  const {
    params: { id },
    baseUrl,
    url,
  } = req;
  console.log(id, baseUrl, url);
  try {
    let project;
    switch (baseUrl) {
      case '/project':
        project = await Project.findById(id);
        break;
      case '/toDoList':
        if (url.includes('/read')) {
          project = await Project.findById(id);
        } else {
          project = await Project.findOne({ toDoList: id });
        }
        break;
      default:
        return res.status(400).end;
    }
    if (String(project.creator) !== String(req.user._id)) {
      return res.status(403).end();
    }
    res.locals.project = project;
    return next();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const onlyNotCompleted = async (req, res, next) => {
  const {
    locals: { project },
  } = res;
  try {
    if (project.isCompleted) {
      return res.status(400).end();
    }
    return next();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
