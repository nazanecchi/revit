import os
import json
import sys
from src.create_file import make_file
from src.create_object import make_object, Cubo

# Pasar el documento y el directorio a la función make_file

def get_arguments():
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    cubo = Cubo()
    cubo.Length = int(data['length'])
    cubo.Width = int(data['width'])
    cubo.Height = int(data['height'])
    cubo.RoofHeight = int(data['roofheight'])
    return cubo

def test():
    cubo = Cubo()
    cubo.Length = 20
    cubo.Width = 40
    cubo.Height = 8
    cubo.RoofHeight = 5
    return cubo

make_file(make_object(get_arguments()), os.path.join(os.getcwd(), "../../front/public/"))