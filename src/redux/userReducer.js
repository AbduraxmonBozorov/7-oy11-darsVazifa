const initialstate = {
    users: []
  };
  
export function userReducer(state=initialstate, action){
    switch(action.type){
        case "ADD":
            return {...state, users: [...state.users, action.payload]}
        case "REMOVE":
            let copied=JSON.parse(JSON.stringify(state.users));
            copied=copied.filter(function(user){
                return user.id != action.payload
            })
            return {...state, users: copied}
            return state
        default:
            return state
    }
}