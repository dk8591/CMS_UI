import jwt from 'jsonwebtoken';


//actions
export const verify = 'verify'

//action creator to verify token
export const verifyToken = () => async dispatch => {

    jwt.verify(localStorage.getItem('Token'), "superkey", async function (err, decoded) {
        if (err) {



        } else {
            if (Date.now() >= decoded.exp * 1000) {

                dispatch({
                    type: verify,
                    payload: []
                });
            } else {



                dispatch({
                    type: verify,
                    payload: [decoded]
                });
            }
        }
    })
}