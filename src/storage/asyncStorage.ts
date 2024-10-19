import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageManagement{

    /**
     * Stores the key/value pairs in device to use them later.
     *
     ** Params -> key : string , value : any
     *
     */
    public static store = async (key:string,value:any)=>{
        try{
            await AsyncStorage.setItem(key,value);
        }catch (err){
            console.log(err);
        }
    };

    /**
     * Retrieves the data stored before in device.
     *
     ** Params -> key : string
     *
     */
    public static getData = async (key:string)=>{
        try{
            const data:any =  await AsyncStorage.getItem(key);
            return data;
        }catch (err){
            console.log(err);
        }
    };
}

export default  AsyncStorageManagement;

