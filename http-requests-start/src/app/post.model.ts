
export class Post{
    public title : string;
    public content : string;
    public id: string;

    constructor(name: string, cont: string, id: string){
        this.title = name;
        this.content = cont;
        this.id = id;
    }
}