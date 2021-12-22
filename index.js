

const csvtojson = require('csvtojson');
const prompt = require('prompt');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const file = './data/data.csv';



const inital = async () => {
  const data = await csvtojson().fromFile(file)
  data.map((item, index) => {
    console.log(`${index+1}.${item.name}`)
  })

  prompt.start();
  console.log('你是誰呀？(輸入號碼)');
  let {userIndex} = await prompt.get(['userIndex']);
  userIndex = userIndex - 1;
  let pickNumber = Math.floor(Math.random() * data.length);
  while (userIndex == pickNumber || data[pickNumber]['isDrawn'] == 'true') {
      pickNumber = Math.floor(Math.random() * data.length);
      
  }
  const remainPeople = data.filter(item => {
    return item.giftReceiver == '' 
  });

  const lastPerson = remainPeople.filter((item) => {return item.isDrawn == 'false' && item.hasDrawn == 'false' });
  if(remainPeople.length == 2 && lastPerson.length == 1){
    pickNumber = data.indexOf(lastPerson[0]);
  }
  data[userIndex]['hasDrawn'] = true;
  data[userIndex]['giftReceiver'] = data[pickNumber]['name']; 
  data[pickNumber]['isDrawn'] = true;


  console.log(`你抽到了${data[pickNumber]['name']}`);

  const csvWriter = createCsvWriter({
    path: './data/data.csv',
    header: [
      {id: 'name', title: 'name'},
      {id: 'isDrawn', title: 'isDrawn'},
      {id: 'hasDrawn', title: 'hasDrawn'},
      {id: 'giftReceiver', title: 'giftReceiver'}
    ]
  });
  csvWriter
    .writeRecords(data)
    .then(()=> console.log('複寫完成～886'));

}

inital();

