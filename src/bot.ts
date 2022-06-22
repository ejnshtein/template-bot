import { Bot } from 'grammy'

export const bot = new Bot(process.env.TOKEN)

if (process.env.NODE_ENV === 'development') {
  bot.use(async (ctx, next) => {
    const startTime = Date.now()
    await next()
    const endTime = Date.now()
    console.log(
      `update ${ctx.update.update_id} processed in ${endTime - startTime} ms`
    )
  })
}

bot.start()
