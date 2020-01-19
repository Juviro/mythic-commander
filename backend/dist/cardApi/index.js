"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getCardsByName", {
  enumerable: true,
  get: function get() {
    return _internal.getCardsByName;
  }
});
Object.defineProperty(exports, "populateCards", {
  enumerable: true,
  get: function get() {
    return _internal.populateCards;
  }
});
Object.defineProperty(exports, "getCardsById", {
  enumerable: true,
  get: function get() {
    return _internal.getCardsById;
  }
});
Object.defineProperty(exports, "getCardsByNameScryfall", {
  enumerable: true,
  get: function get() {
    return _scryfallApi.getCardsByName;
  }
});

var _internal = require("./internal");

var _scryfallApi = require("./scryfallApi");