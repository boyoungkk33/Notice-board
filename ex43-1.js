const schedule =require('node-schedule');

const date= new Date(2023,6,11,19,27,0);

console.log(date);

const j = schedule.scheduleJob(date, () =>{
    console.log('no pain, no gain');
});

const rule=new schedule.RecurrenceRule();
rule.second =1;

const k =schedule.scheduleJob(rule, ()=>{
     console.log('Laziness is nothing more than the habit of reting before you get tired');
})