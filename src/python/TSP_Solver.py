import json
import math
from operator import itemgetter
from time import time
global Dist

lista = []
coordenadas = []
ruta_orden = []
ruta = 'src/public/selected.json'
visitados = []
origen = 0
s = 0
resultado = {}


def calcular_peso(lat1, lon1, lat2, lon2):

    rad = math.pi/180

    dlat = lat2-lat1
    dlon = lon2-lon1
    R = 6372.795477598

    a = (math.sin(rad*dlat / 2))**2 + math.cos(rad * lat1) * \
        math.cos(rad * lat2) * (math.sin(rad * dlon / 2)) ** 2
    distancia = 2 * R * math.asin(math.sqrt(a))
    return distancia


def cargar_localidades(ruta):  # departamental 1,provincial 2, distrital 3
    with open(ruta, 'r', encoding='utf8', errors='ignore') as contenido:
        cont = 0

        resultado = json.load(contenido)
        a = resultado.get('features').copy()
        a.pop()
        return a


def matriz(lista):

    matriz_distancia = []

    for i in range(len(lista)):

        aux = []
        for j in range(len(lista)):

            if(i != j):
                aux.append((j, calcular_peso(lista[i].get("geometry").get("coordinates")[0][0], lista[i].get("geometry").get("coordinates")[
                           0][1], lista[j].get("geometry").get("coordinates")[0][0], lista[j].get("geometry").get("coordinates")[0][1])))

        matriz_distancia.append(aux)

    menor = math.inf

    aux2 = []
    for v, w in matriz_distancia[0]:
        if(w < menor):
            aux2 = [(v, w)]
            menor = w
    matriz_distancia[0] = aux2

    return matriz_distancia


def floydwarshall(G):
    n = len(G)
    d = [[math.inf]*n for _ in range(n)]
    p = [[-1]*n for _ in range(n)]
    for u in range(n):
        d[u][u] = 0
        for v, w in G[u]:
            d[u][v] = w
            p[u][v] = u
    for k in range(n):
        for i in range(n):
            for j in range(n):
                f = d[i][k] + d[k][j]
                if d[i][j] > f:
                    d[i][j] = f
                    p[i][j] = k

    return p, d


def ruta_mas_corta(G, origen, visitados, s):
    if(len(visitados) < len(G)):
        dest = math.inf
        menor = math.inf
        for j in range(len(G)):
            if (origen != j):
                if(menor > G[origen][j] and (j not in visitados)):
                    menor = G[origen][j]
                    dest = j
        visitados.append(dest)
        s += menor
        #print("suma", s)
        return ruta_mas_corta(G, dest, visitados, s)
    return s


def guardar(coordenadas, s):
    mi_path = ruta
    f = open(mi_path, 'w')
    nueva = []

    for i in visitados:
        nueva.append(coordenadas[i])
    resultado["features"] = nueva
    resultado["distance"] = round(s * 1.609)
    

    f.write(json.dumps(resultado, indent=2))

    f.close()


coordenadas = cargar_localidades(ruta)
mat = matriz(coordenadas)
t_inicial = time()
p, d = floydwarshall(mat)
visitados.append(origen)
s = ruta_mas_corta(d, origen, visitados, s)

visitados.append(origen)
t_final = time()

t_total = t_final-t_inicial
print("Tiempo de ejecucion: %.10f sgundos." % t_total)


guardar(coordenadas, s)

print(s)

