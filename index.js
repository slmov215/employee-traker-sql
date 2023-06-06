const inquirer = require('inquirer');
const { table } = require('table');
const db = require('./db/connection')

const config = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
};

function showTable(data, callBack) {
  let tableData = [];
  tableData = [
    //column
    Object.keys(data[0]),
    //values
    ...data.map(val => Object.values(val))];

  // tableData = [Object.keys(data[0])];
  // for(var i = 0; i< data.length; i++){
  //   tableData.push(Object.values(data[i]));
  // }
  inquirer.prompt([
    {
      message: "\n" + table(tableData, config),
      type: 'input',
      name: 'name'
    }
  ])
    .then(() => {
      if (callBack) callBack();
    })
}

const dbData = [
  { id: 1, name: "Anthony" },
  { id: 2, name: "Myself" },
  { id: 3, name: "Turtle" },
];

showTable(dbData, () => {
  console.log("Do stuff after!");
});

Object.keys(test);
Object.keys(test[0]);
Object.entries(test);
for (var i = 0; i < test.lenght; i++) {
  console.log(Object.entries(test[i]));
}
out = [Object.keys(data[0]), ...data.map(val => Object.values(val))];
