#!/usr/bin/env node

import { chromium } from "@rookie-rs/api";

const cookies = chromium(["steamcommunity.com"]);

function findElement(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return arr[i];
  // will return undefined if not found; you could return a default instead
}

var x = findElement(cookies, "name", "steamLoginSecure");
console.log(x["value"]);

