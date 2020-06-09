const express = require('express')
const router = express.Router()

module.exports = router

router.get('/', async (req, res) => {
    try {
      let rows = await req.db('mm_actor')
      
      res.send({
        ok: true,
        actor: rows,
      })
    } catch (e) {
      res.send({ ok: false, error: e.message })
    }
  })

  router.get('/actorId/:id', async (req, res) => {
    let db = req.db
    let rows = await db('mm_movies as m')
        .join('mm_movies_actor as m_a','m.movie_id','m_a.movie_id')
        .join('mm_actor as a','a.actor_id','m_a.actor_id')
        .where('m.movieId', '=', req.params.id)
    res.send({
      ok: true,
      actor: rows,
    })
  })