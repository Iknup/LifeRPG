const requiredExpPerLevel = [
  0, 2, 6, 10, 14, 20, 26, 32, 40, 48, 56, 66, 76, 86, 98, 110, 122, 136, 150,
  164, 182, 200, 218, 238, 258, 278, 300, 322, 344, 368, 392, 416, 442, 468,
  494,
];

// get exp for next level
const getRequiredExpForLevel = level => {
  return requiredExpPerLevel[level] || 0;
};

// get exp for level on below
const getPrevLevelExp = level => {
  return requiredExpPerLevel[level - 1] || 0;
};

module.exports = { getRequiredExpForLevel, getPrevLevelExp };
