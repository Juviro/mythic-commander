# Current feature

* play card face-down (e.g. fortell, morph) -> type already defined: FaceDownCard
  * from hand
  * on battlefield
  * from anywhere in library
* allow putting card on battlefield face-up

# Bugs


# MVP


* logs for new actions?
  * create tokens
  * add counters
  * copy card


* shortcuts for every action
  * draw [d]
  * shuffle library [s]


* when aligning a card stacked with lower x/y, put it behind the other card


* icons for card actions:
  * tap (tap)
  * flip (dfc-front, dfc-back)
  * turn face-down (dfc-facedown)

* flip coin, roll dice
  * chat commands? /coin, /dice 3d6

* Allow selecting non-active decks as well
* display link in lobby to create a deck

* defeated player / ff
  * remove all cards from all other players' zones
  * move commander to command zone
  * grey out commandzone, name
  * write "Defeated" instead of life total

* card selection: display how many cards are selected


# Easter Eggs

# Backog

* add to battlefield actions: untap all [u]

* allow joining lobby via url (e.g. http://localhost:1235/#4fqufdulls6ckz15)

* allow copying selection?

* display warning for users with small screens

* special sleeve for commander, visible in lib as well?

* win animation when all opponents are defeated (maybe fireworks from todo app)

* allow dragging card selection into graveyard, exile, hand

* animate card when moved from any zone to battlefield (?)

* in card previed, show related cards as well

* dragging a card briefly shows the card in the original position (prod only because of latency)
  * add context that stores new card positions whenever they are dropped in BattlefieldDropzone.
  * check for that position in BattlefieldCard and overwrite original position
  * delete it from that context whenever the cardId is in an update


* put reminder token onto library (e.g. for Mana Crypt)

* add notes to card

* adjust colors to work on every background
  * black and red are too dark

* track commander + infect damage

* message in the center of the screen for
  * active player changes
  * animated (grow)

* long clicking life buttons adds in 10s

* select all lands -> click "organize" -> all lands are neatly organized

* when searching lib, add quick filter for lands with basic land types

* stack ?
  * movable popup?
  * only visible when it contains cards or when dragging

* allow setting stop point in phase in opponent's turn
* display number of cards in hand, lib, graveyard, exile
* when playing alone, display partner commanders next to each other
* store currentGames (in redis?)

* show last games in lobby
* display confirm when user closes tab
* add route /playtest/:deckId
  * no stored game state in backend
  * reloading resets the game (destroy game state on socket disconnect)

* display which players are connected
  * display connect / disconnect messages

* prevent interacting with own lib when someone is peeking it (self or opponent)

* keep cards visually tapped when moving them to battlefield
  * allow aligning as if the cards was untapped

* distinguish between flipped and face-down. There can be a two-faced card that is face-down and therefore not visible

* shuffle library animation

* add option to play with planechase

* allow rotating cards by 90, 180deg. Auto rotate battles

* document all shortcuts

# Optimizations

* prevent re-render of interface components when menu changes, e.g. when changing life
* use transform to set card position on battlefield
* when moving multiple cards, only send one request and update (e.g. move all cards from graveyard to exile)

# Backlog Bugs

* sometimes tokens are suggested twice
* when going back to gamebrowser, the url changes, making it impossible to use browser forward button to get back to game
* cards from other players have wrong sleeve color in hand
* when moving a peeking card into hand, the draw animation is used
* on page load, cards in exile are animated
* milling action animation is wrong on flipped board
* align indicator when aligning both x and y not in center of card when it's left and/or top aligned
* after moving all cards from graveyard -> library, whenever you draw a card after that, an animation is played fom graveyard to library
