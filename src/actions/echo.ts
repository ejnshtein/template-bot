import { Composer } from 'grammy'
import { bot } from 'src/bot'

const composer = new Composer()

composer.on('message', (ctx) => {
  return ctx.reply(ctx.message?.text || 'no text found').then(console.log)
})

bot.use(composer.middleware())
