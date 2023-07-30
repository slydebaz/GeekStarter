import { Message } from './message'
import { MessageRepository } from './post-message.usecase'

export class InMemoryMessageRespository implements MessageRepository {
    messages = new Map<string, Message>()
    save(msg: Message): Promise<void> {
        this.messages.set(msg.id, msg)
        return Promise.resolve()
    }

    getMessageById(messageId: string) {
        return this.messages.get(messageId)
    }

    givenExistingMessages(messages: Message[]) {
        //messages.forEach((msg) => this.messages.set(msg.id, msg))
        messages.forEach(this._save.bind(this))
    }

    getAllOfUser(user: string): Promise<Message[]> {
        //messages.forEach((msg) => this.messages.set(msg.id, msg))
        return Promise.resolve([...this.messages.values()].filter((msg) => msg.author === user))
    }

    private _save(msg: Message) {
        this.messages.set(msg.id, msg)
    }
}
