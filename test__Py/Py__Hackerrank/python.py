#Retos Python

#
#numero = int( input("Ingresa un numero: ") )
#
#if numero>0 and numero<10:
#   for value in numero:
#    print(f"{value}")
#

#size = int(input("Ingresa el tamaño del triángulo: "))
#
#triangle = ""
#for i in range(size):
#    # Agrega espacios en blanco al inicio de la línea para alinear el triángulo a la derecha
#   # line = " " * (size - i - 1)
#    # Agrega los números a la línea, empezando en 1 y aumentando en 1 en cada iteración
#    for j in range(i + 1):
#        line = str(j + 1) + " "
#    # Agrega los números a la línea en orden inverso para formar el triángulo palindrómico
#    for j in range(i, 0, -1):
#        line += str(j) + " "
#    # Agrega la línea al triángulo
#    triangle += line + "\n"
#
## Imprime el triángulo completo
#print(triangle)

for i in range(1,int(input())+1): 

    x = "".join( str(value) for value in range(1,i+1)    )
    x += x[::-1][1:]
    print(x)

    """Prueba"""
n = int(input())
text = ""

if 1 <= n <= 150:
  text = "".join(str(i) for i in range(1, n+1))

print(text)





if __name__ == '__main__':
    n = int(input())
    arr = map(int, input().split())
    arr=list(arr)
    
    if 2<=n<=10 and all(-100<= value <=100 for value in arr):
        arr.sort()
        cuspide =max(arr)
        while cuspide in arr:
            arr.remove(cuspide)
        print(max(arr))
        


if __name__ == '__main__':
    objeto = {}
    for i in range(int(input())):
        name = input()
        score = float(input())
        objeto.update({f"{name}":score})
        
    array = list(objeto.values())
    minimo = min(array)
    while minimo in array:
        array.remove(minimo)
    
    minimo = min(array)    
    final = [x for x,y in objeto.items() if y==minimo]
    final.sort()
    
    for x in final:
        print(x)

# Crea un diccionario vacío para almacenar los nombres y puntuaciones de los estudiantes
objeto = {}

# Solicita el número de estudiantes y los nombres y puntuaciones de cada uno
for i in range(int(input())):
    name = input()
    score = float(input())
    objeto[name] = score

# Encuentra el valor mínimo en la lista de puntuaciones
min_score = min(objeto.values())

# Filtra el diccionario para eliminar los estudiantes con la puntuación mínima
objeto = {name: score for name, score in objeto.items() if score > min_score}

# Encuentra el valor mínimo de nuevo en la lista filtrada
min_score = min(objeto.values())

# Crea una lista de nombres de estudiantes con la puntuación mínima utilizando una comprensión de listas
final = [name for name, score in objeto.items() if score == min_score]

# Ordena la lista de nombres alfabéticamente
final.sort()

# Imprime cada nombre de la lista
for name in final:
    print(name)



    """Complicado"""
    if __name__ == '__main__':
    # Cantidad de parámetros que se introducirán
    N = int(input())
    matriz = []

    # Inputs que se emplearán como funciones
    for i in range(1, N + 1):
        matriz.append(input().split(" "))

    # Array que almacenará los resultados
    array = []

    # Diccionario de funciones
    funciones = {
        "print": lambda: print(array),
        "sort": lambda: array.sort(),
        "pop": lambda: array.pop(),
        "reverse": lambda: array.reverse(),
        "insert": lambda: array.insert(int(valorArray[1]), int(valorArray[2])),
        "remove": lambda: array.remove(int(valorArray[1])),
        "append": lambda: array.append(int(valorArray[1])),
    }

    # Recorre la matriz y ejecuta la función correspondiente
    for valorArray in matriz:
        funciones[valorArray[0]]()

