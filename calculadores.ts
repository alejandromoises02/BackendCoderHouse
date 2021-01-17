interface calculador{
    result(): Promise<any>
}

class Suma implements calculador{

    private a: number;
    private b: number;

    constructor(a : number , b : number){
        this.a = a;
        this.b = b;
    }

    public async result(): Promise<number>{
        return this.a + this.b;
    }
}

class Resta implements calculador{
    private a: number;
    private b: number;

    constructor(a : number , b : number){
        this.a = a;
        this.b = b;
    }

    public async result(): Promise<number>{
        return this.a - this.b;
    }

}

export = {Suma, Resta}