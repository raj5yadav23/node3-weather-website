const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geoCodeJs=require('./utils/geoCode.js')


//Define paths for the EXPRESS Config
const publicDirPath=path.join(__filename,'../../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
// this is specific syntax to tell express that we are using handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirPath))
/* app.get('/help',(req,res)=>{
    res.send('Help Page')
})

app.get('/about',(req,res)=>{
    res.send('<h1>About Page</h1>')
}) */

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name:'Raj'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Raj',
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name:'Raj',
        helpText:'This is some text message to help the user'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide the address in the request'
        })
    }

    geoCodeJs.geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        geoCodeJs.forecast(latitude,longitude,(error,forecast)=>{
            if(error){
                return res.send({
                    error:error
                })
            }

            res.send([{
                forecast: forecast,
                location: location,
                address: req.query.address
            }])
        
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Raj'
    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Raj'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})

