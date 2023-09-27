const bancodedados = require("../bancodedados");

const validarUsuario = (req, res, next) => {

  const { cnes_consultorio, senha_consultorio } = req.query;

  if (!cnes_consultorio || !senha_consultorio) {
    return res.status(401).json({ "mensagem": "Por favor, inserir CNES e senha."})
  }

  let cnesOk = cnes_consultorio === bancodedados.consultorio.cnes ? true : false;
  let senhaOk = senha_consultorio === bancodedados.consultorio.senha ? true : false;

  if (!senhaOk || !cnesOk) {
    return res.status(401).json({ "mensagem": "CNES ou senha inválidos."})
  }

  next()
};



const validarConsultaSenha = (req, res, next) => {

  const { identificador_consulta, senha } = req.query;

  if (!identificador_consulta || !senha) {
    return res.status(401).json({ "mensagem": "Por favor, inserir o identificador da consulta e a senha."})
  }

  const consultaSelecionada = bancodedados.consultasFinalizadas.find((consulta) => {
    if (consulta.identificador === Number(identificador_consulta)) {
      return consulta;
    };
    return false
  });

  if (!consultaSelecionada) {
    return res.status(404).json({ "mensagem": "Nenhum laudo encontrado para esta consulta." })
  }

  let senhaOk = senha === consultaSelecionada.paciente.senha ? true : false;

  if (!senhaOk) {
    return res.status(401).json({ "mensagem": "identificador ou senha inválidos."})
  }

  next()
};



module.exports = {
  validarUsuario,
  validarConsultaSenha
}