const express = require('express')
const router = express.Router()

module.exports = router

router.get('/', async (req, res) => {
    try {
      let rows = await req.db('mm_genres')
      
      res.send({
        ok: true,
        genres: rows,
      })
    } catch (e) {
      res.send({ ok: false, error: e.message })
    }
  })

  router.get('/mgenres/:id', async (req, res) => {
    let db = req.db
    let rows = await db('mm_movies as m')
        .join('mm_movies_genres as m_g','m.movie_id','m_g.movie_id')
        .join('mm_genres as g','g.genres_id','m_g.genres_id')
        .where('m.movie_id', '=', req.params.id)
    res.send({
      ok: true,
      movie_genre: rows,
    })
  })
