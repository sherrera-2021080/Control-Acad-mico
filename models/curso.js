const { Schema, model } = require("mongoose");





const CursoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del curso es obligatorio"],
    unique: true,
  },
  descripcion: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  alumnos: [{
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    default: null
  }]
});

module.exports = model("Curso", CursoSchema);
