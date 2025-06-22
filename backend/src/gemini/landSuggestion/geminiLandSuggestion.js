import makeGeminiRequest from '../gemini';
import getGeminiLandSuggestionPrompt from './getGeminiLandSuggestionPrompt';

const geminiLandSuggestion = async ({
  numberOfLands,
  minNumberOfBasics,
  colorIdentity,
  manaSymbolCount,
  landList,
}) => {
  const prompt = getGeminiLandSuggestionPrompt(
    numberOfLands,
    minNumberOfBasics,
    colorIdentity,
    manaSymbolCount,
    landList
  );
  const response = await makeGeminiRequest([{ text: prompt }]);
  return response;
};

export default geminiLandSuggestion;
