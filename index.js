const { fetchJobPosts } = require('./controllers/jobController');
const { evaluateRelevance } = require('./controllers/iaController');
const { deleteOldJobPosts } = require('./controllers/cleanupController');

async function startJobFinder(req, res) {
  console.log('Iniciando descarga de puestos...');
  await fetchJobPosts(req, res);

  console.log('Evaluando relevancia...');
  await evaluateRelevance();

  console.log('Eliminando puestos antiguos...');
  await deleteOldJobPosts();

  res.send('Proceso completado.');
}

module.exports = { startJobFinder };
