import FreeCAD
import Part

class Cubo:
    def __init__(self):
        self.Length = 0
        self.Width = 0
        self.Height = 0
        self.RoofHeight = 0

def make_object(c=Cubo()):
    doc = FreeCAD.newDocument("Galpon")

    # Paso 1: Crear las paredes del galpón
    # Pared frontal
    pared_frontal = Part.makeBox(c.Length, 1, c.Height, FreeCAD.Vector(0, 0, 0))  # 1 es el grosor de la pared
    # Pared trasera
    pared_trasera = Part.makeBox(c.Length, 1, c.Height, FreeCAD.Vector(0, c.Width-1, 0))
    # Pared lateral izquierda
    pared_lateral_izq = Part.makeBox(1, c.Width, c.Height, FreeCAD.Vector(0, 0, 0))
    # Pared lateral derecha
    pared_lateral_der = Part.makeBox(1, c.Width, c.Height, FreeCAD.Vector(c.Length-1, 0, 0))

    # Unir todas las paredes para formar la estructura del galpón
    paredes = pared_frontal.fuse([pared_trasera, pared_lateral_izq, pared_lateral_der])

    # Paso 2: Crear el techo triangular
    puntos_base = [
        FreeCAD.Vector(0, 0, c.Height),               # Vértice inferior izquierdo
        FreeCAD.Vector(c.Length, 0, c.Height),        # Vértice inferior derecho
        FreeCAD.Vector(c.Length / 2, 0, c.Height + c.RoofHeight)  # Vértice superior (centro del techo)
    ]

    triangulo = Part.makePolygon(puntos_base + [puntos_base[0]])
    techo = Part.Face(triangulo)
    techo_extrusion = techo.extrude(FreeCAD.Vector(0, c.Width, 0))  # Extruir a lo largo del ancho del galpón

    # Unir las paredes con el techo
    galpon = paredes.fuse(techo_extrusion)

    # Paso 3: Crear la puerta
    ancho_puerta = c.Width * 0.2
    alto_puerta = c.Height * 0.6
    largo_puerta = c.Length * 0.3
    posicion_puerta = FreeCAD.Vector(c.Length * 0.35, 0, 0)  # Centramos la puerta en el largo

    puerta = Part.makeBox(largo_puerta, 1, alto_puerta, posicion_puerta)

    # Restar la puerta del galpón
    galpon_con_puerta = galpon.cut(puerta)

    # Añadir el objeto resultante al documento
    galpon_obj = doc.addObject("Part::Feature", "Galpon")
    galpon_obj.Shape = galpon_con_puerta

    # Recalcular el documento para asegurarse de que todo está actualizado
    doc.recompute()

    return doc
