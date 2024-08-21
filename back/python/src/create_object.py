import sys
import json
import FreeCAD
def make_object():
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    doc = FreeCAD.newDocument("mi_modelo")

    # Crear un cubo
    cubo = doc.addObject("Part::Box", "MiCubo")
    cubo.Length = data['largo']
    cubo.Width = data['ancho']
    cubo.Height = data['altura']

    # Recalcular el documento para aplicar los cambios
    doc.recompute()
    return doc