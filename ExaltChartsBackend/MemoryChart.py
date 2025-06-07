from ChartInterface import ChartInterface
import matplotlib.pyplot as plt
import numpy as np
import base64
import matplotlib as mpl

class MemoryChart(ChartInterface):
    def __init__(self):
        self.point_of_risk = 5
        self.max_possible_level = 15

    def processData(self, scores):
        dateArray = []
        maxLevelArray=[]
        yearArray = []

        for score in scores:
            # Append only the year
            yearArray.append(score['date'][:4])

            dateArray.append(score['date'])
            # Apend max level
            maxLevelArray.append(score['maxLevel'])

        yearArray = list(dict.fromkeys(yearArray))

        return {"yearArray":yearArray, "dateArray":dateArray, "maxLevelArray":maxLevelArray}
    
    def paginateData(self, processedScores: dict):
        return processedScores
        
    def createChart(self, processedScores: dict):
        yearArray = processedScores["yearArray"]
        dateArray = processedScores["dateArray"]
        maxLevelArray = processedScores["maxLevelArray"]

        if len([yearArray]) == 1:
                title = f"Resultados durante el año {yearArray[0]}"
        else:
            title = "Resultados durante los años"    
            for year in yearArray:
                title = f"{title} - {year}"

        # Write line of risk
        plt.axhline(y=self.point_of_risk, color='r', linestyle='--')
        
        plt.plot(dateArray, maxLevelArray, marker='o')
        plt.title(title)
        plt.ylim(0)
        plt.xlabel('Dia')
        plt.ylabel('Nivel Máximo')
        plt.grid()

        plt.savefig('puntuaciones.png')

        # Return encoded
        with open('puntuaciones.png', 'rb') as f:
            base64image = base64.b64encode(f.read())
        return base64image
    
    def createPaginatedChart(self, processedScores: dict):
        # days per figure
        limit = 7

        chart64Array = []
        # yearArray = processedScores["yearArray"]
        yearArray = []
        dateArray = processedScores["dateArray"]
        maxLevelArray = processedScores["maxLevelArray"]
        title = ""

        # Separate each plot in x days 
        for i in range(0, len(dateArray), limit):
            for j in range(i, i+(len(dateArray[i:i+limit]))):
                yearArray.append((dateArray[j])[:4])
                dateArray[j] = ((dateArray[j])[5:])
            
            yearArray = list(dict.fromkeys(yearArray))

            if len(yearArray) == 1:
                title = f"Resultados durante el año {yearArray[0]}"
            else:
                title = "Resultados durante los años"    
                for year in yearArray:
                    title = f"{title} - {year}"

            # Plot 7 days
            plt.plot(dateArray[i:i+limit], maxLevelArray[i:i+limit], marker='o')
            # Y Axes max value
            ax = plt.gca()
            ax.set_ylim([0, self.max_possible_level])

            # Write line of risk
            plt.axhline(y=self.point_of_risk, color='r', linestyle='--')
            
            plt.title(title)
            plt.ylim(0)
            plt.xlabel('Fecha')
            plt.ylabel('Nivel Máximo')
            plt.grid()

            plt.savefig('puntuaciones.png')

            with open('puntuaciones.png', 'rb') as f:
                base64image = base64.b64encode(f.read())
            chart64Array.append(base64image)

            # Clear yearArray
            yearArray = []
            # Clear title
            title = ""
            # Clear figure
            plt.clf()
        return chart64Array