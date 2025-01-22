const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const movieModel = require('../model/movieData');

function movieroutes(nav)
{

//rendering first page
// get operation

router.get("/home",async (req, res) =>{
    try {
        const data = await movieModel.find();
        res.status(200).render('home',{nav,data});
    } catch (error) {
        res.status(404).send('Data not found');
    }
})

//rendering form page
router.get('/addmovies',(req,res) =>{
    res.status(200).render('addmovie',{nav});
    
})


//POST Operation
router.post('/addmovie',async (req, res) =>{
    try {
        var item = req.body;
        const data = new movieModel(item);
        await data.save();
        res.redirect('/movies/home');
    } catch (error) {
        res.status(404).send("Post unsuccessful");
    }
})

router.get('/updatepage/:id',async (req,res)=>{
    const data = await movieModel.findOne({"_id":req.params.id});
    res.render('updateform',{
        nav,
       data,
     movieid:req.params.id
     });
})

//UPDATE Operation
router.post('/editmovie/:id',async (req,res)=>{
    try {
        const data = await movieModel.findByIdAndUpdate(req.params.id,req.body);
        res.redirect('/movies/home');
    } catch (error) {
        res.status(404).send('Update unsuccessful');
    }
})

//Delete Operation
router.delete('/deletemovie/:id',async (req, res)=>{
    try {
        await movieModel.findByIdAndDelete(req.params.id);
        res.status(200).send('Delete successful');
    } catch (error) {
        res.status(404).send('Delete unsuccessful');
    }
})
return router;
}



module.exports = movieroutes;