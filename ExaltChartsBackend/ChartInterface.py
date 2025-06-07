import abc

class ChartInterface(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def processData(self, scores):
        pass

    @abc.abstractmethod
    def createChart(self):
        pass

    @abc.abstractmethod
    def createPaginatedChart(self):
        pass

