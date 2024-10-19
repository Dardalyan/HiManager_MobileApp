import {Platform} from 'react-native';
import AsyncStorageManagement from '../../storage/asyncStorage.ts';

class DELETE{

    private static endpoint = {
        deleteUser:'/api/user/',
    };
    private static  api_url = Platform.OS === 'ios' ? process.env.API_URL_IOS : process.env.API_URL_ANDROID;

    /**
     * Sends a 'DELETE' request to HiManager REST Api in order to delete given user.
     *
     ** Params -> user : any
     *
     ** Returns -> deleted_user : object | 401 | null
     */
    public static deleteUser = async (user:any)=>{
        const token = await AsyncStorageManagement.getData('token');
        try{
                let response = await fetch(this.api_url + this.endpoint.deleteUser + user.id,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if(response.status === 200){
                    const result =  await response.json();
                    return result.deleted_user;
                }else if(response.status === 401){
                    return 401;
                }
                else{
                    return null;
                }
        }catch (err){
            console.log(err);
            return null;
        }
    };
}

export default DELETE;
