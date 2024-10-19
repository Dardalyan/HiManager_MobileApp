import { Platform } from 'react-native';
import AsyncStorageManagement from '../../storage/asyncStorage.ts';

class POST{

    private static endpoint = {
        login:'/api/auth/login',
        addRole:'/api/user/management/add-role',
        createUser:'/api/user/create',
    };
    private static  api_url = Platform.OS === 'ios' ? process.env.API_URL_IOS : process.env.API_URL_ANDROID;


    /**
     * Sends a 'POST' request to HiManager REST Api in order to authenticate the user.
     *
     ** Params -> email : string , password : string
     *
     ** Returns -> token : string | 401 | null
     */
    public static login = async (email:string,password:string)=>{
        try{
            let response = await fetch(this.api_url + this.endpoint.login,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if(response.status === 200){
                let  result = await response.json();
                return result.token;
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

    /**
     * Sends a 'POST' request to HiManager REST Api in order to create a new user.
     *
     ** Params -> user : object
     *
     ** Returns -> user : object | 401 | null
     */
    public static createUser = async (user:object)=>{
        const token = await AsyncStorageManagement.getData('token');
        try{
            let response = await fetch(this.api_url + this.endpoint.createUser,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });
            if(response.status === 200){
                let result = await response.json();
                return result.user;
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

    /**
     * Sends a 'POST' request to HiManager REST Api in order to change user's roles.
     *
     ** Params -> uid : number , roles: [] as Array<String>
     *
     ** Returns -> true | 401 | false
     */
    public static addRole = async (uid:number,roles:string[])=>{
        const token = await AsyncStorageManagement.getData('token');
        try{
            const payload:any = {
                'uid':uid,
                'roles':roles,
            };

            let response = await fetch(this.api_url + this.endpoint.addRole,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            if(response.status === 200){
                return true;
            }else if(response.status === 401){
                return 401;
            }
            else{
                return false;
            }
        }catch (err){
            console.log(err);
            return false;
        }
    };
}

export default POST;
