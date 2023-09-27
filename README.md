![](https://i.imgur.com/xG74tOh.png)
# Este projeto foi desenvolvido como Desafio de Backend, proposto pela [Cubos Academy](https://cubos.academy).
Esta é uma **API** desenvolvida com o objeivo de implementao à um consultório médico um sistema que seja capaz de realizar algumas tarefas básicas como:

- Mostrar uma listagem de consultas e marcá-las como finalizadas ou não;
- Inserir ou deletar uma consulta ainda não finalizada;
- Editar dados de um paciente cadastrado em uma consulta não-finalizada;
- Consultar laudos cadastrados pelos médicos após finalização de consulta;
- Exibir quais atendimentos foram finalizados por um profissional.

## COMO CONFIGURAR?
O primeiro passo para ultilizar esta API é fazer um clone deste repositório. 
Após o mesmo ser clonado na sua máquina, instalar a principal biblioteca ultilizada: **Express**.

```javascript
npm install express

```
## COMO ULTILIZAR? 

Por ser uma API REST, este projeto utiliza o padrão de operações CRUD (Create, Read, Update, Delete). Portanto, é recomendável utilizar algum programa que faça as requisições corretamente. O utilizado nas demonstrações abaixo será o Insomnia. Para fazer o download, [clique aqui](https://insomnia.rest/download).

---

### Listar todas as consultas cadastradas

Para listar as consultas já registradas no sistema, ultilize a GET ```/consultas``` e insira o CNES e a senha do consultório, passando os parâmetros como no exemplo abaixo:

![imagem de exemplo get/consultas](https://github.com/micael-marins/projeto-consultorio-medico-desafio-m02/blob/main/imagens/get%20consultas.png)

*Deverá ser retornado a listagem das consultas registradas. Caso haja algum erro, será impresso na tela. Lembre-se de usar os parâmetros como no exemplo acima.*

---

### Cadastrar uma nova consulta

Para cadastrar uma nova consulta no sistema, utilize o POST ```/consulta``` e, no body (corpo) da requisição, envie os dados a seguir no formato JSON, contendo todas as informações necessárias, como no exemplo abaixo:

```JSON
{
  "tipoConsulta": "AREA DE ATUACAO SOLICITADA",
  "valorConsulta": 10000,
  "paciente": {
    "nome": "NOME DO PACIENTE",
    "cpf": "00000000000",
    "dataNascimento": "2000-01-01",
    "celular": "987654321",
    "email": "PACIENTE@EMAIL.COM",
    "senha": "1234"
  }
}

```

![imagem de exemplo post/consulta](https://github.com/micael-marins/projeto-consultorio-medico-desafio-m02/blob/main/imagens/post%20nova%20consulta.png)

---

### Atualizar dados de um paciente

Para fazer a atualização dos dados de um paciente, utilize o PUT ```/consulta/idConsulta/paciente```. Note que o número de identificação passado na URL diz respeito à consulta e não ao paciente. Este, no entanto, precisa já estar cadastrado com alguma consulta **ainda não finalizada**. Assim como no exemplo anterior, envie em formato JSON no corpo da requisição **APENAS** os dados do paciente, como no exemplo abaixo:


![imagem de exemplo put/consulta/paciente](https://github.com/micael-marins/projeto-consultorio-medico-desafio-m02/blob/main/imagens/put%20consulta.png)

---

### Deletar uma consulta

Para deletar uma consulta, use o DELETE ```consulta/idConsulta```. Assim como no caso anterior, o número de identificação na URL deve ser referente à consulta. **Só será possível deletar uma consulta ainda não-finalizada!** Veja o exemplo abaixo:

![imagem de exemplo delete/consulta](https://github.com/micael-marins/projeto-consultorio-medico-desafio-m02/blob/main/imagens/delete%20consulta.png)

---

### Finalizar uma consulta

Para "dar baixa" em uma consulta (fazer a finalização), use o POST ```/consulta/finalizar```. No corpo da requisição (body), deverá conter um objeto JSON contendo o identificador da consulta e também o laudo gerado pelo profissional. O laudo precisa ter até 200 (duzentos) caracteres. Veja no exemplo abaixo a forma correta de atualizar uma consulta:

![imagem de exemplo post/consulta/finalizar](https://github.com/micael-marins/projeto-consultorio-medico-desafio-m02/blob/main/imagens/post%20finalizar.png)
