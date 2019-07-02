import Project from 'models/Project';

export const onlyCreator = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const project = await Project.findById(id);
    if (`${project.creator}` !== `${req.user._id}`) {
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
