/*弓种*/
var bows = {   
  checkedId: 1,
  item: [{
      id: 1,
      name: '复合'
    },
    {
      id: 2,
      name: '光弓'
    },
    {
      id: 3,
      name: '反曲'
    },
    {
      id: 4,
      name: '传统'
    },
    {
      id: 5,
      name: '美猎'
    }
  ]
}

var bowChecked = function (id) {  
  bows.checkedId = id
}

/*距离定义*/ 
var Meters = {    
  msChecked: 1,
  item: [{
      id: 1,
      name: "10米"
    },
    {
      id: 2,
      name: "20米"
    },
    {
      id: 3,
      name: "30米"
    },
    {
      id: 4,
      name: "40米"
    },
    {
      id: 5,
      name: "50米"
    }
  ]
}
var metersChecked = function (id) {
  Meters.msChecked = id
}
/*组数箭数*/
var groups = {
  groupChecked: 1,
  item: [{
    id:1,
    column: 3,
    row: 4
  }, {
    id:2,
    column: 6,
    row: 6
  },{
    id:3,
    column: 12,
    row: 12
  }]
 
}
var history={
  historyChecked:1,
  item:[]
}
var groupsChecked=function(id){
  groups.groupChecked=id
}
var groupsFunction = function(group){
  group.id = groups.item.length+1
  groups.item.push(group)
  // console.log(groups);
}
var historyFunction=function(item){
  history.item.push(item)
  
  console.log(history);
  
}

/*添加组数箭数 */
var arrows={
  column:[
    {
      values:[1,2,3,4,5,6,7,8,9,10,11,12],
      defaultIndex: 2
    },
    {
      values:[1,2,3,4,5,6,7,8,9,10,11,12],
      defaultIndex: 1
    }
  ]
}



module.exports = {
  bows: bows,
  bowChecked: bowChecked,
  Meters: Meters,
  metersChecked: metersChecked,
  groups: groups,
  groupsChecked:groupsChecked,
  groupsFunction:groupsFunction,
  arrows:arrows,
  historyFunction:historyFunction,
  history:history
}