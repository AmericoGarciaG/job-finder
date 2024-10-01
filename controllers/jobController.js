const { fetchJobPostsFromLinkedIn } = require('../services/linkedinAPI');
const { saveJobPost } = require('../models/jobPostModel');

async function fetchJobPosts(req, res) {
  const accessToken = req.session.accessToken;

  if (!accessToken) {
    return res.status(401).send('No autenticado con LinkedIn.');
  }

  try {
    const jobPosts = await fetchJobPostsFromLinkedIn(accessToken, req.query);

    for (const job of jobPosts) {
      await saveJobPost({
        title: job.title,
        company: job.companyName,
        location: job.location,
        remote: job.remote || false,
        description: job.description,
        post_date: new Date(job.postDate),
      });
    }

    res.send('Puestos descargados y guardados en la base de datos.');
  } catch (error) {
    res.status(500).send('Error al descargar los puestos');
  }
}

module.exports = { fetchJobPosts };
