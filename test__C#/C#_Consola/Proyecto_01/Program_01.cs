using System;
using System.Runtime.CompilerServices;

using System.IO;
using Humanizer;
// using ClassLibrary;
using Proyecto_02;
using LibreriaDeClases;

namespace Proyecto_01
{

    class Program_01
    {
        static void Main(string[] args)
        {
            // Convertir una fecha a un formato legible
            // var date = new DateTime(2023, 7, 20);
            // string humanizedDate = date.Humanize();
            // Console.WriteLine(humanizedDate); // Salida: "in 2 years"
            var valor = Class1.libreriaValor;
            System.Console.WriteLine(valor);
            // Output: 20 de julio de 2023
            // string mensaje ="";
            // Crea un nuevo archivo
            // TextWriter archivo = new StreamWriter("archivo.txt");

            // Inserta texto en el archivo
            // mensaje = Console.ReadLine().ToString();

            // archivo.WriteLine(mensaje);

            // archivo.Close();
            // Console.Clear();

            // System.Console.WriteLine("Se ha guardado el Archivo");
            // Console.ReadKey();

        }
    }
}