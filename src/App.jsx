import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const users = useSelector((state) => state.users);  
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const modalNameRef = useRef(null);
  const modalAgeRef = useRef(null);

  // Tanlangan user ID sini saqlash uchun state
  const [selectedUserId, setSelectedUserId] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let user = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      id: Date.now(),
    };
    dispatch({ type: "ADD", payload: user });
    nameRef.current.value = "";
    ageRef.current.value = "";
    nameRef.current.focus();
  }

  function handleRemove(id) {
    dispatch({ type: "REMOVE", payload: id });
  }

  function handleEdit(id) {
    setSelectedUserId(id);

    let selectedUser = users.users.find((user) => user.id === id);
    
    if (selectedUser) {      
      modalNameRef.current.value = selectedUser.name;
      modalAgeRef.current.value = selectedUser.age;
    }
  }

  function handleEditModal() {
    // Modal oynadan yangi ma'lumotlarni olish
    let updatedUser = {
      name: modalNameRef.current.value,
      age: modalAgeRef.current.value,
      id: selectedUserId,
    };
    dispatch({ type: "EDIT", payload: updatedUser });
    // Modal oynani yopish
    document.getElementById("my_modal_1").close();
  }

  return (
    <div className="container mx-auto">
      <form
        className="w-full border rounded-md p-1 m-1 mx-auto flex flex-col gap-20 md:w1/2 md:p-2 md:m-2"
        onSubmit={handleSubmit}
      >
        <input ref={nameRef} type="text" placeholder="Enter name" name="name" />
        <input ref={ageRef} type="text" placeholder="Enter age" name="age" />
        <button>Save</button>
      </form>

      <div className="wrapper">
        {users.users.length > 0 &&
          users.users.map((user, index) => (
            <div key={index} className="user-card flex flex-col gap-2">
              <h3>{user.name}</h3>
              <p>{user.age}</p>
              <small>{user.id}</small>
              <hr />
              <button
                onClick={() => {
                  handleRemove(user.id);
                }}
              >
                Remove
              </button>
              <button
                className="btn"
                onClick={() => {
                  document.getElementById("my_modal_1").showModal();
                  handleEdit(user.id);
                }}
              >
                Edit
              </button>
            </div>
          ))}
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3>Name</h3>
          <input ref={modalNameRef} type="text" name="name" />
          <h3>Age</h3>
          <input ref={modalAgeRef} type="text" name="age" />
          <br />
          <div className="modal-action">
            <button className="btn" onClick={handleEditModal}>
              Edit
            </button>
            <button
              type="reset"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default App;
