#!/usr/bin/env node
import { chromium } from "@rookie-rs/api";
import { exec } from "child_process";

// script can freeze if chromium is not already started !
const myurl = `https://steamcommunity.com/`;

// open steamcommunity.com, trigger a Hard Reload to refresh cookies, close window
// to install dotool : $ yay -Suy dotool
exec(`chromium --app=${myurl} && (echo key ctrl+shift+R | dotool) & sleep 3 && (echo key ctrl+W | dotool)`)

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

