import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {  useState } from 'react';
import { getTimezoneOffset } from 'date-fns-tz';
import { editUser } from '@/slices/userSlice';

const SettingPage = () => {
  const user = useSelector(state => state.users.user);
  const [timezone, setTimezone] = useState('');
  const [resetSchedule, setResetSchedule] = useState(user.resetSchedule);
  const [showModal, setShowModal] = useState(false);
  const resetHour = user.resetSchedule.toString().padStart(2, '0') + ':00';
  const boxContainer =
    'w-[490px] bg-ColorOne h-[170px] rounded-md mb-10 p-5 flex flex-col ';
  const infoContainer = 'flex justify-between';
  const registerdDate = format(new Date(user.createdAt), 'yyyy/MM/dd');
  const dispatch = useDispatch();

  //Getting timezone on btn click
  const getTimezone = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(timezone);
  };

  //On save
  const onSaveHandler = () => {
    let updateData = {};
    if (timezone !== '' && timezone !== user.timezone.timezoneString) {
      const offset = getTimezoneOffset(timezone);
      updateData.timezone = { timezoneString: timezone, offset };
    }
    if (resetSchedule !== user.resetSchedule) {
      updateData.resetSchedule = resetSchedule;
    }
    dispatch(editUser({ data: updateData, userId: user._id }));
    setShowModal(prev => !prev);
  };

  // selecthours
  const selectHours = [];
  for (let i = 0; i < 24; i++) {
    selectHours.push(i.toString().padStart(2, '0') + ':00');
  }
  return (
    <div className="setting-container">
      <h1 className="mb-5 text-2xl">Personal Settings</h1>
      <div className={boxContainer + 'gap-6'}>
        <div className={infoContainer}>
          <p>Name</p> <p>{user.name}</p>
        </div>
        <div className={infoContainer}>
          <p>Register</p> <p>{registerdDate}</p>
        </div>
        <div className={infoContainer}>
          <p>Email</p> <p>{user.email}</p>
        </div>
      </div>
      <div className={boxContainer + 'gap-3'}>
        <h1>Your current Timezone</h1>
        <div>
          <div className="flex justify-start">
            <p>{user.timezone.timezoneString}</p>
            <p className="mx-10">to</p>
            <p>{timezone}</p>
          </div>
          <p className="text-[8px] text-colorMain">
            The application will automatically detect your timezone but if not
            click the button to detect your timezone.
          </p>
        </div>
        <div className="flex justify-end">
          <button onClick={getTimezone} className="bg-ColorFour p-1 rounded-lg">
            <p>Get Timezone</p>
          </button>
        </div>
      </div>
      <div className={boxContainer + 'gap-6'}>
        <h1>Your current Reset hour</h1>
        <div className="flex">
          <p className="bg-ColorFour py-1 px-2 rounded-lg">{resetHour}</p>
          <p className="mx-10">to</p>
          <select
            value={resetSchedule}
            onChange={e => {
              setResetSchedule(e.target.value);
            }}
            className="bg-ColorFour py-1 pl-1 pr-6 rounded-lg"
          >
            {selectHours.map(hour => {
              return (
                <option value={+hour[1]} key={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex justify-end relative">
        {showModal && (
          <p
            className="text-[12px] text-colorMain
          absolute -top-5"
          >
            Changes Saved!
          </p>
        )}
        <button
          onClick={onSaveHandler}
          className="bg-ColorOne py-1 px-2 rounded-md"
        >
          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
