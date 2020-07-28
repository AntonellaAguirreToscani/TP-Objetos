import * as Asciichart from "asciichart";
import * as fs from 'fs';

class Person{
    private name:string;
    private lastName:string;
    private birthDate:Date;
    private _id:number;

    public constructor(_name:string,_lastName:string,_birthDate:Date,_id:number){
        this.name=_name;
        this.lastName=_lastName;
        this.birthDate=_birthDate;
        this._id=_id;
    }
    public get id():number{
        return this._id;
    }
    //Concatena y retorna (nombre + apellido = nombreCompleto)
    public get fullName():string{
        return `${this.name} ${this.lastName}`;
    }
}
//La clase vendedor Hereda las propiedades de Persona.
class SalesMan extends Person{
    private _docket:number;
    private _sales:Sale[];

    public constructor(_name:string,_lastName:string,_birthDate:Date,_id:number,_docket:number,_sales?:Sale[]){
        super(_name,_lastName,_birthDate,_id);
        this._docket= _docket;
        (_sales==null||_sales==undefined)?this._sales=[]:this._sales=_sales;
    }
    public get docket():number{
        return this._docket;
    }
    public get sales():Sale[]{
        return this._sales;
    }
    //Metodo para poder inicializar vacio un SalesMan. Utilizado en la funcion de la linea66
    static Empty():SalesMan{
        return new SalesMan('','',new Date(''),0,0,[]);
    }

}
class Sale{
    private date:string;
    private _amount:number;

    public constructor(_date:string,_amount:number){
        this.date=_date;
        this._amount=_amount;
    }

    public get amount():number{
        return this._amount;
    }
}
class EmployeesController{
    private employeesList:SalesMan[];

    public constructor(_employeesList?:SalesMan[]){
        (_employeesList==null||_employeesList==undefined)?this.employeesList=[]:this.employeesList=_employeesList;
    }

    public searchEmployee(docket:number):SalesMan{
        let employeefound:SalesMan= SalesMan.Empty();
        this.employeesList.forEach((salesMan)=>{
            if(docket==salesMan.docket){
                employeefound=salesMan;
            }
        });
        return employeefound;
    }
    public totalSales(docket:number):any{
        let employee:SalesMan= this.searchEmployee(docket);
        let total:number=0;
        for(let i:number=0;i<employee.sales.length;i++){
            total+= employee.sales[i].amount;
        }
        return `${employee.fullName}: $ ${total} `;
    } 
    /*Metodo q filtra las ventas de un Obj:SalesMan. Retorna un ARREGLO de Amount's
    la libreria AsciChart(no recibe por parametro objetos)*/
    public getChart(docket:number):number[]{
        let array:number[]=[];
        let employee:SalesMan=this.searchEmployee(docket);
        for(let i:number=0;i<employee.sales.length;i++){
           array.push(employee.sales[i].amount);
        }
        return array;   
    
    }   
}

//Metodo que recibe las ventas de un empleado y conviente cada posicion del arreglo en un obj:Sale
function loadSales(array:string[]):Sale[]{
    let sales:Sale[]=[];
    array.map(item=>{
        let cadena:string[]=item.split(',');
        let date:string=cadena[0];
        let amount:number=parseInt(cadena[1]);
        sales.push(new Sale(date,amount));
    });
    return sales;
}

//Ventas del mes de Julio, empleado.Legajo: 1001
let sales1:string= fs.readFileSync('sales1001.txt','utf-8');
let arraySales1: string[] = sales1.split('\r\n');
//Ventas del mes de Julio, empleado.Legajo: 1002
let sales2:string=fs.readFileSync('sales1002.txt','utf-8');
let arraySales2:string[]=sales2.split('\r\n');

//Instanciando vendedores:1y2 con las Prop. heredadas de obj:Person y las Prop. que lo diferencian(cuil,docket,sales[])
let salesMan1:SalesMan=
    new SalesMan('Juan','Perez',new Date('1986-11-08'),35789095,1001,loadSales(arraySales1));

let salesMan2:SalesMan=
    new SalesMan('Pepito','Lopez',new Date('1992-03-05'),95345675,1002,loadSales(arraySales2)); 
//Instanciando la empresa
let company:EmployeesController=new EmployeesController([salesMan1,salesMan2]);

let asciichart=require('asciichart');
//configuracion de Libreria AsciChart para que a cada empleado se le asigne un color en el Grafico.
let config = {
    colors: [
        asciichart.blue,
        asciichart.green,
        asciichart.default, // default color
        undefined, // equivalent to default
    ]
}
console.log(asciichart.plot([company.getChart(1001),company.getChart(1002)],config));
console.log('Ventas Julio-2020');
console.log('color Azul:',company.totalSales(1001));
console.log('color Verde:',company.totalSales(1002));











