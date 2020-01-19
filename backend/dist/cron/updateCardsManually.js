"use strict";

var _updateCards = _interopRequireDefault(require("./updateCards"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var update = function update() {
  return regeneratorRuntime.async(function update$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _updateCards.default)());

        case 2:
          process.exit(0);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

update();