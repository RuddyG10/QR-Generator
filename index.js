//packages
import inquirer from "inquirer";
import qr from "qr-image";
import {createWriteStream, writeFile,WriteStream} from 'node:fs';
import path, { join } from 'node:path';
//The question inside the prompt
const question = [
    {
        type: 'input',
        name: 'givenLink',
        message: 'Insert te link that you want to put in the QR Code: '
    },
];
//Inquirer to get what the user wants to put into the qr code
inquirer
    .prompt(
        question
    )
    .then(answers=>{
        //answers is the user link
        //convert th answer into a qr image
        console.log(answers.givenLink);
        var qrImage = qr.image(answers.givenLink);
        
        //conplete path of the image
        var completePath = join('./QRs',answers.givenLink.toLowerCase()+'_qr.png');

        //save the image
        qrImage.pipe(createWriteStream(completePath));

        //save the answer of th e user into a file
        writeFile("user_answers.txt",answers.givenLink,'utf-8',(err)=>{
            if (err) throw err;
            console.log("The answer and the qr image has been saved successfully. Now check the QRs folder.");
        });

    })
    .catch((error)=>{
        if(error.isTtyError){
            console.log("Promp couldn't be rendered. "+ error);
        }
        else{
            console.log("Something went wrong. "+error);
        }
    });