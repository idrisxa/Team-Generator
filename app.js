const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


var employees = [];
var cards = "";

function run(){
inquirer
        .prompt([
                {
                    type: "input",
                    message: "Please enter name",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Please enter ID",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Please enter email",
                    name: "email"
                },
                {
                    type: "list",
                    message: "Please select role",
                    name: "role",
                    choices:[
                        "Manager",
                        "Engineer",
                        "Intern"
                    ]
                },
                {
                    when: input => {
                        return input.role == "Manager"
                        
                    },
                    type: "input",
                    name: "officeNumber",
                    message: "Please enter Managers office number"
                    
                },
                {
                    when: input => {
                        return input.role == "Engineer"
                    },
                    type: "input",
                    name: "gitHub",
                    message: "Please enter Engineers GitHub username"
                    
                },
                {
                    when: input => {
                        return input.role == "Intern"
                    },
                    type: "input",
                    name: "school",
                    message: "Please enter Interns school"
                    
                },

            ]).then((response)=>{
                
                
                if (response.role == "Manager"){
                let teamManager = new Manager(response.name, response.id, response.email, response.officeNumber);
                employees.push(response);
                console.log(employees);
                }
                else if (response.role == "Engineer"){
                    let teamEngineer = new Engineer(response.name, response.id, response.email, response.gitHub);
                    employees.push(response);
                    console.log(employees);
                }
                else{
                    let teamIntern = new Intern(response.name, response.id, response.email, response.school);
                    employees.push(response);
                    console.log(employees);
                }

                inquirer
                .prompt([
                {
                    type: "list",
                    message: "Do you want to add another employee to the team",
                    name: "another",
                    choices:[
                        "Yes",
                        "No"
                    ]
                },
            ]).then((response)=>{
                if (response.another == "Yes"){
                    run();
                }
                else{
                    buildCards();
                    fs.writeFile("./output/Team.html",generateHTML(employees), function(err, result){
                        if(err){
                            console.log('error',err)
                        };
                    })
                }
            }
            )
                
            })
        }

        function buildCards(){
            for(var i = 0; i<=employees.length -1; i++){
                cards += ` <div class="card " style="width: 18rem;">
                            <h5 class="card-header text-white bg-primary mb-3">${employees[i].name}
                            <p class = "py-1 my-2">${employees[i].role}</p>
                            </h5>
                            <div class="card-body mt-n3">
                                <ul class="list-group list-group-flush bg-dark">
                                    <li class="list-group-item">ID: ${employees[i].id}</li>
                                    <li class="list-group-item">Email: ${employees[i].email}</li>
                                    <li class="list-group-item">${Object.keys(employees[i])[4]}: ${employees[i][Object.keys(employees[i])[4]]}</li>
                                </ul>
                            </div>
                        </div>`
            }

        }

        function generateHTML(){

            return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    <script
                    src="https://code.jquery.com/jquery-3.4.1.min.js"
                    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                    crossorigin="anonymous"></script>
                </head>
                <body>
                    <div class = "jumbotron">
                        <h1 class="display-4 text-center">My Team</h1>
                    </div>
                    <div class = "container d-flex justify-content-around" id = "mainContainer">
                        ${cards}
                    </div>
                </body>
            </html>`

        }


        

        

        run();

