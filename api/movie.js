const express = require('express')
const router = express.Router()

module.exports = router
//     http://localhost:7000/api/movie


// http://localhost:7000/api/movie // path การเข้าถึง api
router.get('/', async (req, res) => {  // ใช้ async function
  try {
    let db = req.db
    let rows = await db('mm_movies')

    let rateId = req.query.rateId
    let movieTitle = req.query.movieTitle
    //join actor ex 
    // let rows = await db('mm_movies as m')
    // .join('mm_movies_actor as m_a','m.movie_id','m_a.movie_id')
    // .join('mm_actor as a','a.actor_id','m_a.actor_id').where('m.movie_id','=','1')
    if(rateId && movieTitle){
      rows = await db('mm_movies as m').join('mm_rating as r','m.rate_id','r.rate_id').where('m.rate_id','=',rateId).where('m.movie_title','like',`%${movieTitle}%`)
    }else if(rateId) {
      rows = await db('mm_movies as m').join('mm_rating as r','m.rate_id','r.rate_id').where('m.rate_id','=',rateId)
    }else if(movieTitle) {
      rows = await db('mm_movies as m').join('mm_rating as r','m.rate_id','r.rate_id').where('m.movie_title','like',`%${movieTitle}%`)
    }else {
      rows = await db('mm_movies as m').join('mm_rating as r','m.rate_id','r.rate_id')
    }
    res.send({ 
      ok: true,       // ส่ง status 
      movie: rows,  // ส่งค่ากลับ
    })
  } catch (e) {
      res.send({ ok: false, error: e.message })
  }
})
// /api/movie/list
router.get('/list', async (req, res) => {
  try {
    let rows = await req.db.raw('SELECT * FROM mm_movies')
    
    res.send({
      ok: true,
      movie: rows,
    })
  } catch (e) {
    res.send({ ok: false, error: e.message })
  }
})

// /api/movie/new
router.post('/new', async (req, res) => {
  let db = req.db
  let ids = await db('mm_movies').insert({
    movieId: req.body.movieId,
    movieTitle: req.body.movieTitle,
    moviePlot: req.body.moviePlot,
    movieRuntime: req.body.movieRuntime,
    movieReleaseDate: req.body.movieReleaseDate,
    movieIncome: req.body.movieIncome,
    rateId: req.body.rateId
  })
  res.send({
    ok: true,
    ids: ids
  })
})

// /api/movie/save
router.post('/save', async (req, res) => {
  let db = req.db
  // UPDATE mm_movies SET fname=?, lname=? WHERE id = 1
  await db('mm_movies').where({movieId: req.body.movieId}).update({
    movieId:req.body.movieId,
    movieTitle: req.body.movieTitle,
    moviePlot: req.body.moviePlot,
    movieRuntime: req.body.movieRuntime,
    movieReleaseDate: req.body.movieReleaseDate,
    movieIncome: req.body.movieIncome,
    rateId: req.body.rateId
  })
  res.send({ok: true})
})

// /api/movieId/xxx
router.get('/movieId/:id', async (req, res) => {
  let db = req.db
  let rows = await db('mm_movies as m').join('mm_rating as r','m.rate_id','r.rate_id')
    .where('m.movieId', '=', req.params.id)
  res.send({
    ok: true,
    movie: rows[0] || {},
  })
})

// /api/movie/delete
router.post('/delete', async (req, res ) => {
  let db = req.db
  await db('mm_movies').where({movieId: req.body.movieId }).delete().then(() =>{
    res.send({status: true})
  }).catch(e => res.send({status: false, error: e.message}))
})

router.delete('/id/:movieId', function (req, res) {
  req.db('mm_movies').where({movieId: req.params.movieId}).delete().then(() =>{
    res.send({status: true})
  }).catch(e => res.send({status: false, error: e.message}))
})

// // /api/student/delete
// router.post('/delete', async (req, res ) => {
//   let db = req.db
//   await db('student').where({id: req.body.id }).delete().then(() =>{
//     res.send({status: true})
//   }).catch(e => res.send({status: false, error: e.message}))
// })



// router.post('/save2', (req, res) => {
//   let db = req.db  
//   db('t1').insert({}).then(ids => {
//     let id = ids[0]
//     Promise.all([
//       db('t2').insert({}).catch(),
//       db('t3').insert({}).catch(),
//     ]).then(() => {
//       res.send({status: true})
//     }).catch(err => {
//       res.send({status: false})
//     })    
//   })
//   console.log('ok')
// })
// router.get('/save3', async (req, res) => {
//   try {
//     let db = req.db  
//     let ids = await db('t1').insert({})
//     await Promise.all([
//       db('t2').insert({}),
//       db('t3').insert({})
//     ])
//     res.send({status: true})
//   } catch (e) {
//     res.send({status: false})
//   }
// })
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

