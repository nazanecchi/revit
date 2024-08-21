import Part
import os
from src.create_file import make_file
from src.create_object import make_object

# Pasar el documento y el directorio a la función make_file
make_file(make_object(), os.path.join(os.getcwd(), "../front/public/"))
