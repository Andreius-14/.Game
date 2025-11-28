import requests

# Definir la URL a la que se enviará la solicitud
url = "https://www.google.com/"

# Enviar una solicitud GET a la URL
response = requests.get(url)

# Verificar el código de respuesta
if response.status_code == 200:
    # La solicitud fue exitosa
    print("Solicitud exitosa")
    # Imprimir el contenido de la página
    print(response.content)
else:
    # La solicitud falló
    print("Solicitud fallida")
    print(f"Código de respuesta: {response.status_code}")

# Acceder a las cabeceras de la respuesta
headers = response.headers
print(headers)

# Acceder a las cookies de la respuesta
cookies = response.cookies
print(cookies)
