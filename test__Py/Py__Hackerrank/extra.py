
x ="".join(str(value) for value in range(1, 10))
print(x)

"""Diccionario de comprensión"""

#Del 1 al 5 su cuadrado
diccionario = {i: i**2 for i in range(1, 6)}
print(diccionario)  # imprime {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

#De "abcde" con su índice
diccionario = {letra: indice for indice, letra in enumerate("abcde")}
print(diccionario)  # imprime {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4}

#Del 1 al 5 Determina si es par o impar
diccionario = {i: "par" if i % 2 == 0 else "impar" for i in range(1, 6)}
print(diccionario)  # imprime {1: "impar", 2: "par", 3: "impar", 4: "par", 5: "impar"}


"""lista de comprensión"""

#Antes
resultado = []
for i in range(10):
    resultado.append(i * 2)
# resultado = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

#Despues
resultado = [i * 2 for i in range(10)]
# resultado = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
