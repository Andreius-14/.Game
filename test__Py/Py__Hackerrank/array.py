#x = int(input())
#y = int(input())
#z = int(input())
#n = int(input())
#    
#array = []
#for valuex in range(0,x+1):
#    for valuey in range (0,y+1):
#        for valuez in range (0,z+1):
#            if (valuex + valuey + valuez ==n):
#                continue
#            else:
#                array.append([valuex,valuey,valuez])
#                #print(f"[{valuex},{valuey},{valuez}]")
#
#
#print(array)


"""Version IA"""
x = int(input())
y = int(input())
z = int(input())
n = int(input())

# Genera todas las combinaciones posibles de x, y y z -- Igual al tripe for anidado
combinations = [(valuex, valuey, valuez) for valuex in range(0, x+1) for valuey in range(0, y+1) for valuez in range(0, z+1)]

print(valuex)
#Filtra la lista para incluir solo las combinaciones que cumplen la condición
array = [combination for combination in combinations if sum(combination) != n]

print(array)

