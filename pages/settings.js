import { useSelector } from 'react-redux';

const SettingPage = () => {
  const boxContainer = 'w-[490px] bg-ColorOne h-[170px] rounded-md mb-10';
  const user = useSelector(state => state.users.user);
  return (
    <div className="setting-container">
      <h1 className="mb-5 text-2xl">Personal Settings</h1>
      <div className={boxContainer}>
        <div>
          <p>Name</p> <p>{user.name}</p>
        </div>
        <div>
          <p>Register</p> <p>{user.createdAt}</p>
        </div>
        <div>
          <p>Email</p> <p>{user.email}</p>
        </div>
      </div>
      <div className={boxContainer}></div>
      <div className={boxContainer}></div>
      <div>
        <button>
          <p>Save</p>
        </button>
        <button>
          <p>Cancel</p>
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
