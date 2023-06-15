import { WEEKDAYS_ENUM, REPEAT_ENUM } from '@/utility/ENUM';
import { getRequiredExpForLevel, getPrevLevelExp } from '@/utility/levelexp';

class TaskClass {
  rpgClearHandler(isComplete) {
    // console.log('this:', this);
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
    switch (repeat) {
      case REPEAT_ENUM.DAILY:
        nextReset = setResetDate(current, 0);
        return (this.reset = nextReset);
      case REPEAT_ENUM.WEEKLY:
        const selectedDay = curReset ? curReset.getDay() : this.selectedDays[0];
        nextReset = getNextResetDate(selectedDay);
        return (this.reset = nextReset);
      case REPEAT_ENUM.EVERY_WEEKDAYS:
        if (
          current.getDay() === WEEKDAYS_ENUM.SUNDAY ||
          current.getDay() === WEEKDAYS_ENUM.SATURDAY
        ) {
          nextReset = getNextResetDate(WEEKDAYS_ENUM.MONDAY);
        } else {
          nextReset = setResetDate(current, 0);
        }
        return (this.reset = nextReset);
      case REPEAT_ENUM.MONTHLY:
        const selectedDate = curReset.getDate();
        nextReset = getNextMonthResetDate(selectedDate);
        return (this.reset = nextReset);
      case REPEAT_ENUM.EVERY_SELECTED_DAY:
        const day = current.getDay();
        console.log('day', day);
        // days = 0,1,2,3,4,5,6
        //selectedDays = [1,3,5] selectedDays in number by getDay()
        const { selectedDays } = this;
        console.log('selected', selectedDays);
        const nextResetDay = selectedDays.filter(
          selectedDay => selectedDay >= day
        );

        nextReset =
          nextResetDay.length > 0
            ? getNextResetDate(Math.min(...nextResetDay))
            : getNextResetDate(Math.min(...selectedDays));

        // if (nextResetDay.length !== 0) {
        //   const min = Math.min(...nextResetDay);
        //   console.log('min', min);
        //   nextReset = getNextResetDate(min);
        // } else {
        //   const min = Math.min(...selectedDays);
        //   console.log('min', min);
        //   nextReset = getNextResetDate(min);
        // }
        return (this.reset = nextReset);
      default:
      //set to delete
    }
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

const getNextResetDate = (resetDay, resetHour = 2) => {
  const now = new Date();
  const day = now.getDay();
  const daysUntilReset = (resetDay - day + 7) % 7;
  const nextReset = setResetDate(now, 0, daysUntilReset + 1, resetHour);
  return nextReset;
};

const getNextMonthResetDate = (resetDate, resetHour = 2) => {
  const now = new Date();
  const date = now.getDate();
  let nextReset;
  if (resetDate >= date) {
    nextReset = new Date(now.getFullYear, now.getMonth, resetDate, resetHour);
  } else {
    nextReset = new Date(
      now.getFullYear,
      now.getMonth + 1,
      resetDate,
      resetHour
    );
  }
  return nextReset;
};

module.exports = { TaskClass, setResetDate };
