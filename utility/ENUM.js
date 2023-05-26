const REPEAT_ENUM = Object.freeze({
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  EVERY_WEEKDAYS: 'Every Weekdays',
  MONTHLY: 'Monthly',
  EVERY_SELECTED_DAY: 'Every selected day',
});
const WEEKDAYS_ENUM = Object.freeze({
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
});

module.exports = { REPEAT_ENUM, WEEKDAYS_ENUM };
