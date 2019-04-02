const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

const prefix = "+";
const talkedRecently = new Set();

client.sKey = require('./SpotifyKeys.json');

client.on('ready', () => {
		console.log('O bot esta ligado!');
		client.user.setActivity("Quero minha tag ass: Hugo", {type: "PLAYING"});
	});
client.on('message', async message => {
    if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    
	if(command === "addSpotify"){
        if(!message.member.roles.some(r=>["👑│Dono", "👑│Dono"].includes(r.name))){
            const embed = new Discord.RichEmbed()
            .setAuthor("Erro adicionando uma conta!")
            .setThumbnail("https://img.icons8.com/plasticine/2x/delete-sign.png")
            .addField(':construction: '+ message.author.tag +', você não tem permissões suficientes para utilizar esse comando!', `Para você conseguir utilizar este comando, você necessita ter o cargo 👑│Dono, caso tenha esse cargo e não esteja funcionando entre em contacto com o desenvolvidor do bot.`, true)
            .setColor(0xff0000)
            .setFooter('God Rewards • © Todos os direitos reservados.', client.user.avatarURL)
            .setTimestamp();
            return message.channel.send({embed});
        }
        var date = new Date,
       dateformat = [date.getMonth()+1,
       date.getDate(),
       date.getFullYear()].join('/')+' '+
      [date.getHours(),
       date.getMinutes(),
       date.getSeconds()].join(':');
        function randomString(length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        
            if (! length) {
                length = Math.floor(Math.random() * chars.length);
            }
        
            var str = '';
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return "ID-" + str;
        }
           client.sKey[randomString(12)] = {
               Email: args[0],
               Senha: args[1],
               Criador: message.author.tag,
               Data: dateformat
           }

     fs.writeFile('./SpotifyKeys.json', JSON.stringify(client.sKey, null, 3), err => {
            if (err) throw err;
            const embed = new Discord.RichEmbed()
            .setColor(0xffe102)
            .setAuthor("Conta adicionada com sucesso!")
            .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/51rttY7a%2B9L.png")
            .addField(":page_facing_up: Informações", "**Email/Usuario:** " + args[0] +"\n**Senha:** " + args[1])
            .setFooter('God Rewards • © Todos os direitos reservados.', client.user.avatarURL)
            .setTimestamp();
         message.channel.send({embed});
          });
    }
    if(command === 'spotify'){

        if (talkedRecently.has(message.author.id)) {
            var AguardarSpotify = new Discord.RichEmbed()
            .setAuthor("Erro enviando sua conta!")
            .setThumbnail("https://img.icons8.com/plasticine/2x/delete-sign.png")
            .addField(':construction: '+ message.author.tag +', você tem de aguardar 30 minutos!', `Para voltar a adquirir uma conta do spotify você deve aguardar 30 minutos desde a sua ultima conta adquirida.`, true)
            .setColor(0xff0000)
            .setFooter('God Rewards • © Todos os direitos reservados.', client.user.avatarURL)
            .setTimestamp();
            message.channel.send(AguardarSpotify);
    } else {
        var length = 0;
        for (var key in client.sKey)
            length++;
        var rnd = Math.floor(Math.random()*length),
            i = 0,
            obj;
        for (var key in client.sKey) {
            if (i == rnd) {
                obj = {};
                obj[key] = client.sKey[key];
                break;
            }
            i++;
        }
        var ContaSpotify = new Discord.RichEmbed()
            .setAuthor("Sua conta foi entregue com sucesso!")
            .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/51rttY7a%2B9L.png")
            .addField(':page_facing_up: Seus dados de acesso', `**Email/Usuario:** ${obj[key].Email}\n**Senha:** ${obj[key].Senha}`, true)
            .setColor(0xffe102)
            .setFooter('God Rewards • © Todos os direitos reservados.', client.user.avatarURL)
            .setTimestamp();

        var MensagemDM = new Discord.RichEmbed()
            .addField(message.author.tag + ", enviei uma mensagem na sua DM!", "Os dados de acesso de sua conta foram enviados na sua DM.", true)
            .setColor(0xa336f7)
            .setFooter("God Rewards • © Todos os direitos reservados.", client.user.avatarURL)
            .setTimestamp();
         message.author.send(ContaSpotify);
         message.channel.send(MensagemDM);
         console.log("\n\nEmail:" + obj[key].Email + "\nSenha: " + obj[key].Senha + "\n\n");

         fs.writeFile('./SpotifyKeys.json', JSON.stringify(client.sKey, null, 3), err => {
           if (err) throw err;
         });

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 30 * 60000);
    }
               }
});

client.login('NTU5Mjk5MTU5MDU2OTczODQ1.D3jYLw.08Zzw1G2xfIpWwqEEnVqtP7otw0');
