module.exports = async (client, message)=> {
    console.log(`${client.user.username} is online`); // Logs that the bot is online
    client.user.setActivity(`sb!help`, { type: "STREAMING" });
}