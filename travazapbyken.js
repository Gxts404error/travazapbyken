/*
  ________          __            _____  _______      _____
 /  _____/___  ____/  |_  ______ /  |  | \   _  \    /  |  |
/   \  ___\  \/  /\   __\/  ___//   |  |_/  /_\  \  /   |  |
\    \_\  \>    <  |  |  \___ \/    ^   /\  \_/   \/    ^   /
 \______  /__/\_ \ |__| /____  >____   |  \_____  /\____   |
        \/      \/           \/     |__|        \/      |__|

[ SCRIPT BY Gxts404error / Kenndryl ]
[ STATUS: ONLINE // ACCESS: AUTHORIZED ]
*/

/**
 * Função para enviar mensagens automáticas no WhatsApp Web
 */

async function enviarScript(scriptText) {

    const TEMPO_ENTRE_MENSAGENS = 250;
    const TEMPO_APOS_DIGITAR = 100;
    const TEMPO_ESPERA_FINAL = 250;

    const lines = scriptText
        .split(/[\n\t]+/)
        .map(line => line.trim())
        .filter(line => line);

    const main = document.querySelector("#main");

    if (!main) {
        throw new Error("WhatsApp Web não foi encontrado.");
    }

    const textarea = main.querySelector(
        'div[contenteditable="true"]'
    );

    if (!textarea) {
        throw new Error("Não há uma conversa aberta.");
    }

    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];

        console.log(
            `[${i + 1}/${lines.length}] ${line}`
        );

        textarea.focus();

        document.execCommand(
            "insertText",
            false,
            line
        );

        textarea.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        await new Promise(resolve =>
            setTimeout(resolve, TEMPO_APOS_DIGITAR)
        );

        const sendButton =
            main.querySelector('[data-testid="send"]') ||
            main.querySelector('[data-icon="send"]') ||
            main.querySelector('[data-icon="wds-ic-send-filled"]');

        if (!sendButton) {
            throw new Error(
                "Botão de envio não encontrado."
            );
        }

        sendButton.click();

        if (i < lines.length - 1) {
            await new Promise(resolve =>
                setTimeout(
                    resolve,
                    TEMPO_ENTRE_MENSAGENS
                )
            );
        }
    }

    await new Promise(resolve =>
        setTimeout(resolve, TEMPO_ESPERA_FINAL)
    );

    return lines.length;
}


/*
============================================================
                         ROTEIRO
============================================================
*/

const roteiro = `
TRANSMISSÃO INICIADA
Operador: Você está conectado?
Sistema: Conexão estabelecida.
Operador: Qual é o status da rede?
Sistema: Todos os nós estão respondendo normalmente.
Operador: E o servidor principal?
Sistema: Online. Nenhuma anomalia detectada.
Operador: Então por que o alerta apareceu?
Sistema: Detectei uma sequência desconhecida de eventos.
Operador: Consegue identificar a origem?
Sistema: Analisando...
Sistema: Origem localizada.
Operador: Onde?
Sistema: Dentro da própria rede.
Operador: Isso não deveria ser possível.
Sistema: Concordo.
Operador: Isole o segmento.
Sistema: Solicitação recebida.
Operador: E agora?
Sistema: A ameaça desapareceu.
Operador: Você tem certeza?
Sistema: Negativo.
Operador: Então continue monitorando.
Sistema: Monitoramento contínuo ativado.
TRANSMISSÃO ENCERRADA
`;


/*
============================================================
                     EXECUÇÃO
============================================================
*/

enviarScript(roteiro)
    .then(total => {
        console.log(
            `✓ Código finalizado. ${total} mensagens processadas.`
        );
    })
    .catch(erro => {
        console.error("✗ Erro:", erro);
    });


/*
╔══════════════════════════════════════════════════════════════╗
║                    SECURITY NOTICE                           ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Este projeto pertence a Gxts404error / Kenndryl.            ║
║                                                              ║
║  Projeto desenvolvido para fins educacionais e de estudo     ║
║  sobre automação e interação com interfaces web.             ║
║                                                              ║
║  USO RESPONSÁVEL                                              ║
║  Utilize somente em contas, sistemas e ambientes nos quais   ║
║  você tenha autorização.                                     ║
║                                                              ║
║  Não utilize este projeto para spam, assédio, abuso ou       ║
║  envio não autorizado de mensagens.                          ║
║                                                              ║
║  GitHub: https://github.com/Gxts404error                      ║
║                                                              ║
║  [ ETHICAL USE // RESPONSIBLE RESEARCH ]                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/
