# Bugs

# Current feature

- reduce ANIMATION_THRESHOLD again, prevent animating when removing selection on tapped cards


- card actions
  - flip
  - counter
    - +1/+1
    - -1/-1
    - loyalty / chapter(?) (maybe automatically)
    - ??? maybe retrieve from database (search for "XXX counter")

# MVP


- battlefield
  - emblems
  - tap (single & selection)
  - context menu
    - move to different zone
    - create token

- library:
  - mill X

- hand
  - discard random card
  - play card face-down (e.g. fortell, morph)

- shortcuts for every action

- game
  - mulligan

* dragging a card briefly shows the card in the original position (prod only because of latency)

# Backlog


* save gamestate whenever a player leaves


- defeated player / ff

- adjust colors to work on every background
  - black and red are too dark

- track commander damage

- message in the center of the screen for
  - active player changes
  - animated (grow)

- flip coin, roll dice

- long clicking life buttons adds in 10s

- stack ?
  - movable popup?
  - only visible when it contains cards or when dragging

- allow setting stop point in phase in opponent's turn
- display number of cards in hand, lib, graveyard, exile
- when playing alone, display partner commanders next to each other
- store currentGames (in redis?)

- show last games in lobby
- display confirm when user closes tab
- add route /playtest/:deckId
  - no stored game state in backend
  - reloading resets the game (destroy game state on socket disconnect)

* display which players are connected
  * display connect / disconnect messages

- prevent interacting with own lib when someone is peeking it (self or opponent)

# Optimizations

* prevent re-render of interface components when menu changes, e.g. when changing life
* use transform to set card position on battlefield

# Backlog Bugs

- cards from other players have wrong sleeve color in hand
- when moving a peeking card into hand, the draw animation is used
- on page load, cards in exile are animated
- milling action animation is wrong on flipped board

