# Current feature

* select all lands -> click "organize" -> all lands are neatly organized

# Bugs


# MVP

* disable snapping when holding shift

* show last games in lobby

* rotate counters on flipped board?

* defeated player / ff
  * remove all cards from all other players' zones
  * move commander to command zone
  * grey out commandzone, name
  * write "Defeated" instead of life total

* logs for new actions?
  * create tokens
  * add counters
  * copy card
  * flip card
  * turn card face down/up


* allow dragging card group into graveyard, exile (hand?)

* icons for card actions:
  * tap (tap)
  * flip (dfc-front, dfc-back)
  * turn face-down (dfc-facedown)

* flip coin, roll dice
  * chat commands? /coin, /dice 3d6


* card selection: 
  * display how many cards are selected
  * allow aligning selected cards, use top-left card for alignment

* when searching lib, add quick filter for lands with basic land types


# Easter Eggs

# Backog

* inconsistent capitalization in context menus

* move exile over / under graveyard (each at 50% height) so there is more space for the hand


* allow joining lobby via url (e.g. http://localhost:1235/#4fqufdulls6ckz15)

* allow copying selection?

* when dragging card over hand, it should have the hand card size

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




* stack ?
  * movable popup?
  * only visible when it contains cards or when dragging

* allow setting stop point in phase in opponent's turn
* when playing alone, display partner commanders next to each other
* store currentGames (in redis?)


* display confirm when user closes tab
* add route /playtest/:deckId
  * no stored game state in backend
  * reloading resets the game (destroy game state on socket disconnect)

* display which players are connected
  * display connect / disconnect messages
  * show message when you are disconnected
  * auto-reconnect

* prevent interacting with own lib when someone is peeking it (self or opponent)

* keep cards visually tapped when moving them to battlefield
  * allow aligning as if the cards was untapped

* shuffle library animation

* add option to play with planechase

* allow rotating cards by 90, 180deg. Auto rotate battles

* document all shortcuts

* allow peeking at face-down cards

* add sounds
  * when you become the active player
  * drawing
  * on chat message
  * when a card is moved, flipped, tapped, untapped, turned face down/up ?

* improve deck selection
  * overlay with all decks, categorized by status & public

# Optimizations

* prevent re-render of interface components when menu changes, e.g. when changing life
* use transform to set card position on battlefield
* when moving multiple cards, only send one request and update (e.g. move all cards from graveyard to exile)

# Backlog Bugs

* sometimes tokens are suggested twice
* when opening the card context menu on hand, sometines the next card is hovered due to the mouse moving
* cards from other players have wrong sleeve color in hand
* when moving a peeking card into hand, the draw animation is used
* on page load, cards in exile are animated
* milling action animation is wrong on flipped board
* align indicator when aligning both x and y not in center of card when it's left and/or top aligned
* after moving all cards from graveyard -> library, whenever you draw a card after that, an animation is played fom graveyard to library
