import React, { useState } from "react";
import "./Password.style.scss";

import GeneratePin from "../../../components/GeneratePin/GeneratePin.component";

import { AiOutlinePlus } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPasswords } from "../../../redux/reducers/auth.reducer";

// const Password = () => {
//   const [show, setShow] = useState("");
//   const [passwordDetails, setPasswordDetails] = useState("");
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();

//   const toggleDetails = (val, data) => {
//     setShow(data);
//     setPasswordDetails(val);
//   };
//   const [isOpenChangeModel, setIsOpenChangeModel] = useState(false);

//   const toggleChangeModel = () => {
//     setIsOpenChangeModel(!isOpenChangeModel);
//     setShow("");
//   };
//   const toggleLoading = (val) => setLoading(val);

//   const changePin = async (e) => {
//     e.preventDefault();
//     dispatch(changeCommonPin(toggleLoading, toggleChangeModel));
//   };

//   const showContent = () => {
//     if (show === "view") {
//       return (
//         <PasswordView
//           passwordDetails={passwordDetails}
//           toggleDetails={toggleDetails}
//         />
//       );
//     } else if (show === "add") {
//       return <PasswordAdd toggleDetails={toggleDetails} />;
//     }
//   };

//         <div className='password'>
//           <div className='password__left'>
//             <div className='password__leftTop'>
//               <Tooltip title='Add Password' arrow placement='top'>
//                 <i>
//                   <IoAddCircleOutline
//                     size='24'
//                     onClick={() => {
//                       setPasswordDetails("");
//                       setShow("add");
//                     }}
//                   />
//                 </i>
//               </Tooltip>
//               <Tooltip title='Change Pin' arrow placement='top'>
//                 <i>
//                   <MdSettingsBackupRestore
//                     onClick={toggleChangeModel}
//                     size='24'
//                   />
//                 </i>
//               </Tooltip>
//             </div>
//             <div className='password__leftBottom'>
//               {passwords.entries?.map((password) => (
//                 <div
//                   className='password__leftBottomPasswordList'
//                   key={password._id}
//                   onClick={() => {
//                     setPasswordDetails(password);
//                     setShow("view");
//                   }}
//                 >
//                   <img
//                     className='password__leftBottomPasswordLogo'
//                     src={password.avatar}
//                     alt='logo'
//                   />
//                   <div className='password__leftBottomPasswordDetails'>
//                     <span className='title'>{password.title}</span>
//                     <span className='link'>{password?.link}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className='password__right'>{showContent()}</div>
//           {isOpenChangeModel && (
//             <YesOrNoModel
//               yes={changePin}
//               no={toggleChangeModel}
//               loading={loading}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Password;

const Password = () => {
  const passwords = useSelector(selectPasswords);

  if (!passwords?.pin) return <GeneratePin />;

  return (
    <div className='passwords'>
      <div className='passwords__header'>
        <Link to='/passwords/add'>
          <p className='passwords__createButton'>
            <AiOutlinePlus /> <span>Add Password</span>
          </p>
        </Link>
        <div>
          <select className='passwords__sort'>
            <option>Sort By : A to Z</option>
            <option>Sort By : Z to A</option>
            <option>Sort By : Date</option>
          </select>
        </div>
      </div>
      <div className='passwords__body'>
        <div className='passwords__lists'>
          {passwords.entries?.map((password) => (
            <Link
              to={`/passwords/view/${password._id}`}
              key={password._id}
              className='passwords__details'
            >
              <h1>{password.title}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Password;
