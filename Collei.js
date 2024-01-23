const Discord = require("discord.js");
const {GatewayIntentBits, ActivityType} = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildWebhooks
  ]});
  
client.on("ready", async () => {
    const guildId = client.guilds.cache.get("1084471620086804490");
    client.user.setActivity(`${guildId.name}`, "WATCHING");
    console.log("I'm ready.");

    try {
      const guild = await client.guilds.fetch(guildId);
      await guild.commands.set([]);
      console.log('Comandos eliminados exitosamente.');
    } catch (error) {
      console.error('Error al eliminar comandos:', error);
    }

    const data = [
        {
          name: 'colleisay',
          description: "you've Collei say something.",
          options: [
            {
              name: 'text',
              description: 'Text of Collei.',
              type: 3,
              required: true
            },
          ]
        },
        {
          name: 'genshin-help',
          description: "Request help in Genshin Impact.",
          options: [
            {
              name: "uid",
              description: "Your identificator in Genshin Impact.",
              type: 3,
              required: true
            },
            {
              name: "region",
              description: "Your region in Genshin Impact.",
              type: 3,
              required: true
            },
            {
              name: "request",
              description: "Your request.",
              type: 3,
              required: true
            }
          ]
        }
      ]
  
      for (const commandData of data) {
        try {
          const command = await client.application?.commands.create(commandData);
          console.log(`Slash command ${command.name} registered!`);
        } catch (error) {
          console.error(`Error registering slash command: ${error}`);
        }
      }      
})
/* 
client.on("messageCreate", async (message) => {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

const data = [
        {
          name: 'colleisay',
          description: "you've Collei say something.",
          options: [
            {
              name: 'text',
              description: 'Text of Collei.',
              type: 3,
              required: true
            },
          ]
        },
      ]
  
      for (const commandData of data) {
        try {
          const command = await client.application?.commands.create(commandData);
          console.log(`Slash command ${command.name} registered!`);
        } catch (error) {
          console.error(`Error registering slash command: ${error}`);
        }
      }      
})
 */

    /*  This is my event guildMemberAdd. */
client.on("guildMemberAdd", (member) => {
  const imageAd = new Discord.AttachmentBuilder("https://media.discordapp.net/attachments/1084491507085611130/1115049456186949632/welcome.png")

    const channelId = member.guild.channels.cache.get('1084491507085611130');

    channelId.send({content: `Bienvenido/a, **${member.user.username}**, al servidor ***${member.guild.name}***. Léete las ⁠<#1084485229516955738> para evitar problemas en el futuro, selecciona tus roles en <#1084517706029604895>, dicho todo esto, espero que puedas disfrutar de tu estadía aquí.

    Con tu llegada somos: **${member.guild.memberCount}**.`, files: [imageAd]})
});
    /*  This is my event guildMemberRemove. */

client.on("guildMemberRemove", (member) => {
    const imageRemove = new Discord.AttachmentBuilder("https://media.discordapp.net/attachments/1084509174949499001/1115050073533992970/despedida_collei.png")
    const channelId = member.guild.channels.cache.get('1084509174949499001');

    channelId.send({content: `Hm, que lástima, un/a aventurero/a ha caído, adiós, ${member.user.username}, espero que hayas disfrutado estar aquí.
    
    Con tu perdida somos: **${member.guild.memberCount}**.`, files: [imageRemove]} ) 
})
    /*  This is my event interactionCreate. */

 client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const saying = interaction.options.getString('text');

    if (interaction.commandName === 'colleisay') {
      await interaction.reply({content: `${saying}`});
    } 

    const playerUID = interaction.options.getString("uid");
    const playerRegion = interaction.options.getString("region");
    const playerRequest = interaction.options.getString("request");
    const channelId = interaction.guild.channels.cache.get("1198011934692343839");

    if(interaction.commandName === "genshin-help") {
      //const member = interaction.options.getMember('target').value;
    if (channelId != interaction.channel) return interaction.reply({content: "This command only may used in <#1198011934692343839>."});

      const GenshEmbed = new Discord.EmbedBuilder()
        .setTitle(`The travaler ${interaction.member.displayName} is requesting help.`)
        .setDescription(`Let's go.
        Uid: ${playerUID}
        Region: ${playerRegion}
        Request: ${playerRequest}`)
        .setColor("#00FF00")
        await interaction.reply({content: `<@&1198015634538254457>`, embeds: [GenshEmbed]});
    }
  });
 

client.login(config.TOKEN);