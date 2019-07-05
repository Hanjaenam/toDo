import Project from 'models/Project';
import ToDoList from 'models/ToDoList';

export const onlyProjectCreator = async (req, res, next) => {
  const {
    params: { id },
    baseUrl,
    url,
  } = req;
  try {
    switch (baseUrl) {
      case '/project':
        {
          const project = await Project.findById(id);
          if (String(project.creator) !== String(req.user._id)) {
            return res.status(403).end();
          }
          res.locals.project = project;
        }
        break;
      case '/toDoList':
        {
          const project = url.includes('/read')
            ? await Project.findById(id)
            : await Project.findOne({ toDoList: id });
          if (String(project.creator) !== String(req.user._id)) {
            return res.status(403).end();
          }
          res.locals.project = project;
        }
        break;
      case '/toDo':
        if (url.includes('/read')) {
          const project = await Project.findOne({ toDoList: id }).populate(
            'toDoList',
          );
          if (String(project.creator) !== String(req.user._id)) {
            return res.status(403).end();
          }
          res.locals.toDoList = project.toDoList;
        }
        break;
      default:
        return res.status(400).end;
    }
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
