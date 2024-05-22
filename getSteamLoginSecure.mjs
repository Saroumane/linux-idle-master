#!/usr/bin/env node
import { chromium } from "@rookie-rs/api";
import { exec } from "child_process";

// open in browser steamcommunity.com/xxxx where xxxx is random, so as to force a refresh of the page and cookie
const varRandom = Math.floor(Math.random()*10000);
const myurl = `https://steamcommunity.com/${varRandom}`;
exec(`xdg-open ${myurl}`)
//console.log(myurl);

// retrieve the cookie from the cookie file of chromium browser
const cookies = chromium(["steamcommunity.com"]);

// extract the steamLoginSecure value
function findElement(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return arr[i];
}
var x = findElement(cookies, "name", "steamLoginSecure");

// output the value
console.log(x["value"]);
