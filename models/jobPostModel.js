const { Pool } = require('pg');
const config = require('config');

const pool = new Pool(config.get('database'));

// Función para guardar un puesto
async function saveJobPost(job) {
  const query = `
    INSERT INTO job_posts (job_title, company_name, location, remote, description, post_date) 
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
  const values = [job.title, job.company, job.location, job.remote, job.description, job.post_date];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error('Error al guardar el puesto:', error);
  }
}

// Evaluación de relevancia (IA básica simulada)
async function evaluateRelevanceInDB() {
  const query = `
    UPDATE job_posts 
    SET relevance_score = RANDOM(), updated_at = NOW()
    WHERE relevance_score IS NULL
  `;

  try {
    await pool.query(query);
  } catch (error) {
    console.error('Error al actualizar la relevancia:', error);
  }
}

// Eliminar puestos antiguos
async function deleteOldJobPostsInDB() {
  const query = `
    DELETE FROM job_posts 
    WHERE post_date < NOW() - INTERVAL '7 days'
  `;

  try {
    await pool.query(query);
  } catch (error) {
    console.error('Error al eliminar puestos antiguos:', error);
  }
}

module.exports = { saveJobPost, evaluateRelevanceInDB, deleteOldJobPostsInDB };
