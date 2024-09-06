import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const modalNameRef = useRef(null);
  const modalAgeRef = useRef(null);

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
    let usersModal = users.users;
    usersModal.forEach((user) => {
      if (user.id == id) {
        modalNameRef.current.value = user.name;
        modalAgeRef.current.value = user.age;
      }
    });
  }

  function handleEditModal(){
    
  }

  return (
    <div className="container mx-auto">
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3>Name</h3>
          <input ref={modalNameRef} type="text" name="" id="" />
          <h3>Age</h3>
          <input ref={modalAgeRef} type="text" name="" id="" />
          <br />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleEditModal}>Edit</button>
              <button type="reset">Reset</button>
            </form>
          </div>
        </div>
      </dialog>

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
              a<h3>{user.name}</h3>
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
    </div>
  );
}

export default App;
