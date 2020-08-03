"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var asciichart = require('asciichart');
var Person = /** @class */ (function () {
    function Person(_name, _lastName, _birthDate, _id) {
        this.name = _name;
        this.lastName = _lastName;
        this.birthDate = _birthDate;
        this._id = _id;
    }
    Object.defineProperty(Person.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "fullName", {
        //Concatena y retorna (nombre + apellido = nombreCompleto)
        get: function () {
            return this.name + " " + this.lastName;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
//La clase vendedor Hereda las propiedades de Persona.
var SalesMan = /** @class */ (function (_super) {
    __extends(SalesMan, _super);
    function SalesMan(_name, _lastName, _birthDate, _id, _docket, _sales) {
        var _this = _super.call(this, _name, _lastName, _birthDate, _id) || this;
        _this._docket = _docket;
        (_sales == null || _sales == undefined) ? _this._sales = [] : _this._sales = _sales;
        return _this;
    }
    Object.defineProperty(SalesMan.prototype, "docket", {
        get: function () {
            return this._docket;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SalesMan.prototype, "sales", {
        get: function () {
            return this._sales;
        },
        enumerable: false,
        configurable: true
    });
    //Metodo para poder inicializar vacio un SalesMan. Utilizado en la funcion de la linea67
    SalesMan.Empty = function () {
        return new SalesMan('', '', new Date(''), 0, 0, []);
    };
    return SalesMan;
}(Person));
var Sale = /** @class */ (function () {
    function Sale(_date, _amount) {
        this.date = _date;
        this._amount = _amount;
    }
    Object.defineProperty(Sale.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        enumerable: false,
        configurable: true
    });
    return Sale;
}());
var EmployeesController = /** @class */ (function () {
    function EmployeesController(_employeesList) {
        (_employeesList == null || _employeesList == undefined) ? this.employeesList = [] : this.employeesList = _employeesList;
    }
    EmployeesController.prototype.searchEmployee = function (docket) {
        var employeefound = SalesMan.Empty();
        this.employeesList.forEach(function (salesMan) {
            if (docket == salesMan.docket) {
                employeefound = salesMan;
            }
        });
        return employeefound;
    };
    EmployeesController.prototype.totalSales = function (docket) {
        var employee = this.searchEmployee(docket);
        var total = 0;
        for (var i = 0; i < employee.sales.length; i++) {
            total += employee.sales[i].amount;
        }
        return employee.fullName + ": $ " + total + " ";
    };
    /*Metodo q filtra las ventas de un Obj:SalesMan. Retorna un ARREGLO de Amount's
    la libreria AsciChart(no recibe por parametro objetos)*/
    EmployeesController.prototype.getArraySales = function (docket) {
        var array = [];
        var employee = this.searchEmployee(docket);
        for (var i = 0; i < employee.sales.length; i++) {
            array.push(employee.sales[i].amount);
        }
        return array;
    };
    //Metodo para graficar las ventas de todos los empleados- Utiliza libreria asciiChart
    EmployeesController.prototype.showCharts = function () {
        var arreglos = [];
        for (var i = 0; i < this.employeesList.length; i++) {
            var docket = this.employeesList[i].docket;
            arreglos.push(this.getArraySales(docket));
        }
        return asciichart.plot(arreglos, config);
    };
    return EmployeesController;
}());
//Metodo que recibe las ventas de un empleado y conviente cada posicion del arreglo en un obj:Sale
function loadSales(array) {
    var sales = [];
    array.map(function (item) {
        var cadena = item.split(',');
        var date = cadena[0];
        var amount = parseInt(cadena[1]);
        sales.push(new Sale(date, amount));
    });
    return sales;
}
//Ventas del mes de Julio, empleado.Legajo: 1001
var sales1 = fs.readFileSync('sales1001.txt', 'utf-8');
var arraySales1 = sales1.split('\r\n');
//Ventas del mes de Julio, empleado.Legajo: 1002
var sales2 = fs.readFileSync('sales1002.txt', 'utf-8');
var arraySales2 = sales2.split('\r\n');
//Instanciando vendedores con las Prop. heredadas de obj:Person y las Prop. que lo diferencian(docket,sales[])
var salesMan1 = new SalesMan('Juan', 'Perez', new Date('1986-11-08'), 35789095, 1001, loadSales(arraySales1));
var salesMan2 = new SalesMan('Pepito', 'Lopez', new Date('1992-03-05'), 95345675, 1002, loadSales(arraySales2));
//Instanciando la empresa
var company = new EmployeesController([salesMan1, salesMan2]);
//configuracion de Libreria AsciChart para que a cada empleado se le asigne un color en el Grafico.
var config = {
    colors: [
        asciichart.blue,
        asciichart.green,
        asciichart.default,
        undefined,
    ]
};
console.log(company.showCharts());
console.log('Ventas Julio-2020');
console.log('color Azul:', company.totalSales(1001));
console.log('color Verde:', company.totalSales(1002));
