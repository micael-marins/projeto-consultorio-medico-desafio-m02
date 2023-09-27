const express = require("express");
const { listarConsultasMedicas, mostrarLaudo, consultasDeUmMedico } = require("./controladores/metodosGet");
const { validarUsuario, validarConsultaSenha } = require("./controladores/controleUsuario");
const { criarConsultaMedica, atualizarInfosConsulta, finalizarConsulta } = require("./controladores/metodosCriarEditar");
const { deletarConsulta } = require("./controladores/metodosDelete");

const rotas = express();

rotas.get('/consultas', validarUsuario, listarConsultasMedicas );

rotas.post('/consulta', criarConsultaMedica );

rotas.put('/consulta/:identificadorConsulta/paciente', atualizarInfosConsulta );

rotas.delete('/consulta/:identificadorConsulta', deletarConsulta );

rotas.post("/consulta/finalizar", finalizarConsulta );

rotas.get('/consulta/laudo', validarConsultaSenha, mostrarLaudo );

rotas.get('/consultas/medico', consultasDeUmMedico);

module.exports = rotas;