var express = require('express');
var router = express.Router();
const _ = require('lodash');
const request = require('superagent');
const httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

/* GET users listing. */
let ping = ()=>{

}

let doSwitch = async (strategy)=>{
  let canary  = _.get(strategy, "canary");
  _.set(strategy, "api", canary);
  ping();
}
let strategy = {
  canary : "http://127.0.0.1:7777/api",
  api :  "http://127.0.0.1:8888/api",
  percentage : []
}
const percentage = 50 ;
const arraySort = require('array-sort');
debugger;
let scheduler = Array(100);
let fill = (strategy)=>{


}
_.fill(scheduler, 1, 0, percentage);
_.fill(scheduler, 2, percentage, 100);
let mix = (data)=>{
  let array  = new Array(100);

  for(i=0; i < 100; i++){
    d = _.random(100)
    let type;
    if (data[i] == 1)
     type = "canary"
    else type = "api"
    let obj = {}
    _.set(obj, "type" , type);
    _.set(obj, "sort" , d);
    array[i] = obj;

    }

    arraySort(array, "sort")
    return _.map(array, (d)=>d.type)
    //console.log(d);
  //

}

let array = mix(scheduler);

console.log(JSON.stringify(array));

//console.log(JSON.stringify(scheduler));

router.post('/canary/:ip', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/canary/switch', function(req, res, next) {
  doSwitch(strategy);
  res.send('respond with a resource');
});

router.post('/canary/:percentage', function(req, res, next) {
  res.send('respond with a resource');
});
let routeIndex = 0;
router.get('/doSomething', (req, res)=>{

  let target = _.get(strategy, array[routeIndex]);
  console.log(`making call to ${target}`);
  proxy.web(req, res, {
    target
  });
  routeIndex++;
  routeIndex= routeIndex %100;

})

module.exports = router;
