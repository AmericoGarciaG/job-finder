const { evaluateRelevanceInDB } = require('../models/jobPostModel');

async function evaluateRelevance() {
  try {
    await evaluateRelevanceInDB();
    console.log('Relevancia evaluada con éxito.');
  } catch (error) {
    console.error('Error al evaluar relevancia:', error);
  }
}

module.exports = { evaluateRelevance };
