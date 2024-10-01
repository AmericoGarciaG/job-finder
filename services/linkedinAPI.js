// linkedinAPI.js
const axios = require('axios');
const logger = require('./logger'); // Importar logger

async function fetchJobPostsFromLinkedIn(accessToken, criteria) {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/jobPosts', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        country: criteria.country || 'US',
        remote: criteria.remote || true,
        date_posted: criteria.date_posted || 'past_24_hours',
      },
    });

    logger.debug(`Código de estado: ${response.status}`); // Log de info

    return response.data.elements;
  } catch (error) {
    console.error('Error al obtener puestos desde LinkedIn:', error);
    throw error;
  }
}

module.exports = { fetchJobPostsFromLinkedIn };
