const request=require('request')
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmFqNXlhZGF2IiwiYSI6ImNrM3k5ZGg1NDBqOXEzZ3A2bHlqajc2emgifQ.oljmwhp604QRJRUTRZGUgg'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the services !!',undefined)
        }else if(response.body.features.length === 0){
            callback('No response data recieved',undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/df5e49431d5ac82f73ff5bdc0bb90ac4/'+latitude+','+longitude+' '
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to call the services',undefined)
        }else if(response.body.error){
            callback('Unable to fetch any data. Empty response returned',undefined)
        }else{
             placeValue=''
           if(response.body.daily.data[0].summary){
               placeValue=response.body.daily.data[0].summary
           }
            callback(undefined,placeValue + ' It is currently ' +response.body.currently.temperature+ ' degress out. There is a ' + response.body.currently.precipProbability+ '% chances of rain' )
        }
    })
}

module.exports={
    geoCode:geoCode,
    forecast:forecast
}