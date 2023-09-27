const bancodedados = require("../bancodedados");

const deletarConsulta = (req, res) => {

  const mensagemErro = (codErro, mensagem) => {
    res.status(codErro).json({ "mensagem": `${mensagem}`})    
  }
  
  const {identificadorConsulta} = req.params;

  const consultaSelecionada = bancodedados.consultas.find((consulta) => {
    if (consulta.identificador === Number(identificadorConsulta)) {
      return consulta;
    };
    return false
  });

  if (!consultaSelecionada) {
    return mensagemErro(400, "Insira um identificador de consulta válido.")
  }

  if (consultaSelecionada.finalizada) {
    return mensagemErro(400, "Não é possível deletar uma consulta já finalizada.");
  }


 const novaListaConsultas = bancodedados.consultas.filter((consulta) => {
  return consulta !== consultaSelecionada;
 })

 bancodedados.consultas = novaListaConsultas;
 
  return res.status(204).send();
};

module.exports = {
  deletarConsulta
};