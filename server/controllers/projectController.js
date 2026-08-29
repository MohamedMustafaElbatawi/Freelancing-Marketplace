const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
// Create Project
// const createProject = async (req, res) => {
//   try {
//     // User currently logged in
//     const userId = req.user.id;
//     // Project data
//     const { title, description, technologies, liveUrl, githubUrl } = req.body;
//     // Validation
//     if (!title || !description) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and description are required",
//       });
//     }
//     // Create project
//     const project = await Project.create({
//       freelancer: userId,
//       title,
//       description,
//       technologies,
//       liveUrl,
//       githubUrl,
//       image: req.file ? req.file.path : "",
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Project created successfully",
//       project,
//     });
//   } catch (error) {
//     console.error("Create project error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

const createProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description, technologies, liveUrl, githubUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    let imageUrl = "";

    // Upload project image to Cloudinary
    if (req.file) {
      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "freelancing-marketplace/projects",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );

          stream.end(req.file.buffer);
        });

      const result = await uploadToCloudinary();

      imageUrl = result.secure_url;
    }

    const project = await Project.create({
      freelancer: userId,
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      image: imageUrl,
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
        success: false,
        message: "Project not found",
      });
    }

    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.technologies = technologies ?? project.technologies;
    project.liveUrl = liveUrl ?? project.liveUrl;
    project.githubUrl = githubUrl ?? project.githubUrl;

    // Upload new project image to Cloudinary
    if (req.file) {
      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "freelancing-marketplace/projects",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );

          stream.end(req.file.buffer);
        });

      const result = await uploadToCloudinary();

      project.image = result.secure_url;
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
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
