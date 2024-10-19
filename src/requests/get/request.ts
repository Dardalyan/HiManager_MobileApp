import User from '../../model/User.ts';
import {Platform} from 'react-native';
import AsyncStorageManagement from '../../storage/asyncStorage.ts';

class GET{

    private static endpoint = {
        currentUser:'/api/user/current',
        allUsers : '/api/user/all',
        getUser: '/api/user/',
    };
    private static  api_url = Platform.OS === 'ios' ? process.env.API_URL_IOS : process.env.API_URL_ANDROID;

    /**
     * Sends a 'GET' request to HiManager REST Api in order to get authenticated user.
     *
     ** Returns -> user : User | 401 | null
     */
    public static getCurrentUser = async ()=>{
        const token = await AsyncStorageManagement.getData('token');

        try{
            let response = await fetch(this.api_url + this.endpoint.currentUser ,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if(response.status === 200){
                let result =  await response.json();
                return new User(result.id,result.email,result.name,result.surname,result.roles);
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
     * Sends a 'GET' request to HiManager REST Api in order to find the user with given id.
     *
     ** Params-> id : number
     *
     ** Returns -> user : User | 401 | null
     */
    public static getUserById = async (id:number)=>{
        const token = await AsyncStorageManagement.getData('token');

        try{
            let response = await fetch(this.api_url + this.endpoint.getUser + id ,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if(response.status === 200){
                let result =  await response.json();
                return new User(result.user.id,result.user.email,result.user.name,result.user.surname,result.user.roles);
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
     * Sends a 'GET' request to HiManager REST Api in order to get all the users in the system.
     *
     ** Returns -> user : User | 401 | null
     */
    public static getAllUsers = async ()=>{
        const token = await AsyncStorageManagement.getData('token');
        let users = [] as Array<User>;

        try{
            let response = await fetch(this.api_url + this.endpoint.allUsers,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if(response.status === 200){
                let result =  await response.json();
                result.users.forEach((user:any)=>{
                    users.push(new User(user.id,user.email,user.name,user.surname,user.roles));
                });
                return users;
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

export default GET;
