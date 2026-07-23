import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase"; // Importas la db que configuramos arriba

async function publicarArticulo(datosFormulario) {
  try {
    // Apuntamos a la colección "products"
    const docRef = await addDoc(collection(db, "products"), {
      tipo: datosFormulario.tipo,
      titulo: datosFormulario.titulo,
      materia: datosFormulario.materia,
      precio: Number(datosFormulario.precio),
      fotoUrl: datosFormulario.fotoUrl || "url_imagen_por_defecto.jpg",
      whatsapp: datosFormulario.whatsapp,
      fechaCreacion: new Date()
    });
    console.log("Artículo publicado con el ID: ", docRef.id);
    alert("¡Publicación exitosa!");
  } catch (e) {
    console.error("Error al añadir el documento: ", e);
  }
}
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

async function obtenerArticulos() {
  const querySnapshot = await getDocs(collection(db, "products"));
  
  const listaArticulos = [];
  querySnapshot.forEach((doc) => {
    // doc.data() contiene toda la información de cada publicación
    listaArticulos.push({ id: doc.id, ...doc.data() });
  });

  console.log(listaArticulos);
  // Aquí mandarías esta lista a tu HTML o estado de React/Vite para dibujarlos en pantalla
  return listaArticulos;
}