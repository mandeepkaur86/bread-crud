const router = require('express').Router()
const Bread = require('../models/bread')

// GET all bread
router.get('/', async (req, res) => {
    const breads = await Bread.find()
    res.render('index', { breads })
})

// GET render new
router.get('/new', (req, res) => {
    res.render('new')
})


// GET bread by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const bread = await Bread.findById(id)
    res.render('show', {
        bread
    })
})

// GET edit page
router.get('/:index/edit', (req, res) => {
    const { id } = req.params
    res.render('edit', {
    bread
    })
})// POST create a new bread
router.post('/', async (req, res) => {
    
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true 
    } else {
        req.body.hasGluten = false
    }

    if (!req.body.image) req.body.image = undefined
    await Bread.create(req.body)
    res.status(303).redirect(`/breads`)
})

// DELETE delete bread by index
router.delete('/:id', async(req, res) => {
    const { id } = req.params
    await Bread.findByIdAndDelete(id)
    res.status(303).redirect('/breads')
})

// PUT
router.put('/:id',async (req, res) => {
    const { id } = req.params
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = true 
    } else {
        req.body.hasGluten = false
    }

    if (!req.body.image) req.body.image = 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'

    await Bread.findByIdAndUpdate(id,req.body)
    res.status(303).redirect(`/breads/${id}`)
})

module.exports = router