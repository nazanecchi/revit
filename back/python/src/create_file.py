import FreeCAD
import Mesh
import os

def make_file(doc, directorio):
    # Definir el nombre del archivo FreeCAD
    archivo_fcstd = os.path.join(directorio, "mi_modelo.FCStd")

    # Definir el nombre del archivo STL
    archivo_stl = os.path.join(directorio, "mi_modelo.stl")

    # Verificar si el directorio existe
    if not os.path.exists(directorio):
        print(f"Error: El directorio {directorio} no existe.")
    else:
        try:
            # Eliminar el archivo FreeCAD existente si existe
            if os.path.exists(archivo_fcstd):
                os.remove(archivo_fcstd)
                print(f"Archivo existente {archivo_fcstd} eliminado.")

            # Guardar el documento FreeCAD
            doc.saveAs(archivo_fcstd)
            print(f"Archivo FreeCAD guardado en {archivo_fcstd}")

            # Eliminar el archivo STL existente si existe
            if os.path.exists(archivo_stl):
                os.remove(archivo_stl)
                print(f"Archivo existente {archivo_stl} eliminado.")

            # Exportar el documento a STL
            # Convertir el objeto a malla
            shape = doc.getObject("Galpon").Shape
            mesh = Mesh.Mesh(shape.tessellate(0.1))

            # Guardar el archivo STL
            mesh.write(archivo_stl)
            print(f"Archivo STL exportado a {archivo_stl}")

        except Exception as e:
            print(f"Error al guardar o exportar el archivo: {e}")

    # Cerrar FreeCAD (opcional)
    FreeCAD.closeDocument(doc.Name)
