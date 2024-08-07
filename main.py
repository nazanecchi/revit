import FreeCAD
import Part
import Mesh
import os

# Crear un nuevo documento
doc = FreeCAD.newDocument()

# Crear un cubo
cubo = doc.addObject("Part::Box", "MiCubo")
cubo.Length = 10
cubo.Width = 10
cubo.Height = 10

# Recalcular el documento para aplicar los cambios
doc.recompute()

# Obtener la ruta actual de trabajo
directorio = os.getcwd()

# Definir el nombre del archivo FreeCAD
archivo_fcstd = os.path.join(directorio, "mi_modelo.FCStd")

# Definir el nombre del archivo STL
archivo_stl = os.path.join(directorio, "mi_modelo.stl")

# Verificar si el directorio existe
if not os.path.exists(directorio):
    print(f"Error: El directorio {directorio} no existe.")
else:
    try:
        # Guardar el documento FreeCAD
        doc.saveAs(archivo_fcstd)
        print(f"Archivo FreeCAD guardado en {archivo_fcstd}")

        # Exportar el documento a STL
        # Convertir el objeto a malla
        shape = doc.getObject("MiCubo").Shape
        mesh = Mesh.Mesh(shape.tessellate(0.1))
        
        # Guardar el archivo STL
        mesh.write(archivo_stl)
        print(f"Archivo STL exportado a {archivo_stl}")

    except Exception as e:
        print(f"Error al guardar o exportar el archivo: {e}")

# Cerrar FreeCAD (opcional)
FreeCAD.closeDocument(doc.Name)
