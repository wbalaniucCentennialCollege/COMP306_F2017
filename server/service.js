'use strict'; // Using ES6 strict mode

const express = require('express'); // Imports 'express' package into a variable called "express"
const service = express(); // Top-level function. This creates an express application.  Instantiation

module.exports = service; // Exposes the functions stored in "service" when calling require(service) in another class