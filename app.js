import express from 'express'

const app = express()

const trees = [
    {name: "Feketefenyő", category: "tűlevelű", price: 24900, isEvergreen: true},
    {name: "Cédrus", category: "díszfa", price: 39900, isEvergreen: true},
    {name: "Diófa", category: "gyümölcsfa", price: 34900, isEvergreen: false}
]

app.use(express.json())

app.get('/trees', (req, res) => {
    res.status(200).json(trees)
})

app.get('/trees/:id', (req, res) => {
    const id = req.params.body
    if (id < 0 || id > trees.length){
        res.status(404).json({message: 'Data not found'})
    }
    res.status(200).json(trees[id])
})

app.post('/trees', (req, res) => {
    const {name, category, price, isEvergreen} = req.body
    if (!name || !category || !price || isEvergreen == null){
        res.status(400).json({message: 'Missing data'})
    }
    const newTrees = {name, category, price, isEvergreen}
    trees.push(newTrees)
    res.status(201).json(newTrees)
})

app.put('/trees/:id', (req, res) => {
    const id = req.params.body
    if (id < 0 || id > trees.length){
        res.status(404).json({message: 'Data not found'})
    }
    const {name, category, price, isEvergreen} = req.body
    if (!name || !category || !price || isEvergreen == null){
        res.status(400).json({message: 'Missing data'})
    }
    trees[id] = {name, category, price, isEvergreen}
    res.status(201).json(trees[id])
})

app.delete('/trees/:id', (req, res) => {
    const id = req.params.body
    if (id < 0 || id > trees.length){
        res.status(404).json({message: 'Data not found'})
    }
    trees.splice(id, 1)
    res.status(201).json({message: 'Delete successful'})
})

app.listen(3010, () =>{
    console.log("Server runs on port 3010")
})