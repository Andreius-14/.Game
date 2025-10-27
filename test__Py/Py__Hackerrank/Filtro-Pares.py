## Crea un array con algunos números
#my_array = [1, 2, 3, 4, 5]
#
## Verifica si hay al menos un número mayor a 3 en el array
#if any(x > 3 for x in my_array):
#  print("Hay al menos un número mayor a 3 en el array") #Resultado
#else:
#  print("No hay números mayores a 3 en el array")
#
#
#
## Verifica si todos los elementos del array son menores o iguales a 3
#if all(x <= 3 for x in my_array):
#  print("No hay números mayores a 3 en el array") #Resultado
#else:
#  print("Hay al menos un número mayor a 3 en el array")
#

# Crea un array con algunos números repetidos
numbers = [3, 7, 7, 4, 5, 6, 8, 8, 3]

# Obtiene el número más grande del array
max_number = max(numbers)

# Elimina todas las ocurrencias del número más grande del array
while max_number in numbers:
  numbers.remove(max_number)

print(numbers)
