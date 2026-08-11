# Routes from Santiago to South America
ROUTES = [
    # Brazil - 8 routes
    {"from": "SCL", "to": "GIG", "city": "Rio de Janeiro, Brazil"},
    {"from": "SCL", "to": "GRU", "city": "São Paulo, Brazil"},
    {"from": "SCL", "to": "BSB", "city": "Brasília, Brazil"},
    {"from": "SCL", "to": "BEL", "city": "Belém, Brazil"},
    {"from": "SCL", "to": "SSA", "city": "Salvador, Brazil"},
    {"from": "SCL", "to": "REC", "city": "Recife, Brazil"},
    {"from": "SCL", "to": "CWB", "city": "Curitiba, Brazil"},
    {"from": "SCL", "to": "POA", "city": "Porto Alegre, Brazil"},
    # Argentina - 6 routes
    {"from": "SCL", "to": "EZE", "city": "Buenos Aires, Argentina"},
    {"from": "SCL", "to": "AEP", "city": "Buenos Aires Aeroparque, Argentina"},
    {"from": "SCL", "to": "MDQ", "city": "Mar del Plata, Argentina"},
    {"from": "SCL", "to": "MZA", "city": "Mendoza, Argentina"},
    {"from": "SCL", "to": "ROS", "city": "Rosario, Argentina"},
    {"from": "SCL", "to": "SVJ", "city": "San Juan, Argentina"},
    # Peru - 4 routes
    {"from": "SCL", "to": "LIM", "city": "Lima, Peru"},
    {"from": "SCL", "to": "CUZ", "city": "Cusco, Peru"},
    {"from": "SCL", "to": "AYP", "city": "Arequipa, Peru"},
    {"from": "SCL", "to": "PEM", "city": "Puerto Maldonado, Peru"},
    # Uruguay - 1 route
    {"from": "SCL", "to": "MVD", "city": "Montevideo, Uruguay"},
    # Paraguay - 1 route
    {"from": "SCL", "to": "ASU", "city": "Asunción, Paraguay"},
    # Bolivia - 3 routes
    {"from": "SCL", "to": "LPB", "city": "La Paz, Bolivia"},
    {"from": "SCL", "to": "VVI", "city": "Santa Cruz de la Sierra, Bolivia"},
    {"from": "SCL", "to": "CBB", "city": "Cochabamba, Bolivia"},
]

print(f"Total routes configured: {len(ROUTES)}")
for route in ROUTES:
    print(f"  {route['from']} → {route['to']}: {route['city']}")
