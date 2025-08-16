// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import assets from '../assets/assets';
// import { AuthContext } from '../../context/AuthContext';

// const ProfilePage = () => {
//   const { authUser, updateProfile } = useContext(AuthContext);

//   const [selectedImg, setSelectedImg] = useState(null);
//   const navigate= useNavigate();
//   const [name, setName] = useState(authUser.fullName);
//   const [bio, setBio] = useState(authUser.bio);

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedImg) {
//       await updateProfile({ fullName: name, bio })
//       navigate('/');
//       return;
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedImg);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       await updateProfile({
//         profilePic: base64Image,
//         fullName: name,
//         bio
//       });
//       navigate('/');
//     }
//   }

//   return (
//     <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
//       <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        
//         <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
//           <h3 className="text-lg">Profile details</h3>

//           <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
//             <input
//               onChange={(e) => setSelectedImg(e.target.files[0])}
//               type="file"
//               id="avatar"
//               accept='.png, .jpg, .jpeg'
//               hidden
//             />
//             <img src={selectedImg? URL.createObjectURL(selectedImg) : assets.avatar_icon}alt="" className={`w-12 h-12 ${selectedImg && `rounded-full`}`} />
//             upload profile image
//           </label>

//           <input
//             onChange={(e) => setName(e.target.value)} value={name} type = "text"required placeholder='Your name'
//             className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
//           />

//           <textarea
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             placeholder="Write profile bio"
//             required
//             className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
//             rows={4}
//           ></textarea>

//           <button
//             type="submit"
//             className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
//           >
//             Save
//           </button>
//         </form>

//         <img
//           className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10$ {selectedImg && 'rounded-full'}`}
//           src={
//              authUser?.profilePic ||assets.logo_icon
//           }
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


// // import React, { useContext, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import assets from "../assets/assets";
// // import { AuthContext } from "../../context/AuthContext";

// // const ProfilePage = () => {
// //   const { authUser, updateProfile } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const [selectedImg, setSelectedImg] = useState(null);
// //   const [name, setName] = useState(authUser?.fullName || "");
// //   const [bio, setBio] = useState(authUser?.bio || "");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     let body = { fullName: name, bio };
// //     if (selectedImg) {
// //       const reader = new FileReader();
// //       reader.readAsDataURL(selectedImg);
// //       reader.onload = async () => {
// //         body.profilePic = reader.result;
// //         await updateProfile(body);
// //         navigate("/");
// //       };
// //     } else {
// //       await updateProfile(body);
// //       navigate("/");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
// //       <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
// //         <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
// //           <h3 className="text-lg">Profile details</h3>

// //           <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
// //             <input
// //               type="file"
// //               id="avatar"
// //               accept=".png,.jpg,.jpeg"
// //               hidden
// //               onChange={(e) => setSelectedImg(e.target.files[0])}
// //             />
// //             <img
// //               src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon}
// //               alt="avatar"
// //               className="w-12 h-12 rounded-full"
// //             />
// //             Upload profile image
// //           </label>

// //           <input
// //             type="text"
// //             placeholder="Your name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //             className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
// //           />

// //           <textarea
// //             placeholder="Write profile bio"
// //             value={bio}
// //             onChange={(e) => setBio(e.target.value)}
// //             required
// //             rows={4}
// //             className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
// //           />

// //           <button className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer" type="submit">
// //             Save
// //           </button>
// //         </form>

// //         <img
// //           className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
// //           src={authUser?.profilePic || assets.logo_icon}
// //           alt="Profile"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfilePage;


import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || "");
      setBio(authUser.bio || "");
    }
  }, [authUser]);

  if (loading) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  if (!authUser) return <Navigate to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { fullName: name, bio };
    if (selectedImg) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        body.profilePic = reader.result;
        await updateProfile(body);
        navigate('/');
      };
    } else {
      await updateProfile(body);
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input type="file" id="avatar" accept='.png,.jpg,.jpeg' hidden onChange={(e) => setSelectedImg(e.target.files[0])} />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon} alt="avatar" className='w-12 h-12 rounded-full' />
            Upload profile image
          </label>
          <input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
          <textarea placeholder="Write profile bio" value={bio} onChange={(e) => setBio(e.target.value)} required rows={4} className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500" />
          <button type="submit" className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer">Save</button>
        </form>
        <img className='max-w-44 aspect-square mx-10 max-sm:mt-10 rounded-full' src={authUser?.profilePic || assets.logo_icon} alt="Profile" />
      </div>
    </div>
  );
};

export default ProfilePage;
