import { Platform } from 'react-native';
import AsyncStorageManagement from '../../storage/asyncStorage.ts';

class PUT{

    private static endpoint = {
        update:'/api/user/update',
    };
    private static  api_url = Platform.OS === 'ios' ? process.env.API_URL_IOS : process.env.API_URL_ANDROID;

    /**
     * Sends a 'PUT' request to HiManager REST Api in order to update user's password.
     *
     ** Params -> email : string , password : string
     *
     ** Returns -> updated_user : object | 401 | null
     */
    public static updatePassword = async (email:string,password:string)=>{
        const token = await AsyncStorageManagement.getData('token');

        try{
            let response = await fetch(this.api_url + this.endpoint.update,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email, password }),
            });
            if(response.status === 200){
                let  result = await response.json();
                return result.updated_user;
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

export default PUT;
