#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.greenBright.bold.underline(`\t\n ********welcome to iqramalik student managment`));

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance = 0;

let answer = await inquirer.prompt([
    {
        name:"student",
        type:"input",
        message: chalk.magentaBright("enter your name:"),
        validate: function (value){
            if(value.trim() !==""){
                return true;
            }
            return chalk.redBright("please enter a non-empty value.");

        },
    },
    
    {
         name: "courses",
         type: "list",
         message:chalk.yellowBright.italic("select the course to enroll in:"),
         choices: ["html", "css","javascript","typescript","python"],

    },
]);

const tutionFees: {[key: string]: number } = {
      "HTML": 3000,
      "CSS": 5000,
       "JAVASCRIPT": 7000,
       "typescript":9000,
       "PYTHON": 8000,
};

console.log(chalk.cyanBright.bold(`\nTution fee for ${answer.courses}:
    ${tutionFees[answer.courses]}/-`));
console.log(chalk.redBright(`your current balance: ${myBalance}`));

let paymentType = await inquirer.prompt([
    {
       
       name: "payment",
       type: "list",
       message:chalk.yellowBright("select a payment methode:"),
       choices: ["Bank Transfer", "EasyPaisa", "jazz cash"],
    },

    {
        name: "amount",
        type: "input",
        message: chalk.redBright("enter the amount to pay:"),
        validate: function (value) {
            if (parseFloat(value) >  0) {
                return true;
            
            }
            return chalk.yellowBright("please enter a positive value.");   
        },
    },
]);

console.log(chalk.magentaBright(`\nyou selected the payment method:${paymentType.payment}\n`));

const courseTutionfees = tutionFees[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (courseTutionfees === paymentAmount) {
    console.log(chalk.gray(`\ncongratulations! you have successfully enrolled in the ${answer.courses} course.\n`));

    let nextstep = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: chalk.redBright("what would you like to do next?"),
            choices: ["view status", "exit"],
        },
    ]);
    
    if (nextstep.select === "view status") {
        console.log(chalk.magentaBright.bold.underline(`\n****studentstatus****`));
        console.log(chalk.yellowBright(`student Name: ${answer.students}`));
        console.log(chalk.yellowBright(`student id : ${randomNumber}`));
        console.log(chalk.yellowBright(`enrolled courses: ${answer.courses}`));
        console.log(chalk.yellowBright(`paid tution fee: ${paymentAmount}`));
        console.log(chalk.yellowBright(`current balance: ${myBalance += paymentAmount}`));

    } else{

        console.log(chalk.blueBright(`\n****thank you for using our system!****\n`));
    
    }

    }  else {
     
        console.log(chalk.yellowBright(`\nyou have not paid the full tution fee for the ${answer.courses} courses.\n`));
        

    }