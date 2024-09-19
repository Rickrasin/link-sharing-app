// lib/parse.js
import Parse from "parse/node";

let isInitialized = false;

export function initParse() {
  if (!isInitialized) {
    Parse.initialize(process.env.APPLICATION_ID, process.env.JS_KEY);
    Parse.serverURL = process.env.PARSE_SERVER_URL;

    isInitialized = true;
  }
}

export default Parse;
