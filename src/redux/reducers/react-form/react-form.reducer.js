import { ReactFormConst } from "./react-form.const";

const stateDefault = {
  listStudent: [], 
  editStudent: null,
};

export const reactFormReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case ReactFormConst.Submit:
      const newlistStudent = [...state.listStudent]; 
      const index = state.listStudent.findIndex(
        (p) => p.Id === action.payload.Id
      );
      let errMsg;
      if(index){
        newlistStudent.push(action.payload);

        state.listStudent = newlistStudent;
      }else{
        errMsg = "ID đã tổn tại";
      }

      return { ...state, errMsg }; 
    case ReactFormConst.Delete: {
      const newlistStudent = state.listStudent.filter((p) => p.Id !== action.payload);
    
      return { ...state, listStudent: newlistStudent };
    }
    case ReactFormConst.Edit:
      state.editStudent = action.payload;
      return { ...state };

    case ReactFormConst.Update: {
      const newlistStudent = [...state.listStudent];
      const index = state.listStudent.findIndex(
        (p) => p.Id === action.payload.Id
      );

      newlistStudent.splice(index, 1, action.payload);

      state.listStudent = newlistStudent;
      state.editStudent = null;

      return { ...state };
    }
    default:
      return state;
  }
};
