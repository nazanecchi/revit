import FreeCAD
def make_object():
    doc = FreeCAD.newDocument("mi_modelo")

    # Crear un cubo
    cubo = doc.addObject("Part::Box", "MiCubo")
    cubo.Length = 10
    cubo.Width = 10
    cubo.Height = 30

    # Recalcular el documento para aplicar los cambios
    doc.recompute()
    return doc