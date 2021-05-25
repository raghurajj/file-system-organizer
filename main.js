#!/usr/bin/env node;
let {help} = require("./commands/help")
let {tree} = require("./commands/tree")
let {organize} = require("./commands/organize")
let types = require("./utility")


let inputArr = process.argv.slice(2);
let command = inputArr[0]

switch(command){
    case "tree":
        tree(inputArr[1]);
        break;
    case "organize":
        organize(inputArr[1]);
        break;
    case "help":
        help();
        break;
    
    default:
        console.log("Command Not found. run \"help\" command to get a list of commands possible")
        break;
}