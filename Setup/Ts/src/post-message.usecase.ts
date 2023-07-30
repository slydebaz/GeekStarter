import { Message } from './message'

export class PostMessageUseCase {
    constructor(private readonly messageRepository: MessageRepository, private readonly dateProvider: DateProvider) {}

    async handle(postMessageCommand: PostMessageCommand) {
        if (postMessageCommand.text.length > 280) {
            throw new MessageTooLongError()
        }

        if (postMessageCommand.text.length == 0) {
            throw new EmptyMessageError()
        }

        if (postMessageCommand.text.trim().length == 0) {
            throw new EmptyMessageError()
        }
        await this.messageRepository.save({
            id: postMessageCommand.id,
            text: postMessageCommand.text,
            author: postMessageCommand.author,
            publishedAt: this.dateProvider.getNow(),
        })
    }
}

export class MessageTooLongError extends Error {}
export class EmptyMessageError extends Error {}

export interface MessageRepository {
    save(message: Message): Promise<void>
    getAllOfUser(user: string): Promise<Message[]>
}

export interface DateProvider {
    getNow(): Date
}

export type PostMessageCommand = {
    id: string
    text: string
    author: string
}
