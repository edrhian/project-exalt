import matplotlib.pyplot as plt
import numpy as np

import matplotlib as mpl
import requests

# This program retrieves scores from exatBackend api and makes a graph with the results

# Get scores from api
def getScores(userPatientId, gameType):
    r = requests.get(f'http://localhost:8080/scores/{userPatientId}/{gameType}')
    if r.status_code == 200:
        return r.json()
    else :
        print(r.status_code)

# Main
def main():
    dateArray = []
    maxLevelArray=[]
    yearArray = []

    results = getScores(1, 'MEMORY')

    for i in results:
        # Append only the year
        yearArray.append(i['date'][:4])
        # Append the date in format mm-dd
        dateArray.append(i['date'][5:])
        # Apend max level
        maxLevelArray.append(i['maxLevel'])

    # Remove duplicated from list
    yearArray = list(dict.fromkeys(yearArray))

    makeGraph(dateArray, maxLevelArray, yearArray)    

# Matplotlib make graph
def makeGraph(dateArray, maxLevelArray, yearArray):

    if len(yearArray) == 1:
        title = f"Puntuaciones durante el año {yearArray[0]}"
    else:
        title = "Puntuaciones durante los años"    
        for year in yearArray:
            title = f"{title} - {year}"

    
    plt.axhline(y=3, color='r', linestyle='--')
    
    plt.plot(dateArray, maxLevelArray, marker='o')
    plt.title(title)
    plt.ylim(0)
    plt.xlabel('Dia')
    plt.ylabel('Puntuacion')
    plt.grid()

    return plt.savefig('puntuaciones.png')