const REPEAT_ENUM = Object.freeze({
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  EVERY_WEEKDAYS: 'Every Weekdays',
  MONTHLY: 'Monthly',
  EVERY_SELECTED_DAY: 'Every selected day',
  NONE: 'None',
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

const SORT_OPTIONS_ENUM = Object.freeze({
  byLvl: 'level',
  byDueDate: 'due date',
  byCreatedAt: 'created',
  byClearRAte: 'clear rate',
  ascending: true,
  descending: false,
});

const TASK_FILTER_ENUM = Object.freeze({
  FALSE: 0,
  TRUE: 1,
  ALL: 2,
});

module.exports = {
  REPEAT_ENUM,
  WEEKDAYS_ENUM,
  SORT_OPTIONS_ENUM,
  TASK_FILTER_ENUM,
};
