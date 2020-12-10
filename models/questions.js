const db = require('../db');

module.exports = {
  get: ({product_id, page = 1, count = 5}) => {
    return db.pool
    .connect()
    .then(client => {
      client
      .query(
        `SELECT
          q.question_id,
          q.question_body,
          q.question_date,
          q.asker_name,
          q.question_helpfulness,
  
          CASE 
            WHEN max(a.answer_id) IS NOT NULL THEN
            COALESCE(
              json_agg(
                json_build_object(
                  'id', a.answer_id, 
                  'body', a.body, 
                  'date', a.date,
                  'answerer_name', a.answerer_name,
                  'helpfulness', a.helpfulness,
                  'photos', 
                    COALESCE(
                      (
                        SELECT 
                          json_agg(p.url) 
                        FROM photos p 
                        WHERE p.answer_id = a.answer_id
                      ), 
                      json_build_array()
                    )
                )
              ) 
              FILTER 
                (WHERE a.reported = FALSE),
              json_build_array()
            )
            ELSE
              json_build_array()
          END 
            AS answers
  
          FROM 
            questions q
          LEFT JOIN 
              answers a 
            ON 
              q.question_id = a.question_id
          WHERE 
              q.product_id = ${product_id} 
            AND 
              NOT q.reported
          GROUP BY 
            q.question_id
          LIMIT 
            ${count}
          OFFSET
            ${(page - 1) * count}
      `)
      .then(data => {
        client.release();
        return data;
      })
    })
  },

  post: ({ body, name, email, product_id }, date) => {
    return db.pool.query(
      `INSERT 
        INTO questions 
          (
            product_id, 
            question_body, 
            question_date, 
            asker_name, 
            asker_email, 
            question_helpfulness, 
            reported
          ) 
        VALUES 
          (
            ${product_id}, 
            ${body}, 
            to_timestamp(${date}), 
            ${name}, 
            ${email}, 
            0, 
            FALSE
          )`
    );
  },

  helpfulness: ({ question_id }) => {
    return db.pool.query(
      `UPDATE
        questions
      SET
        question_helpfulness = question_helpfulness+1
      WHERE
      question_id = ${question_id}`
    );
  },

  report: ({ question_id }) => {
    return db.pool.query(
      `UPDATE
        questions
      SET
        reported = TRUE
      WHERE
      question_id = ${question_id}`
    );
  }
};