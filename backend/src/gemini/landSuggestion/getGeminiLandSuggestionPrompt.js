/**
 * Generates a detailed prompt for the Gemini AI to create a Magic: The Gathering Commander manabase.
 *
 * @param {number} numberOfLands - The total number of lands the final manabase should have.
 * @param {number} minNumberOfBasics - The minimum required amount of each basic land type.
 * @param {string[]} colorIdentity - An array of color identity strings (e.g., ["B", "G", "U"]).
 * @param {object} manaSymbolCount - An object mapping each color to its mana symbol count (e.g., {"B": 25, "G": 17, "U": 33}).
 * @param {object[]} landList - The comprehensive list of available lands, grouped by type.
 * @returns {string} A formatted string containing the full prompt for the Gemini API.
 */
const getGeminiLandSuggestionPrompt = (
  numberOfLands,
  minNumberOfBasics,
  colorIdentity,
  manaSymbolCount,
  landList
) => {
  // Using JSON.stringify with indentation for better readability in the prompt string.
  const prettyPrintJson = (obj) => JSON.stringify(obj, null, 2);

  return `
  You are an expert Magic: The Gathering deck-building assistant. Your primary function is to construct an optimized mana base for a Commander (EDH) deck using a predefined list of available lands and a set of specific rules.
  
  Your task is to select a precise number of lands from the provided list to create a well-balanced mana base that supports the deck's color requirements.
  
  **Your Goal:** Generate a JSON array of land objects, where the total number of lands equals the \`numberOfLands\` input.
  
  **INPUTS:**
  
  1.  **\`numberOfLands\`**: A number representing the total count of lands the final mana base should contain.
  2.  **\`minNumberOfBasics\`**: A number representing the minimum required amount of each basic land type corresponding to the deck's color identity.
  3.  **\`colorIdentity\`**: An array of strings representing the deck's colors. (e.g., \`["B", "G", "U"]\`)
  4.  **\`manaSymbolCount\`**: A JSON object detailing the number of mana symbols for each color in the non-land cards of the deck. This is critical for determining the color balance.
  5.  **\`landList\`**: A JSON array containing groups of available lands, their properties, and their selection status.
  
  **OUTPUT FORMAT:**
  
  You must return a single JSON array of objects. Each object represents a selected land card and must have the following structure:
  \`{ "id": <string>, "amount": <number> }\`
  
  * \`id\`: The unique identifier of the land card.
  * \`amount\`: The quantity of that specific land to include. This will be \`1\` for all non-basic lands.
  
  The sum of all \`amount\` values in the final array **must** equal the \`numberOfLands\` input.
  
  **PROCESSING INSTRUCTIONS:**
  
  Follow these steps meticulously to construct the manabase:
  
  **Step 1: Initial Calculation & Setup**
  1.  Initialize an empty list which will hold your final selection of lands.
  2.  Calculate the total number of colored mana symbols from the \`manaSymbolCount\` object.
  3.  For each color in your \`colorIdentity\`, calculate its proportion of the total mana symbols. This gives you a target percentage for how many of your mana sources should produce that color.
      * *Example:* If \`manaSymbolCount\` is \`{"B": 25, "G": 17, "U": 33"}\`, the total is 75. The target proportions are approximately Blue: 44%, Black: 33%, and Green: 23%.
  4.  Keep a running count of how many lands you have selected and how many sources you have for each color.
  
  **Step 2: Mandatory Selections**
  1.  Iterate through every land in the entire \`landList\`.
  2.  Immediately add any land that has the property \`"selected": true\` to your selection list. These are non-negotiable includes.
  3.  For each land added, decrement the total \`numberOfLands\` remaining to be selected.
  
  **Step 3: Prioritized Non-Basic Land Selection**
  1.  Create a flattened candidate pool of all available non-basic lands from the \`landList\` that meet the following criteria:
      * The land's \`mainColorProduction\` is a subset of the deck's \`colorIdentity\`.
      * The land has \`"owned": true\`.
      * The land has not already been selected in Step 2.
  2.  Sort this candidate pool according to the following strict priority:
      * **Priority 1:** Lands from groups with \`"isFavorite": true\` come before lands from groups with \`"isFavorite": false\`.
      * **Priority 2:** Within each favorite/non-favorite category, sort by \`"tier"\` in descending order (e.g., tier 4 is better than tier 3).
  3.  Iterate through your sorted candidate pool. For each land, add it to your selection if you still have land slots available.
  4.  Stop this process when either you run out of candidate lands or the number of remaining land slots equals the minimum number of basic lands required (\`minNumberOfBasics\` * number of colors).
  
  **Step 4: Fulfill Minimum Basic Land Requirement**
  1.  For each color in your \`colorIdentity\`, add the required \`minNumberOfBasics\` of the corresponding basic land (Swamp, Forest, Island, etc.) to your selection.
  2.  Update the count of remaining lands to be selected.
  
  **Step 5: Fill Remaining Slots with Basic Lands**
  1.  If you still have land slots left to fill to reach the target \`numberOfLands\`, add more basic lands one by one until the count is met.
  2.  Prioritize which basic land to add by identifying which color is furthest below its target proportion calculated in Step 1. Add a basic land of that color, update the source counts, and repeat the comparison for the next slot.
  
  **Step 6: Final Output Generation**
  1.  Consolidate your final selection list.
  2.  Group all identical basic lands together and sum their quantities into a single object.
  3.  Format the entire selection into the specified JSON array of \`{ "id": "...", "amount": ... }\` objects.
  4.  Ensure the total \`amount\` equals \`numberOfLands\`.
  
  Here is the data to process:
  
  **\`numberOfLands\`**:
  ${numberOfLands}
  
  **\`minNumberOfBasics\`**:
  ${minNumberOfBasics}
  
  **\`colorIdentity\`**:
  ${prettyPrintJson(colorIdentity)}
  
  **\`manaSymbolCount\`**:
  ${prettyPrintJson(manaSymbolCount)}
  
  **\`landList\`**:
  ${prettyPrintJson(landList)}
  `;
};

export default getGeminiLandSuggestionPrompt;
