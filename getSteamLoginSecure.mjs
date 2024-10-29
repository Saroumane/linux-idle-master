#!/usr/bin/env node
import { chromium } from "@rookie-rs/api";
import { exec } from "child_process";

const myurl = `https://steamcommunity.com/}`;
// script can freeze if chromium is not already started !
exec(`chromium ${myurl} --force-reload-bypass-cache`)
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
