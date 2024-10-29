#!/usr/bin/env python
from __future__ import print_function
import os
import sys
import platform
import io
import sys
from ctypes import CDLL
from PyQt6.QtCore import QUrl
from PyQt6.QtGui import QPixmap
from PyQt6.QtWidgets import QApplication, QLabel
from PyQt6.QtNetwork import QNetworkAccessManager, QNetworkRequest, QNetworkReply

def get_steam_api():
    if sys.platform.startswith('linux'):
        if platform.architecture()[0].startswith('32bit'):
            print('Loading Linux 32bit library')
            steam_api = CDLL('./libsteam_api32.so')
        elif platform.architecture()[0].startswith('64bit'):
            print('Loading Linux 64bit library')
            steam_api = CDLL('./libsteam_api64.so')
        else:
            print('Linux architecture not supported')
    else:
        print('Operating system not supported')
        sys.exit()
    return steam_api

class MainWindow(QLabel):
    def __init__(self):
        super().__init__()

        self.manager = QNetworkAccessManager()
        self.manager.finished.connect(self.handle_response)

        url = QUrl("http://cdn.akamai.steamstatic.com/steam/apps/" + str_app_id + "/header_292x136.jpg")
        request = QNetworkRequest(url)
        self.manager.get(request)

    def handle_response(self, reply):
        if reply.error() != QNetworkReply.error:
            pixmap = QPixmap()
            pixmap.loadFromData(reply.readAll())
            self.setPixmap(pixmap)
            self.setFixedSize(292, 136)
            self.setWindowTitle('App ' + str_app_id);
        else:
            print("Error loading image:", reply.errorString())

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Wrong number of arguments")
        sys.exit()

    str_app_id = sys.argv[1]

    os.environ["SteamAppId"] = str_app_id
    try:
        get_steam_api().SteamAPI_Init()
    except:
        print("Couldn't initialize Steam API")
        sys.exit()

    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())




