const db = require('../db');

module.exports = {
  get: ({ question_id }, { page = 1, count = 5 }) => {

    return db.pool.query(
      `SELECT 
        answer_id,
        body,
        date,
        answerer_name,
        helpfulness,
        COALESCE((select json_agg(p.url) from photos p WHERE p.answer_id = a.answer_id), json_build_array()) AS photos
      FROM 
        answers a
      WHERE 
        a.question_id = ${question_id} 
      AND 
        NOT a.reported 
      LIMIT 
        ${count}
      OFFSET
        ${(page - 1) * count}
    `);
  },

  post: ({ question_id }, { body, name, email }, date) => {
    return db.pool.query(
      `INSERT 
        INTO answers
          (
            question_id, 
            body, 
            date, 
            answerer_name, 
            answerer_email, 
            helpfulness, 
            reported
          ) 
        VALUES 
          (
            ${question_id}, 
            ${body}, 
            to_timestamp(${date}), 
            ${name}, 
            ${email}, 
            0, 
            FALSE
          )
      RETURNING answer_id`
    );
  },

  helpfulness: ({ answer_id }) => {
    return db.pool.query(
      `UPDATE
        answers
      SET
        helpfulness = helpfulness+1
      WHERE
      answer_id = ${answer_id}`
    );
  },

  report: ({ answer_id }) => {
    return db.pool.query(
      `UPDATE
        answers
      SET
        reported = TRUE
      WHERE
      answer_id = ${answer_id}`
    );
  }
};