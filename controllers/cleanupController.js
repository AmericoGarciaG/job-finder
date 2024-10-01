const { deleteOldJobPostsInDB } = require('../models/jobPostModel');

async function deleteOldJobPosts() {
  try {
    await deleteOldJobPostsInDB();
    console.log('Puestos antiguos eliminados con éxito.');
  } catch (error) {
    console.error('Error al eliminar puestos antiguos:', error);
  }
}

module.exports = { deleteOldJobPosts };
