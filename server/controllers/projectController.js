const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
  try {
    // User currently logged in
    const userId = req.user.id;
    // Project data
    const { title, description, technologies, liveUrl, githubUrl } = req.body;
    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }
    // Create project
    const project = await Project.create({
      freelancer: userId,
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      image: req.file ? req.file.path : "",
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await Project.find({ freelancer: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, liveUrl, githubUrl } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      freelancer: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.technologies = technologies ?? project.technologies;
    project.liveUrl = liveUrl ?? project.liveUrl;
    project.githubUrl = githubUrl ?? project.githubUrl;

    if (req.file) {
      project.image = req.file.path;
    }

    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      freelancer: req.user.id,
      _id: req.params.id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // await project.remove();
    await Project.findByIdAndDelete(project._id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProject,
  updateProject,
  deleteProject,
};
