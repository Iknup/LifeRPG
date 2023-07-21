import { WEEKDAYS_ENUM, REPEAT_ENUM } from '@/utility/ENUM';
import { getRequiredExpForLevel, getPrevLevelExp } from '@/utility/levelexp';
import { addDays, addMonths, setHours, setDate, getDate, set } from 'date-fns';

class TaskClass {
  rpgClearHandler(isComplete) {
    // undo the numbers if true
    isComplete
      ? (this.experience = this.experience - 2)
      : (this.experience += 2);
    isComplete ? this.timeCompleted-- : this.timeCompleted++;
    // Level check
    if (this.experience >= getRequiredExpForLevel(this.level)) {
      this.level++;
    } else if (this.experience < getPrevLevelExp(this.level)) {
      this.level--;
    }
  }

  // if(current >= curReset) 일때만 실행
  setResetHandler() {
    // ENUM을 만들어서 가져오기
    // If문 대신 switch로 변경
    const curReset = this.reset;
    const current = new Date();
    console.log('this', this);
    let nextReset;
    const repeat = this.repeat;
    const getDaysUntilReset = resetDay => {
      return (resetDay - current.getDay() + 7) % 7;
    };
    switch (repeat) {
      case REPEAT_ENUM.DAILY:
        nextReset = addDays(current, 1);
        break;
      // return (this.reset = setHours(nextReset, 2));
      case REPEAT_ENUM.EVERY_WEEKDAYS:
        if (
          current.getDay() === WEEKDAYS_ENUM.SUNDAY ||
          current.getDay() === WEEKDAYS_ENUM.SATURDAY
        ) {
          nextReset = addDays(current, getDaysUntilReset(WEEKDAYS_ENUM.MONDAY));

          // nextReset = getNextResetDate(WEEKDAYS_ENUM.MONDAY);
        } else {
          nextReset = addDays(current, 1);
        }
        // return (this.reset = setHours(nextReset, 2));
        break;
      case REPEAT_ENUM.MONTHLY:
        const { selectedDate } = this;
        const date = getDate(selectedDate);
        nextReset = setDate(addMonths(current, 1), date);

        // return (this.reset = setHours(nextReset, 2));
        break;
      case REPEAT_ENUM.EVERY_SELECTED_DAY:
        const day = current.getDay();
        // days = 0,1,2,3,4,5,6
        //selectedDays = [1,3,5] selectedDays in number by getDay()
        const { selectedDays } = this;
        console.log('selected', selectedDays);
        const nextResetDay = selectedDays.filter(
          selectedDay => selectedDay >= day
        );

        nextReset =
          nextResetDay.length > 0
            ? addDays(current, getDaysUntilReset(Math.min(...nextResetDay)))
            : addDays(current, getDaysUntilReset(Math.min(...selectedDays)));

        break;

      //set to delete
    }
    const updatedResetTime = setConfigHour(nextReset);
    return (this.reset = updatedResetTime);
  }

  static sortByOption(selectOption, updownOption) {}
}

const setResetDate = (today, resetMonth = 0, resetDay = 1, resetHour = 2) => {
  return new Date(
    today.getFullYear(),
    today.getMonth() + resetMonth,
    today.getDate() + resetDay,
    resetHour,
    0,
    0
  );
};

const setConfigHour = date => {
  return set(date, { hours: 2, minutes: 0, seconds: 0 });
};

// const getNextResetDate = (resetDay, resetHour = 2) => {
//   const now = new Date();
//   const day = now.getDay();
//   const daysUntilReset = (resetDay - day + 7) % 7;
//   const nextReset = setResetDate(now, 0, daysUntilReset + 1, resetHour);
//   return nextReset;
// };

// const getNextMonthResetDate = (resetDate, resetHour = 2) => {
//   const now = new Date();
//   const date = now.getDate();
//   let nextReset;
//   if (resetDate >= date) {
//     nextReset = new Date(now.getFullYear, now.getMonth, resetDate, resetHour);
//   } else {
//     nextReset = new Date(
//       now.getFullYear,
//       now.getMonth + 1,
//       resetDate,
//       resetHour
//     );
//   }
//   return nextReset;
// };

module.exports = { TaskClass, setResetDate };
