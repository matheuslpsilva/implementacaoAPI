# Buscador de CEP

Página simples que busca o endereço a partir de um CEP, usando a API ViaCEP.

**1. Qual API eu usei**
ViaCEP. Documentação aqui: https://viacep.com.br/

**2. O que ela devolve**
Logradouro, bairro, cidade, UF, DDD e código do IBGE do endereço correspondente ao CEP.

**3. O endereço que eu chamei**
https://viacep.com.br/ws/89201000/json/


<img width="458" height="349" alt="image" src="https://github.com/user-attachments/assets/0c02ea5d-e606-4926-b8db-e38721762f6e" />


**4. Como rodar**
Não precisa de servidor. É só abrir o `index.html` no navegador que já funciona.

**5. Print da tela funcionando**
<img width="1916" height="932" alt="image" src="https://github.com/user-attachments/assets/074ae1b7-bf6c-4297-b782-0574a0ec0b18" />


**6. Uma dificuldade que eu tive**
No começo eu tratava erro só no `catch`, achando que se o CEP não existisse a API ia dar erro na requisição. Só que não, o ViaCEP retorna status 200 mesmo quando o CEP é inválido, e devolve um JSON `{ "erro": true }`. Fiquei um tempo tentando entender por que a mensagem de erro nunca aparecia até perceber isso. Resolvi checando o campo `erro` do JSON antes de mostrar o resultado.
