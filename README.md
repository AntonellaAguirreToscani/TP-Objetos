# TP-Objetos

Proyecto: SaleSystem

    Descripcion: 
        Sistema que brinda a la empresa que lo utilice la posibilidad de cargar/dar de alta a sus vendedores de manera independiente, con datos personales y tambien un numero Identificatorio de empleado(DOCKET).
        Cada uno de ellos, a su vez tendrá un listado con sus ventas diarias. Que al finalizarse el mes en curso, la empresa puede solicitar y visualizar un Grafico donde se podrá apreciar el performance de todos los empleados,Distinguiendo uno de otro con colores diferentes. Para mayor entendimiento debajo del gráfico se podrá observar el nombre del empleado con su color asignado y el monto total del Mes.
        Las ventas están separadas por empleado. Cada uno posee su archivo.txt(Base de Datos), donde se podrá modificar o agregar una Venta por fecha y monto.

    Funcionalidades: 
        LOS EMPLEADOS SON IDENTIFICADOS POR EL NUMERO DE DOCKET(Legajo).Esto permite mayor precisión.

        + get FullName (Dar Nombre completo): Nombre y Apellido son propiedades distintas. Esta funcionalidad permite concatenarlas, retonando Nombre + Apellido.
        + searchEmployee (Buscar Empleado): Retorna empleado con datos y ventas.
        + totalSales (Sumar Ventas): Se busca un empleado determinado y retorna la suma de las ventas acumuladas.
        + getArraySales (Obtener Arreglo de ventas): Accede a cada una de las ventas del empleado y retorna un listado(arreglo) con sus valores. Esto permite la utilización de la libreria AsciChart.
        + showCharts (Obtener Graficos): recorre el listado de empleados y a cada uno le aplica la funcion nombrada anteriormente, llena una matriz:number[][] con las ventas[] de cada empleado y retorna: AsciiChart INVOCADA a La Matriz. Esto genera el grafico general de ventas.
        + loadSales (Cargar Ventas): Transición de la base de datos (arch.txt) a clase Sale(Venta).
     
    AsciChart:
        Libreria encargada de graficar en consola cualquier dato numérico que se le brinde a través de uno o más arreglos. Cada valor del arreglo se verá reflejado en el gráfico,generando una "cadena irregular". La función de trazado: (.plot()), acepta por parámetro como se mencionó anteriormente: una o mas series y también una configuración que permite distinguirlas brindandole una colometria distinta a cada una.
        Dentro de dicha configuración también se puede especificar la altura(heigth) del gráfico. En caso que sea un unico arreglo el que se desea graficar; la altura se define directamente en la funcion de trazado, sin necesidad de una config. Si no se configura la altura, se aplicará por defecto(tomando el mayor valor dentro de la/las serie/s).

       Ejemplos AsciiChart Aplicables al Proyecto: 

        - Graficar ventas 1 empleado:(1 arreglo)
         console.log(asciichart.plot(company.getArraySales(numLegajo),{heigth:5}));

        - Graficar ventas 2 ó + empleados:(2 arreglos)
         console.log(asciichart.plot([company.getArraySales(numLegajo),company.getArraySales(numLegajo)],config));
         
         Para Mayor Informacion:
         https://www.npmjs.com/package/asciichart

    Get Started:
        - Clonar repositorio Git-hub: (https://github.com/AntonellaAguirreToscani/TP-Objetos.git) 
        - instalar librerias: npm install      
