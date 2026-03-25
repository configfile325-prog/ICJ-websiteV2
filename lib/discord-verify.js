export const verifyMember = async (identifier) => {
  const guildId = process.env.DISCORD_GUILD_ID;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  try {
    // We search the server for the User ID or Nickname
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}/members/search?query=${identifier}`,
      { headers: { Authorization: `Bot ${botToken}` } }
    );

    const members = await response.json();

    // If we find them, return their real Discord ID and Name
    if (members && members.length > 0) {
      return {
        success: true,
        userId: members[0].user.id,
        nickname: members[0].nick || members[0].user.username,
      };
    }
    return { success: false, error: "User not found in ICJ server records." };
  } catch (error) {
    return { success: false, error: "ICJ-Discord Connection Error." };
  }
};
