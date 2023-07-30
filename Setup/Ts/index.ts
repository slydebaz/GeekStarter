#!/usr/bin/env node

import { Command } from 'commander'
import { DateProvider, PostMessageCommand, PostMessageUseCase } from './src/post-message.usecase'
import { InMemoryMessageRespository } from './src/message.inmemory.repository'
import { FileSystemMessageRepository } from './src/message.fs.repository'

class RealDateProvider implements DateProvider {
    getNow(): Date {
        return new Date()
    }
}

const messageRepository = new FileSystemMessageRepository()
const dateProvider = new RealDateProvider()
const postMessageUseCase = new PostMessageUseCase(messageRepository, dateProvider)

const program = new Command()

program
    .version('1.0.0')
    .description('crafty social network')
    .addCommand(
        new Command('post')
            .argument('<user>', 'the current user')
            .argument('<message>', 'the message to post')
            .action(async (user, message) => {
                const postMessageCommand: PostMessageCommand = {
                    id: 'some-message-id',
                    author: user,
                    text: message,
                }
                try {
                    await postMessageUseCase.handle(postMessageCommand)
                    console.log(':ok_hand:', 'message posté')

                    console.log('publishedAt: ', messageRepository.message.publishedAt)
                    console.table(messageRepository.message)
                    process.exit(0)
                } catch (err) {
                    console.error('👮‍♂️', err)
                    process.exit(1)
                }
            })
    )

async function main() {
    await program.parseAsync()
}

main()
