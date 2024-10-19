class User{
    public id:number;
    public email:string;
    public name:string;
    public surname:string;
    public roles: string[];

    constructor(id:number,email:string,name:string,surname:string,roles:string[]){
        this.id = id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.roles = roles;
    }
}

export default User;

