import React from "react";
import "./Passwords.style.scss";

import GeneratePin from "../../../components/GeneratePin/GeneratePin.component";

import { AiOutlinePlus } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPasswords } from "../../../redux/reducers/auth.reducer";

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
              <h1 className='title'>{password.title}</h1>
              <p className='username'>{password.username}</p>
              {password?.coverImage && (
                <img
                  className='cover-image'
                  src={password.coverImage}
                  alt={password.title}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Password;
