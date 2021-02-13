import {verify} from '../../Action/Token/verifytoken';



const initialstate={
    token:''

}

//reducer
const verifytoken =(state=initialstate,action)=>{
    switch(action.type){
        case verify:
            return{
                ...state,
                token:action.payload
            };
           
             default:
            return state
    }
    
}
export default verifytoken;