const TelegramBot = require( `node-telegram-bot-api` )
const logger        = require('winston');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const TOKEN = `576879593:AAHyxqVnQxOCIiVUGZDy9ez69M6mpG0scd4`;
const assistant = new AssistantV1({
    username: '17a55a12-414e-46ec-9966-71c139651f7b',
    password: 'wEQOJerSLqaI',
    //username: '2d8ed37a-ae2c-4f53-85c7-f946ef4310ae',
    url: 'https://gateway.watsonplatform.net/assistant/api',
    version: '2018-02-16',
  });

const bot = new TelegramBot( TOKEN, { polling: true } )

bot.on( 'message', function ( msg ) {
    console.log( 'msg', msg );
    var id = msg.chat.id;
    var text = msg.text;
    logger.log('info', '[Chatbot] pergunta: ', text.toString());
    const params = {
        input: { "text":text },
        //workspace_id: 'eaa92a38-ad1a-4bd4-af09-57ee9c67132d',
        workspace_id:'80590cb1-58a7-4a3c-9d8c-6b364fa14059'
    };
    assistant.message(params, (err, response) => {
        if (err)   bot.sendMessage(id,err);
        
        logger.log('info', '[Chatbot] resposta: ', response.output.text.toString());
        bot.sendMessage(id, response.output.text.toString());
    });
}); 