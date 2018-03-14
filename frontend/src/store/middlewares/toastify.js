import { toast } from 'react-toastify';

export default store => next => action => {
    console.log(action)
    if(action.meta && action.meta.toast){
        const { type, message, orientation } = action.meta.toast
        toast[type](message, {
            position: orientation || toast.POSITION.TOP_CENTER
        })
    }
    return next(action)
}