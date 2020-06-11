const express = require('express')
const router = express.Router()

module.exports = router

router.get('/', async (req, res) => {
    try {
      let rows = await req.db('mm_director')
      
      res.send({
        ok: true,
        director: rows,
      })
    } catch (e) {
      res.send({ ok: false, error: e.message })
    }
  })

  router.get('/director/:id', async (req, res) => {
    let db = req.db
    let rows = await db('mm_movies as m')
        .join('mm_movies_director as m_d','m.movie_id','m_d.movie_id')
        .join('mm_director as d','d.director_id','m_d.director_id')
        .where('m.movie_id', '=', req.params.id)
    res.send({
      ok: true,
      movie_director: rows,
    })
  })