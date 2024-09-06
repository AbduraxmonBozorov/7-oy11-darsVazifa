const initialstate = {
  users: [],
};

export function userReducer(state = initialstate, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, users: [...state.users, action.payload] };

    case "REMOVE":
      let copied = state.users.filter((user) => user.id !== action.payload);
      return { ...state, users: copied };

    case "EDIT":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    default:
      return state;
  }
}
